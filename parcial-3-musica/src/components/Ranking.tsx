import { Music2 } from 'lucide-react';
import type { Song } from '../types';

interface Props {
  songs: Song[];
}

export default function Ranking({ songs }: Props) {
  return (
    <section className="panel ranking-panel">
      <div className="section-heading">
        <div><span className="eyebrow">POPULARIDAD</span><h2>Top canciones</h2></div>
        <span className="heading-icon"><Music2 size={20} /></span>
      </div>
      <div className="song-list">
        {songs.map((song, index) => (
          <div className="song-row" key={song.id}>
            <span className="position">{String(index + 1).padStart(2, '0')}</span>
            <span className="cover">{song.cover}</span>
            <div className="song-info"><strong>{song.title}</strong><small>{song.artist}</small></div>
            <span className="plays">{song.plays.toLocaleString('es-CO')} reproducciones</span>
          </div>
        ))}
      </div>
    </section>
  );
}