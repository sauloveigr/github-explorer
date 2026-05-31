import { useState, type FormEvent } from 'react';

interface Props {
  initialValue?: string;
  onSearch: (username: string) => void;
}

export default function SearchBar({ initialValue = '', onSearch }: Props) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group input-group-lg shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuário no GitHub..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Nome do usuário"
        />
        <button type="submit" className="btn btn-dark" disabled={!value.trim()}>
          Buscar
        </button>
      </div>
    </form>
  );
}
