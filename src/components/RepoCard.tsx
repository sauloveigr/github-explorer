import { Link } from 'react-router-dom';
import type { GitHubRepository } from '../types';
import LANG_COLORS from '../utils/langColors';
import { formatRelativeDate } from '../utils/date';

interface Props {
  repo: GitHubRepository;
  username: string;
}

export default function RepoCard({ repo, username }: Props) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#ccc') : '#ccc';

  return (
    <Link to={`/user/${username}/repo/${repo.name}`} className="text-decoration-none">
      <div className="card mb-2 shadow-sm repo-card">
        <div className="card-body py-3">
          <div className="d-flex justify-content-between align-items-start">
            <h3 className="h6 mb-1 text-primary">{repo.name}</h3>
            <div className="d-flex gap-2 flex-shrink-0 align-items-center">
              <span className="d-flex align-items-center gap-1 small repo-stars">
                ⭐ {repo.stargazers_count.toLocaleString()}
              </span>
              {repo.language && (
                <span className="d-flex align-items-center gap-1 small repo-language">
                  <span className="lang-dot" style={{ backgroundColor: langColor }} />
                  {repo.language}
                </span>
              )}
            </div>
          </div>
          {repo.description && (
            <p className="text-muted small mb-0 mt-1">{repo.description}</p>
          )}
          <p className="text-muted mb-0 mt-2 repo-date">
            Atualizado em {formatRelativeDate(repo.updated_at)}
          </p>
        </div>
      </div>
    </Link>
  );
}
