import type { Song } from '../../types';

export class MaxHeap {
  private items: Song[];

  constructor() {
    this.items = [];
  }

  insert(song: Song): void {
    this.items.push(song);
    this.heapifyUp(this.items.length - 1);
  }

  // Devuelve y elimina la canción con más reproducciones.
  extractMax(): Song | undefined {
    if (this.items.length === 0) return undefined;

    if (this.items.length === 1) {
      return this.items.pop();
    }

    const maxSong = this.items[0];
    this.items[0] = this.items.pop()!;
    this.heapifyDown(0);

    return maxSong;
  }

  // Obtiene el TOP sin modificar el heap original.
  getTop(limit: number): Song[] {
    const copy = new MaxHeap();

    this.items.forEach((song) => copy.insert(song));

    const result: Song[] = [];
    const total = Math.min(Math.max(0, limit), this.items.length);

    for (let i = 0; i < total; i++) {
      const song = copy.extractMax();
      if (song) result.push(song);
    }

    return result;
  }

  getItems(): Song[] {
    return [...this.items];
  }

  private heapifyUp(index: number): void {
    let current = index;

    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);

      if (this.items[parent].plays >= this.items[current].plays) {
        break;
      }

      [this.items[parent], this.items[current]] =
        [this.items[current], this.items[parent]];

      current = parent;
    }
  }

  private heapifyDown(index: number): void {
    let current = index;

    while (true) {
      const left = 2 * current + 1;
      const right = 2 * current + 2;
      let largest = current;

      if (
        left < this.items.length &&
        this.items[left].plays > this.items[largest].plays
      ) {
        largest = left;
      }

      if (
        right < this.items.length &&
        this.items[right].plays > this.items[largest].plays
      ) {
        largest = right;
      }

      if (largest === current) break;

      [this.items[current], this.items[largest]] =
        [this.items[largest], this.items[current]];

      current = largest;
    }
  }
}
