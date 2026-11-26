import { useMemo, useState } from 'react';
import { Headphones, AudioLines, Radio, Disc3 } from 'lucide-react';
import { SONGS } from './data/songs';
import { Trie } from './helpers/structures/Trie';
import { MaxHeap } from './helpers/structures/MaxHeap';
import { Graph } from './helpers/structures/Graph';
import Buscador from './components/Buscador';
import Ranking from './components/Ranking';
import Recomendaciones from './components/Recomendaciones';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState('');

  const trie = useMemo(() => {
    const structure = new Trie();
    SONGS.forEach((song) => structure.insert(song.title, song));
    return structure;
  }, []);

  const maxHeap = useMemo(() => {
    const heap = new MaxHeap();
    SONGS.forEach((song) => heap.insert(song));
    return heap;
  }, []);

  const graph = useMemo(() => {
    const structure = new Graph();
    structure.addEdge('Blinding Lights', 'Save Your Tears');
    structure.addEdge('Blinding Lights', 'Starboy');
    structure.addEdge('Starboy', 'Save Your Tears');
    structure.addEdge('Levitating', 'New Rules');
    structure.addEdge('As It Was', 'Watermelon Sugar');
    structure.addEdge('Tití Me Preguntó', 'Ojitos Lindos');
    structure.addEdge('Ojitos Lindos', 'Dákiti');
    return structure;
  }, []);

  const suggestions = useMemo(
    () => searchQuery.trim() ? trie.searchPrefix(searchQuery) : [],
    [searchQuery, trie]
  );

  const topSongs = useMemo(() => maxHeap.getTop(5), [maxHeap]);
  const relatedSongs = selectedSong ? graph.getRelatedSongs(selectedSong) : [];

  const handleSelectSong = (title: string) => {
    setSelectedSong(title);
    setSearchQuery(title);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><AudioLines /></span><span>soundify</span></div>
        <div className="sidebar-label">TU ESPACIO</div>
        <div className="side-link active"><Radio size={18} /> Descubrir</div>
        <div className="side-link"><Disc3 size={18} /> Rankings</div>
        <div className="sidebar-note"><Headphones size={22} /><strong>Explora nueva música</strong><p>Encuentra canciones y descubre conexiones entre artistas.</p></div>
        <div className="sidebar-footer">PROYECTO ACADÉMICO · ESTRUCTURAS II</div>
      </aside>

      <section className="content">
        <header className="topbar"><span>PLATAFORMA EDUCATIVA DE MÚSICA</span><div className="status-dot" /> Sistema activo</header>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">TU MÚSICA, MÁS CERCA</span>
            <h1>Descubre el sonido<br /><em>que te mueve.</em></h1>
            <p>Busca canciones, explora recomendaciones y conoce lo más escuchado.</p>
            <Buscador value={searchQuery} onChange={setSearchQuery} suggestions={suggestions} onSelect={(song) => handleSelectSong(song.title)} />
            {searchQuery.trim() && (
              <p className="search-feedback">
                {trie.search(searchQuery) ? 'Canción encontrada exactamente en el Trie.' : 'Sugerencias generadas por prefijo.'}
              </p>
            )}
          </div>
          <div className="hero-art"><div className="vinyl"><div className="vinyl-center">♫</div></div><span className="floating-note note-one">♪</span><span className="floating-note note-two">♫</span></div>
        </section>

        <div className="dashboard-grid">
          <Ranking songs={topSongs} />
          <Recomendaciones selectedSong={selectedSong} relatedSongs={relatedSongs} onSelect={handleSelectSong} />
        </div>
        <footer className="page-footer">Soundify · Implementación de Trie, Max Heap y grafo no dirigido</footer>
      </section>
    </main>
  );
}