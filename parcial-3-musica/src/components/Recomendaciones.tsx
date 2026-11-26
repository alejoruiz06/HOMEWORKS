import { Network } from 'lucide-react';

interface Props {
  selectedSong: string;
  relatedSongs: string[];
  onSelect: (song: string) => void;
}

export default function Recomendaciones({ selectedSong, relatedSongs, onSelect }: Props) {
  return (
    <section className="panel recommendations-panel">
      <div className="section-heading">
        <div><span className="eyebrow">DESCUBRIR</span><h2>También te puede gustar</h2></div>
        <span className="heading-icon"><Network size={20} /></span>
      </div>
      <p className="recommendation-subtitle">
        {selectedSong ? `Canciones relacionadas con ${selectedSong}` : 'Selecciona una canción para ver sus relaciones.'}
      </p>
      {relatedSongs.length ? (
        <div className="related-list">
          {relatedSongs.map((song) => (
            <button key={song} onClick={() => onSelect(song)}>{song}<span>Ver canción ↗</span></button>
          ))}
        </div>
      ) : <div className="empty-state">No hay recomendaciones para mostrar.</div>}
    </section>
  );
}