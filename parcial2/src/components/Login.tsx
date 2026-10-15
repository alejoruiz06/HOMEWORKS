import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(''); setMessage(''); setBusy(true);
    try {
      if (mode === 'login') await login(email, password);
      else { await register(email, password); setMessage('Cuenta creada correctamente.'); }
    } catch (err) { setError(err instanceof Error ? err.message : 'Ocurrió un error.'); }
    finally { setBusy(false); }
  };

  return <main className="auth-page"><section className="auth-card">
    <div className="brand-icon">⌘</div><p className="eyebrow">TU ESPACIO DIGITAL</p>
    <h1>{mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h1>
    <p className="muted">Organiza tus carpetas y archivos en un solo lugar.</p>
    <form onSubmit={submit} className="auth-form">
      <label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required autoComplete="email" /></label>
      <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
      {error && <p className="alert error">{error}</p>}{message && <p className="alert success">{message}</p>}
      <button className="primary-button" disabled={busy}>{busy ? 'Un momento...' : mode === 'login' ? 'Iniciar sesión' : 'Registrarme'}</button>
    </form>
    <p className="switch-mode">{mode === 'login' ? '¿Todavía no tienes cuenta?' : '¿Ya tienes cuenta?'} <button className="text-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setMessage(''); }}>{mode === 'login' ? 'Regístrate' : 'Inicia sesión'}</button></p>
    <p className="demo-note">Modo de prueba: crea una cuenta con tu correo y una contraseña de mínimo 6 caracteres.</p>
  </section></main>;
}
