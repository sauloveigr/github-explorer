import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetRepoQuery, getApiErrorMessage } from '../../store/githubApi';
import RepoDetailSkeleton from './RepoDetailSkeleton';
import StatCard from './StatCard';
import styles from './RepoDetailPage.module.css';

export default function RepoDetailPage() {
  const { username = '', repoName = '' } = useParams<{
    username: string;
    repoName: string;
  }>();

  const { data: repo, isLoading: loading, error } = useGetRepoQuery(`${username}/${repoName}`);

  return (
    <Layout>
      <div className="container">
        <Link to={`/user/${username}`} className="btn btn-outline-secondary btn-sm mb-4">
          ← Voltar para @{username}
        </Link>
        {error && <ErrorMessage message={getApiErrorMessage(error)} />}
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
                <p className={clsx('mt-2 mb-0', styles.repoDetailDesc)}>
                  {repo.description}
                </p>
              )}
            </header>
            <div className="card-body">
              <section aria-label="Estatísticas" className="row row-cols-2 row-cols-md-3 g-3">
                <StatCard label="Estrelas" value={`⭐ ${repo.stargazers_count.toLocaleString()}`} />
                <StatCard label="Forks" value={`🔀 ${repo.forks_count.toLocaleString()}`} />
                {repo.language && <StatCard label="Linguagem" value={repo.language} />}
              </section>
              {repo.topics && repo.topics.length > 0 && (
                <ul
                  className="list-unstyled mt-3 d-flex flex-wrap gap-2 mb-0"
                  aria-label="Tópicos"
                >
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
