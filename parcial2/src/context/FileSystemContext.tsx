import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, firebaseReady } from '../firebase/config';
import { useAuth } from './AuthContext';
import NaryTree from '../structures/NaryTree';
import type { FileSystemItem, NodeType } from '../types/FileSystem';

interface FileSystemValue {
  items: FileSystemItem[];
  tree: NaryTree | null;
  loading: boolean;
  addItem: (name: string, type: NodeType, parentId: string | null) => Promise<void>;
}
const FileSystemContext = createContext<FileSystemValue | undefined>(undefined);
const STORAGE_PREFIX = 'parcial2_items_';
const ROOT_ID = 'root';

export function FileSystemProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    if (firebaseReady && db) {
      const q = query(collection(db, 'fileSystemItems'), where('ownerId', '==', user.uid));
      return onSnapshot(q, (snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FileSystemItem)));
        setLoading(false);
      }, () => setLoading(false));
    }
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_PREFIX + user.uid) || '[]') as FileSystemItem[];
      setItems(saved);
    } catch { setItems([]); }
    setLoading(false);
  }, [user]);

  const addItem = useCallback(async (name: string, type: NodeType, parentId: string | null) => {
    if (!user) throw new Error('Debes iniciar sesión para crear carpetas o archivos.');
    const cleanName = name.trim();
    if (!cleanName) throw new Error('El nombre no puede estar vacío.');
    if (parentId) {
      const parent = items.find((item) => item.id === parentId);
      if (!parent || parent.type !== 'folder') throw new Error('Solo puedes crear elementos dentro de una carpeta.');
    }
    const duplicate = items.some((item) => item.parentId === parentId && item.name.toLowerCase() === cleanName.toLowerCase());
    if (duplicate) throw new Error('Ya existe un elemento con ese nombre en esta ubicación.');
    const newItem: FileSystemItem = {
      id: crypto.randomUUID(), name: cleanName, type, parentId,
      createdByEmail: user.email, ownerId: user.uid, createdAt: Date.now(),
    };
    if (firebaseReady && db) {
      const { id: _id, ...data } = newItem;
      await addDoc(collection(db, 'fileSystemItems'), data);
    } else {
      const updated = [...items, newItem];
      localStorage.setItem(STORAGE_PREFIX + user.uid, JSON.stringify(updated));
      setItems(updated);
    }
  }, [items, user]);

  const tree = useMemo(() => {
    if (!user) return null;
    const root = { id: ROOT_ID, name: 'Mi espacio', type: 'folder' as const, parentId: null, createdByEmail: user.email, ownerId: user.uid, createdAt: 0 };
    const result = new NaryTree(root);
    result.build(items);
    return result;
  }, [items, user]);

  return <FileSystemContext.Provider value={{ items, tree, loading, addItem }}>{children}</FileSystemContext.Provider>;
}

export function useFileSystem() {
  const context = useContext(FileSystemContext);
  if (!context) throw new Error('useFileSystem debe usarse dentro de FileSystemProvider.');
  return context;
}
