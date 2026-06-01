import { useState } from 'react';
import styles from './SearchBar.module.css';

interface Props {
  initialValue?: string;
  onSearch: (username: string) => void;
}

export default function SearchBar({ initialValue = '', onSearch }: Props) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: { preventDefault(): void }) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`input-group shadow-sm ${styles.inputGroup}`}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuário no GitHub..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="Nome do usuário"
          autoFocus={!initialValue}
        />
        <button type="submit" className="btn btn-dark" disabled={!value.trim()}>
          Buscar
        </button>
      </div>
    </form>
  );
}
