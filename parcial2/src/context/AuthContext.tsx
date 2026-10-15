import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firebaseReady } from '../firebase/config';
import type { AppUser } from '../types/FileSystem';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const MOCK_USERS_KEY = 'parcial2_mock_users';
const SESSION_KEY = 'parcial2_mock_session';

function readUsers(): { uid: string; email: string; password: string }[] {
  try { return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]'); } catch { return []; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebaseReady && auth) {
      return onAuthStateChanged(auth, (current) => {
        setUser(current ? { uid: current.uid, email: current.email || '' } : null);
        setLoading(false);
      });
    }
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try { setUser(JSON.parse(session) as AppUser); } catch { localStorage.removeItem(SESSION_KEY); }
    }
    setLoading(false);
  }, []);

  const register = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || password.length < 6) throw new Error('Escribe un correo y una contraseña de mínimo 6 caracteres.');
    if (firebaseReady && auth) {
      await createUserWithEmailAndPassword(auth, cleanEmail, password);
      return;
    }
    const users = readUsers();
    if (users.some((item) => item.email === cleanEmail)) throw new Error('Ese correo ya está registrado.');
    const newUser = { uid: crypto.randomUUID(), email: cleanEmail, password };
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, newUser]));
    const appUser = { uid: newUser.uid, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(appUser));
    setUser(appUser);
  };

  const login = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (firebaseReady && auth) {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
      return;
    }
    const found = readUsers().find((item) => item.email === cleanEmail && item.password === password);
    if (!found) throw new Error('Correo o contraseña incorrectos. Primero debes registrarte.');
    const appUser = { uid: found.uid, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(appUser));
    setUser(appUser);
  };

  const logout = async () => {
    if (firebaseReady && auth) await signOut(auth);
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return context;
}
