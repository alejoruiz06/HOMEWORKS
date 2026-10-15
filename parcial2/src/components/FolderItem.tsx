import { useState } from 'react';
import type { FileSystemItem } from '../types/FileSystem';
import { useFileSystem } from '../context/FileSystemContext';

export default function FolderItem({ item, depth = 0 }: { item: FileSystemItem; depth?: number }) {
  const { items } = useFileSystem();
  const [open, setOpen] = useState(true);
  const children = items.filter((child) => child.parentId === item.id).sort((a, b) => a.name.localeCompare(b.name));
  return <div className="tree-branch">
    <button className="tree-row" style={{ paddingLeft: `${14 + depth * 22}px` }} onClick={() => setOpen(!open)}>
      <span className="tree-chevron">{children.length ? (open ? '⌄' : '›') : ''}</span><span className="item-icon folder-icon">{open ? '📂' : '📁'}</span><span className="item-name">{item.name}</span><span className="item-count">{children.length}</span>
    </button>
    {open && children.map((child) => child.type === 'folder' ? <FolderItem key={child.id} item={child} depth={depth + 1} /> : <div className="tree-row file-row" key={child.id} style={{ paddingLeft: `${36 + depth * 22}px` }}><span className="tree-chevron"/><span className="item-icon">📄</span><span className="item-name">{child.name}</span><span className="file-owner">{child.createdByEmail}</span></div>)}
  </div>;
}
