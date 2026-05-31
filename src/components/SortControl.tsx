import type { SortBy } from '../types';

type SortDir = 'asc' | 'desc';

interface Props {
  sortBy: SortBy;
  sortDir: SortDir;
  onSortBy: (sortField: SortBy) => void;
  onSortDir: (direction: SortDir) => void;
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
        className="form-select form-select-sm sort-select"
        value={sortBy}
        onChange={(event) => onSortBy(event.target.value as SortBy)}
        aria-label="Ordenar por"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
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
