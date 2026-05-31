import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import SearchBar from '../../components/SearchBar/SearchBar';
import GitHubIcon from '../../components/GitHubIcon/GitHubIcon';
import { getHistory, saveHistory } from '../../utils/history';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<string[]>(getHistory);

  const handleSearch = (username: string) => {
    setHistory(saveHistory(username));
    navigate(`/user/${username}`);
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-sm overflow-hidden">
              <div className={clsx('text-white text-center py-5 px-4', styles.searchCardHeader)}>
                <GitHubIcon className="mb-3" />
                <h1 className="display-6 fw-bold mb-1">GitHub Explorer</h1>
                <p className="mb-0 opacity-75 small">
                  Explore repositórios de qualquer usuário do GitHub
                </p>
              </div>
              <div className="card-body p-4">
                <SearchBar onSearch={handleSearch} />
                {history.length > 0 && (
                  <section aria-label="Buscas recentes" className="mt-4">
                    <p className="text-muted small mb-2">Buscas recentes:</p>
                    <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                      {history.map((username) => (
                        <li key={username}>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleSearch(username)}
                          >
                            @{username}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
