import Login from './components/Login';
import FileExplorer from './components/FileExplorer';
import { useAuth } from './context/AuthContext';
import { FileSystemProvider } from './context/FileSystemContext';

function Content() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Preparando tu espacio...</div>;
  if (!user) return <Login />;
  return <FileSystemProvider><FileExplorer /></FileSystemProvider>;
}

export default function App() { return <Content />; }
