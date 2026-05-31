import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ErrorMessage from '../components/ErrorMessage';
import { getRepo } from '../services/github';
import type { GitHubRepository } from '../types';
import styles from './RepoDetailPage.module.css';

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
        {error && <ErrorMessage message={error} />}
        {loading && <RepoDetailSkeleton />}
        {repo && (
          <article className="card shadow-sm overflow-hidden">
            <header className={styles.repoDetailHeader}>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <h1 className="h3 mb-0 text-white">{repo.name}</h1>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light btn-sm"
                >
                  Ver no GitHub ↗
                </a>
              </div>
              {repo.description && (
                <p className={clsx('mt-2 mb-0', styles.repoDetailDesc)}>{repo.description}</p>
              )}
            </header>
            <div className="card-body">
              <section aria-label="Estatísticas" className="row row-cols-2 row-cols-md-3 g-3">
                <StatCard label="Estrelas" value={`⭐ ${repo.stargazers_count.toLocaleString()}`} />
                <StatCard label="Forks" value={`🔀 ${repo.forks_count.toLocaleString()}`} />
                {repo.language && <StatCard label="Linguagem" value={repo.language} />}
              </section>
              {repo.topics && repo.topics.length > 0 && (
                <ul className="list-unstyled mt-3 d-flex flex-wrap gap-2 mb-0" aria-label="Tópicos">
                  {repo.topics.map((topic) => (
                    <li key={topic}>
                      <span className={clsx('rounded-pill small px-2 py-1', styles.topicBadge)}>
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
}

function RepoDetailSkeleton() {
  return (
    <div className="card shadow-sm overflow-hidden">
      <div className={styles.repoDetailHeader}>
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div className={clsx(styles.skeletonLight, styles.skeletonRepoName)} />
          <div className={clsx(styles.skeletonLight, styles.skeletonButton)} />
        </div>
        <div className={clsx(styles.skeletonLight, styles.skeletonDesc)} />
      </div>
      <div className="card-body">
        <div className="row row-cols-2 row-cols-md-3 g-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="col">
              <div className="border rounded p-3 text-center">
                <div className={clsx(styles.skeleton, styles.skeletonStatValue, 'mx-auto')} />
                <div className={clsx(styles.skeleton, styles.skeletonStatLabel, 'mx-auto mt-2')} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="col">
      <div className="border rounded p-3 text-center h-100">
        <div className="fs-5 fw-semibold">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
}
