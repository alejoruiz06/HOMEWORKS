import type { Song } from '../../types';

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  data: Song | null;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
    this.data = null;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(title: string, song: Song): void {
    let current = this.root;
    const word = title.toLowerCase().trim();

    for (const character of word) {
      if (!current.children.has(character)) {
        current.children.set(character, new TrieNode());
      }
      current = current.children.get(character)!;
    }

    current.isEndOfWord = true;
    current.data = song;
  }

  search(title: string): boolean {
    let current = this.root;
    const word = title.toLowerCase().trim();

    for (const character of word) {
      const next = current.children.get(character);
      if (!next) return false;
      current = next;
    }

    return current.isEndOfWord;
  }

  searchPrefix(prefix: string): Song[] {
    let current = this.root;
    const word = prefix.toLowerCase().trim();

    if (!word) return [];

    for (const character of word) {
      const next = current.children.get(character);
      if (!next) return [];
      current = next;
    }

    const results: Song[] = [];
    this.collectSongs(current, results);
    return results;
  }

  private collectSongs(node: TrieNode, results: Song[]): void {
    if (node.isEndOfWord && node.data) {
      results.push(node.data);
    }

    node.children.forEach((child) => {
      this.collectSongs(child, results);
    });
  }
}