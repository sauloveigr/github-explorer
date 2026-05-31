import type { SortBy } from '../types';

type SortDir = 'asc' | 'desc';

interface Props {
  sortBy: SortBy;
  sortDir: SortDir;
  onSortBy: (val: SortBy) => void;
  onSortDir: (val: SortDir) => void;
}

const OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'name', label: 'Nome' },
  { value: 'updated', label: 'Atualização' },
];

export default function SortControl({ sortBy, sortDir, onSortBy, onSortDir }: Props) {
  return (
    <div className="d-flex gap-2 align-items-center">
      <select
        className="form-select form-select-sm"
        style={{ width: 'auto' }}
        value={sortBy}
        onChange={(e) => onSortBy(e.target.value as SortBy)}
        aria-label="Ordenar por"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => onSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
      >
        {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
}
