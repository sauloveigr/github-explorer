import clsx from 'clsx';
import SearchBar from '../SearchBar/SearchBar';
import GitHubIcon from '../GitHubIcon/GitHubIcon';
import RecentSearches from '../RecentSearches/RecentSearches';
import styles from './SearchCard.module.css';

interface Props {
  history: string[];
  onSearch: (username: string) => void;
}

export default function SearchCard({ history, onSearch }: Props) {
  return (
    <div className="card shadow-sm overflow-hidden">
      <header className={clsx('text-white text-center py-5 px-4', styles.cardHeader)}>
        <GitHubIcon className="mb-3" />
        <h1 className="display-6 fw-bold mb-1">GitHub Explorer</h1>
        <p className="mb-0 opacity-75 small">
          Explore repositórios de qualquer usuário do GitHub
        </p>
      </header>
      <div className="card-body p-4">
        <SearchBar onSearch={onSearch} />
        <RecentSearches history={history} onSelect={onSearch} />
      </div>
    </div>
  );
}
