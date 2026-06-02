import { useState } from 'react';
import RepoCard from '../RepoCard/RepoCard';
import RepoSkeleton from '../RepoSkeleton/RepoSkeleton';
import SortControl from '../SortControl/SortControl';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useGetUserReposQuery, getApiErrorMessage } from '../../store/githubApi';
import type { SortBy, SortDir } from '../../types/github';
import { comparators } from '../../utils/sort';

interface Props {
  username: string;
}

export default function RepoList({ username }: Props) {
  const [sortBy, setSortBy] = useState<SortBy>('stars');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const { data: repos = [], isLoading, error } = useGetUserReposQuery(username);

  const sortedRepos = [...repos].sort(
    (a, b) => (sortDir === 'asc' ? 1 : -1) * comparators[sortBy](a, b),
  );

  return (
    <section className="col-lg-8" aria-label="Repositórios">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="h5 mb-0">
          Repositórios
          {!isLoading && (
            <span className="text-muted fw-normal ms-2 small">({repos.length})</span>
          )}
        </h2>
        {!isLoading && (
          <SortControl
            sortBy={sortBy}
            sortDir={sortDir}
            onSortBy={setSortBy}
            onSortDir={setSortDir}
          />
        )}
      </div>

      {isLoading && (
        <ul className="list-unstyled mb-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <RepoSkeleton />
            </li>
          ))}
        </ul>
      )}
      {error && <ErrorMessage message={getApiErrorMessage(error)} />}
      {!isLoading && !error && sortedRepos.length === 0 && (
        <p className="text-muted">Nenhum repositório público encontrado.</p>
      )}
      {!isLoading && !error && (
        <ul className="list-unstyled mb-0">
          {sortedRepos.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} username={username} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
