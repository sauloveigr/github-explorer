import type { GitHubUser } from '../types';

export default function UserCard({ user }: { user: GitHubUser }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            className="rounded-circle"
            width={96}
            height={96}
          />
          <div>
            <h1 className="h4 mb-0">{user.name ?? user.login}</h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted small"
            >
              @{user.login}
            </a>
            {user.bio && <p className="mt-2 mb-0 text-muted">{user.bio}</p>}
          </div>
        </div>
        <hr />
        <div className="row row-cols-3 g-2 text-center">
          <Stat label="Seguidores" value={user.followers} />
          <Stat label="Seguindo" value={user.following} />
          <Stat label="Repositórios" value={user.public_repos} />
        </div>
        {user.location && (
          <p className="text-muted small mt-2 mb-0">📍 {user.location}</p>
        )}
        {user.email && (
          <p className="text-muted small mb-0">✉️ {user.email}</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="col">
      <div className="fw-bold fs-5">{value.toLocaleString()}</div>
      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{label}</div>
    </div>
  );
}
