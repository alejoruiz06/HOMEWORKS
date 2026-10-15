import TreeNode from './TreeNode';
import type { FileSystemItem } from '../types/FileSystem';

// La estructura se construye desde cero usando nodos y referencias a hijos.
export default class NaryTree {
  root: TreeNode;
  private nodes: Map<string, TreeNode>;

  constructor(rootData: FileSystemItem) {
    this.root = new TreeNode(rootData);
    this.nodes = new Map([[rootData.id, this.root]]);
  }

  build(items: FileSystemItem[]): void {
    this.nodes = new Map([[this.root.data.id, this.root]]);
    this.root.children = [];
    const pending = [...items];
    let added = true;
    // Permite reconstruir aunque los documentos lleguen en distinto orden.
    while (pending.length > 0 && added) {
      added = false;
      for (let i = pending.length - 1; i >= 0; i--) {
        const item = pending[i];
        const parent = item.parentId ? this.nodes.get(item.parentId) : this.root;
        if (parent) {
          const node = new TreeNode(item);
          if (parent.data.type === 'file') continue;
          parent.addChild(node);
          this.nodes.set(item.id, node);
          pending.splice(i, 1);
          added = true;
        }
      }
    }
  }

  add(item: FileSystemItem): void {
    const parent = item.parentId ? this.nodes.get(item.parentId) : this.root;
    if (!parent) throw new Error('No se encontró la carpeta de destino.');
    parent.addChild(new TreeNode(item));
    this.nodes.set(item.id, parent.children[parent.children.length - 1]);
  }

  find(id: string): TreeNode | undefined {
    return this.nodes.get(id);
  }

  // Recorrido en profundidad (DFS), útil para consultar todos los elementos.
  depthFirst(): FileSystemItem[] {
    const result: FileSystemItem[] = [];
    const visit = (node: TreeNode) => {
      if (node !== this.root) result.push(node.data);
      node.children.forEach(visit);
    };
    visit(this.root);
    return result;
  }
}
