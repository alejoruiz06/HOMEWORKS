import { useMemo, useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFileSystem } from '../context/FileSystemContext';
import FolderItem from './FolderItem';
import type { NodeType } from '../types/FileSystem';

export default function FileExplorer() {
  const { user, logout } = useAuth();
  const { items, tree, loading, addItem } = useFileSystem();
  const [name, setName] = useState('');
  const [type, setType] = useState<NodeType>('folder');
  const [parentId, setParentId] = useState('root');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const folders = useMemo(() => items.filter((item) => item.type === 'folder'), [items]);
  const folderCount = items.filter((item) => item.type === 'folder').length;
  const fileCount = items.filter((item) => item.type === 'file').length;

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(''); setSuccess('');
    try {
      await addItem(name, type, parentId === 'root' ? null : parentId);
      setName(''); setSuccess(type === 'folder' ? 'Carpeta creada correctamente.' : 'Archivo creado correctamente.');
    } catch (err) { setError(err instanceof Error ? err.message : 'No se pudo guardar el elemento.'); }
  };

  return <main className="app-shell">
    <aside className="sidebar"><div className="logo"><span className="logo-mark">⌘</span><span>Mi espacio</span></div><div className="side-label">ESPACIO DE TRABAJO</div><div className="side-link active"><span>▦</span> Mis archivos</div><div className="sidebar-bottom"><div className="avatar">{user?.email.charAt(0).toUpperCase()}</div><div className="profile-text"><strong>{user?.email}</strong><span>Cuenta personal</span></div><button className="logout-button" title="Cerrar sesión" onClick={() => void logout()}>↪</button></div></aside>
    <section className="main-content"><header className="topbar"><div><p className="eyebrow">EXPLORADOR DE ARCHIVOS</p><h1>Mis archivos</h1></div><div className="user-pill"><span className="online-dot"/>{user?.email}</div></header>
      <section className="welcome-panel"><div><p className="eyebrow light">TODO EN SU LUGAR</p><h2>Un espacio para tus ideas.</h2><p>Organiza tus documentos creando carpetas y archivos.</p></div><div className="welcome-art">▤</div></section>
      <section className="stats-grid"><article className="stat-card"><span className="stat-symbol purple">▱</span><div><span>Carpetas</span><strong>{folderCount}</strong></div></article><article className="stat-card"><span className="stat-symbol blue">▤</span><div><span>Archivos</span><strong>{fileCount}</strong></div></article><article className="stat-card"><span className="stat-symbol green">⌘</span><div><span>Total de elementos</span><strong>{items.length}</strong></div></article></section>
      <div className="workspace-grid"><section className="panel tree-panel"><div className="panel-heading"><div><h3>Estructura de carpetas</h3><p>Visualización del árbol n-ario</p></div><span className="count-badge">{items.length} elementos</span></div>
        {loading ? <p className="empty-state">Cargando tus archivos...</p> : <div className="tree-list"><button className="tree-row root-row" onClick={() => setParentId('root')}><span className="tree-chevron">⌄</span><span className="item-icon root-icon">⌂</span><strong>Mi espacio</strong><span className="root-tag">Raíz</span></button>{folders.filter((item) => item.parentId === null).sort((a,b)=>a.name.localeCompare(b.name)).map((item) => <FolderItem key={item.id} item={item} />)}{items.filter((item)=>item.type==='file' && item.parentId===null).map((item)=><div className="tree-row file-row" key={item.id}><span className="tree-chevron"/><span className="item-icon">📄</span><span className="item-name">{item.name}</span><span className="file-owner">{item.createdByEmail}</span></div>)}{items.length===0 && <div className="empty-state"><div className="empty-icon">▱</div><strong>Tu espacio está vacío</strong><span>Crea tu primera carpeta para comenzar.</span></div>}</div>}
        <div className="tree-footer"><span className="legend-folder">▰</span> Carpeta <span className="legend-file">▤</span> Archivo <span className="tree-footer-spacer"/><span>DFS: {tree?.depthFirst().length ?? 0} nodos</span></div>
      </section>
      <section className="panel create-panel"><div className="panel-heading"><div><h3>Nuevo elemento</h3><p>Agrega contenido a tu espacio</p></div><span className="plus-badge">＋</span></div><form className="create-form" onSubmit={submit}><label>Tipo de elemento<select value={type} onChange={(e) => setType(e.target.value as NodeType)}><option value="folder">Carpeta</option><option value="file">Archivo</option></select></label><label>Nombre<input value={name} onChange={(e)=>setName(e.target.value)} placeholder={type==='folder'?'Ej. Universidad':'Ej. apuntes.pdf'} required maxLength={80}/></label><label>Ubicación<select value={parentId} onChange={(e)=>setParentId(e.target.value)}><option value="root">Mi espacio (raíz)</option>{folders.map((folder)=><option key={folder.id} value={folder.id}>{folder.name}</option>)}</select></label><div className="creator-info"><span className="creator-icon">@</span><div><span>Creado por</span><strong>{user?.email}</strong></div></div>{error&&<p className="alert error">{error}</p>}{success&&<p className="alert success">{success}</p>}<button className="primary-button" type="submit">＋ Crear {type==='folder'?'carpeta':'archivo'}</button><p className="form-hint">Los archivos no pueden contener otros elementos. Solo las carpetas admiten hijos.</p></form></section></div>
      <footer className="app-footer"><span>Parcial 2 · Estructuras de Datos II</span><span>Árbol n-ario implementado desde cero</span></footer>
    </section>
  </main>;
}
