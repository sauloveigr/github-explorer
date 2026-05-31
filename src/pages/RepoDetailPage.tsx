import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getRepo } from '../services/github';
import type { GitHubRepository } from '../types';

export default function RepoDetailPage() {
  const { username = '', repoName = '' } = useParams<{ username: string; repoName: string }>();
  const [repo, setRepo] = useState<GitHubRepository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getRepo(`${username}/${repoName}`, controller.signal)
      .then((data) => {
        setRepo(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'CanceledError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [username, repoName]);

  return (
    <Layout>
      <div className="container">
        <Link to={`/user/${username}`} className="btn btn-outline-secondary btn-sm mb-4">
          ← Voltar para @{username}
        </Link>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {repo && (
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <h1 className="h3 mb-0">{repo.name}</h1>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-sm"
                >
                  Ver no GitHub ↗
                </a>
              </div>
              {repo.description && (
                <p className="text-muted mt-3 mb-0">{repo.description}</p>
              )}
              <hr />
              <div className="row row-cols-2 row-cols-md-3 g-3">
                <StatCard label="Estrelas" value={`⭐ ${repo.stargazers_count.toLocaleString()}`} />
                <StatCard label="Forks" value={`🔀 ${repo.forks_count.toLocaleString()}`} />
                {repo.language && <StatCard label="Linguagem" value={repo.language} />}
              </div>
              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <span key={topic} className="badge rounded-pill bg-info text-dark">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="col">
      <div className="border rounded p-3 text-center">
        <div className="fs-5 fw-semibold">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
}
