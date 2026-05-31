import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { GitHubRepository } from '../../types';
import LANG_COLORS from '../../utils/langColors';
import { formatRelativeDate } from '../../utils/date';
import styles from './RepoCard.module.css';

interface Props {
  repo: GitHubRepository;
  username: string;
}

export default function RepoCard({ repo, username }: Props) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#ccc') : '#ccc';

  return (
    <Link to={`/user/${username}/repo/${repo.name}`} className="text-decoration-none">
      <article className={clsx('card mb-2 shadow-sm', styles.repoCard)}>
        <div className="card-body">
          <h3 className={clsx('h6 mb-1', styles.repoCardName)}>{repo.name}</h3>
          {repo.description && (
            <p className={clsx('text-muted small mb-0', styles.repoCardDesc)}>
              {repo.description}
            </p>
          )}
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex align-items-center gap-3">
              {repo.language && (
                <span className={clsx('d-flex align-items-center gap-1 small', styles.repoLanguage)}>
                  <span className={styles.langDot} style={{ backgroundColor: langColor }} />
                  {repo.language}
                </span>
              )}
              <span className={clsx('small', styles.repoStars)}>
                ⭐ {repo.stargazers_count.toLocaleString()}
              </span>
            </div>
            <span className={clsx('text-muted', styles.repoDate)}>
              {formatRelativeDate(repo.updated_at)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
