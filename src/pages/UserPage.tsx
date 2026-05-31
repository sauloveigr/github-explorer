import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import RepoCard from '../components/RepoCard';
import SortControl from '../components/SortControl';
import LoadingSpinner from '../components/LoadingSpinner';
import RepoSkeleton from '../components/RepoSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import { useUser } from '../hooks/useUser';
import { useRepositories } from '../hooks/useRepositories';
import type { SortBy } from '../types';
import { comparators } from '../utils/sort';

type SortDir = 'asc' | 'desc';

export default function UserPage() {
  const { username = '' } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortBy>('stars');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const { user, loading: userLoading, error: userError } = useUser(username);
  const { repos, loading: reposLoading, error: reposError } = useRepositories(username);

  const sortedRepos = [...repos].sort((a, b) =>
    (sortDir === 'asc' ? 1 : -1) * comparators[sortBy](a, b)
  );

  return (
    <Layout>
      <div className="container">
        <div className="mb-4">
          <SearchBar initialValue={username} onSearch={(newUsername) => navigate(`/user/${newUsername}`)} />
        </div>

        {userError && <ErrorMessage message={userError} />}

        {!userError && (
          <div className="row g-4">
            <div className="col-lg-4">
              {userLoading && <LoadingSpinner />}
              {user && <UserCard user={user} />}
            </div>

            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h2 className="h5 mb-0">
                  Repositórios
                  {!reposLoading && (
                    <span className="text-muted fw-normal ms-2 small">({repos.length})</span>
                  )}
                </h2>
                {!reposLoading && (
                  <SortControl
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSortBy={setSortBy}
                    onSortDir={setSortDir}
                  />
                )}
              </div>

              {reposLoading && Array.from({ length: 5 }).map((_, index) => <RepoSkeleton key={index} />)}
              {reposError && <ErrorMessage message={reposError} />}
              {!reposLoading && !reposError && sortedRepos.length === 0 && (
                <p className="text-muted">Nenhum repositório público encontrado.</p>
              )}
              {!reposLoading && sortedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} username={username} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
