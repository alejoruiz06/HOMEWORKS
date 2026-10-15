import type { FileSystemItem } from '../types/FileSystem';

// Nodo de un árbol n-ario: cada carpeta puede tener muchos hijos.
export default class TreeNode {
  data: FileSystemItem;
  children: TreeNode[];

  constructor(data: FileSystemItem) {
    this.data = data;
    this.children = [];
  }

  addChild(child: TreeNode): void {
    if (this.data.type === 'file') {
      throw new Error('Un archivo no puede tener elementos hijos.');
    }
    this.children.push(child);
  }
}
