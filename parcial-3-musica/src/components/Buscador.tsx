import { Search } from 'lucide-react';
import type { Song } from '../types';

interface Props {
  value: string;
  onChange: (value: string) => void;
  suggestions: Song[];
  onSelect: (song: Song) => void;
}

export default function Buscador({ value, onChange, suggestions, onSelect }: Props) {
  return (
    <section className="search-section">
      <div className="search-box">
        <Search size={19} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Busca una canción..."
        />
      </div>
      {value.trim() && (
        <div className="suggestions">
          {suggestions.length ? suggestions.map((song) => (
            <button key={song.id} onClick={() => onSelect(song)}>
              <span>{song.cover}</span>
              <span><strong>{song.title}</strong><small>{song.artist}</small></span>
            </button>
          )) : <p>No se encontraron canciones con ese prefijo.</p>}
        </div>
      )}
    </section>
  );
}