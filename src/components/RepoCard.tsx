import { Link } from 'react-router-dom';
import type { GitHubRepository } from '../types';

interface Props {
  repo: GitHubRepository;
  username: string;
}

export default function RepoCard({ repo, username }: Props) {
  return (
    <Link to={`/user/${username}/repo/${repo.name}`} className="text-decoration-none">
      <div className="card mb-2 shadow-sm repo-card">
        <div className="card-body py-3">
          <div className="d-flex justify-content-between align-items-start">
            <h3 className="h6 mb-1 text-primary">{repo.name}</h3>
            <div className="d-flex gap-2 flex-shrink-0">
              <span className="badge bg-warning text-dark">
                ⭐ {repo.stargazers_count.toLocaleString()}
              </span>
              {repo.language && (
                <span className="badge bg-secondary">{repo.language}</span>
              )}
            </div>
          </div>
          {repo.description && (
            <p className="text-muted small mb-0 mt-1">{repo.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
