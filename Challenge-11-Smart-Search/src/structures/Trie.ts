import type { Product } from "../data/products";

class TrieNode {
  children: Map<string, TrieNode>;
  products: Product[];

  constructor() {
    this.children = new Map();
    this.products = [];
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(name: string, product: Product) {
    let current = this.root;
    const word = name.toLowerCase();

    for (const letter of word) {
      if (!current.children.has(letter)) {
        current.children.set(letter, new TrieNode());
      }

      current = current.children.get(letter)!;
      current.products.push(product);
    }
  }

  searchPrefix(prefix: string): Product[] {
    let current = this.root;
    const word = prefix.toLowerCase();

    for (const letter of word) {
      const next = current.children.get(letter);

      if (!next) {
        return [];
      }

      current = next;
    }

    return current.products;
  }
}

export default Trie;