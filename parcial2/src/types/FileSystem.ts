export type NodeType = 'folder' | 'file';

export interface FileSystemItem {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  createdByEmail: string;
  ownerId: string;
  createdAt: number;
}

export interface AppUser {
  uid: string;
  email: string;
}
