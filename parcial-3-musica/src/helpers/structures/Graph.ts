export class Graph {
  private adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.adjacencyList = new Map<string, Set<string>>();
  }

  addVertex(song: string): void {
    if (!this.adjacencyList.has(song)) {
      this.adjacencyList.set(song, new Set<string>());
    }
  }

  addEdge(songA: string, songB: string): void {
    this.addVertex(songA);
    this.addVertex(songB);

    // Se agregan las dos conexiones porque el grafo es no dirigido.
    this.adjacencyList.get(songA)!.add(songB);
    this.adjacencyList.get(songB)!.add(songA);
  }

  getRelatedSongs(song: string): string[] {
    return Array.from(this.adjacencyList.get(song) ?? []);
  }

  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }
}