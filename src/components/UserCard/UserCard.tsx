import clsx from 'clsx';
import type { GitHubUser } from '../../types/github';
import styles from './UserCard.module.css';

export default function UserCard({ user }: { user: GitHubUser }) {
  return (
    <article className="card shadow-sm overflow-hidden">
      <div className={styles.userCardHeader} />
      <div className="card-body">
        <div className={clsx('d-flex align-items-end gap-3', styles.userCardTop)}>
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            className={clsx('rounded-circle flex-shrink-0', styles.userAvatar)}
            width={80}
            height={80}
          />
          <div className="pb-1 overflow-hidden">
            <h1 className="h5 mb-0 fw-bold text-truncate">{user.name ?? user.login}</h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted small"
            >
              @{user.login}
            </a>
          </div>
        </div>
        {user.bio && <p className="text-muted small mt-3 mb-0">{user.bio}</p>}
        <hr className="my-3" />
        <section className="d-flex justify-content-around text-center" aria-label="Estatísticas">
          <Stat label="Seguidores" value={user.followers} />
          <Stat label="Seguindo" value={user.following} />
          <Stat label="Repos" value={user.public_repos} />
        </section>
        {(user.location || user.email) && (
          <address className="mt-3 d-flex flex-column gap-1 mb-0">
            {user.location && <span className="text-muted small">📍 {user.location}</span>}
            {user.email && (
              <a href={`mailto:${user.email}`} className="text-muted small">
                ✉️ {user.email}
              </a>
            )}
          </address>
        )}
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="col">
      <dl className="mb-0">
        <dd className="fw-bold fs-5 mb-0">{value.toLocaleString()}</dd>
        <dt className={clsx('fw-normal text-muted', styles.statLabel)}>{label}</dt>
      </dl>
    </div>
  );
}
