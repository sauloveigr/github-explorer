import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import RepoCard from '../components/RepoCard';
import SortControl from '../components/SortControl';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useUser } from '../hooks/useUser';
import { useRepositories } from '../hooks/useRepositories';
import type { SortBy } from '../types';

type SortDir = 'asc' | 'desc';

export default function UserPage() {
  const { username = '' } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortBy>('stars');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const { user, loading: userLoading, error: userError } = useUser(username);
  const { repos, loading: reposLoading, error: reposError } = useRepositories(username);

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      let diff = 0;
      if (sortBy === 'stars') diff = a.stargazers_count - b.stargazers_count;
      else if (sortBy === 'name') diff = a.name.localeCompare(b.name);
      else if (sortBy === 'updated')
        diff = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      return sortDir === 'asc' ? diff : -diff;
    });
  }, [repos, sortBy, sortDir]);

  return (
    <Layout>
      <div className="container">
        <div className="mb-4">
          <SearchBar initialValue={username} onSearch={(u) => navigate(`/user/${u}`)} />
        </div>
        {userLoading && <LoadingSpinner />}
        {userError && <ErrorMessage message={userError} />}
        {user && (
          <div className="row g-4">
            <div className="col-md-4">
              <UserCard user={user} />
            </div>
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h2 className="h5 mb-0">
                  Repositórios
                  {!reposLoading && (
                    <span className="text-muted fw-normal ms-2 small">({repos.length})</span>
                  )}
                </h2>
                <SortControl
                  sortBy={sortBy}
                  sortDir={sortDir}
                  onSortBy={setSortBy}
                  onSortDir={setSortDir}
                />
              </div>
              {reposLoading && <LoadingSpinner />}
              {reposError && <ErrorMessage message={reposError} />}
              {!reposLoading && !reposError && sortedRepos.length === 0 && (
                <p className="text-muted">Nenhum repositório público encontrado.</p>
              )}
              {sortedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} username={username} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
