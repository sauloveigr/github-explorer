interface Props {
  history: string[];
  onSelect: (username: string) => void;
}

export default function RecentSearches({ history, onSelect }: Props) {
  if (history.length === 0) return null;

  return (
    <section aria-label="Buscas recentes" className="mt-4">
      <p className="text-muted small mb-2">Buscas recentes:</p>
      <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
        {history.map((username) => (
          <li key={username}>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => onSelect(username)}
            >
              @{username}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
