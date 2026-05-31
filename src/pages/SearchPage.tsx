import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const HISTORY_KEY = 'gh_search_history';
const MAX_HISTORY = 5;

function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

function saveHistory(username: string): string[] {
  const updated = [username, ...getHistory().filter((u) => u !== username)].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<string[]>(getHistory);

  const handleSearch = (username: string) => {
    setHistory(saveHistory(username));
    navigate(`/user/${username}`);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="text-center mb-5">
              <h1 className="display-6 fw-bold mb-2">GitHub Explorer</h1>
              <p className="text-muted">Explore repositórios de qualquer usuário do GitHub</p>
            </div>
            <SearchBar onSearch={handleSearch} />
            {history.length > 0 && (
              <div className="mt-4">
                <p className="text-muted small mb-2">Buscas recentes:</p>
                <div className="d-flex flex-wrap gap-2">
                  {history.map((u) => (
                    <button
                      key={u}
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleSearch(u)}
                    >
                      @{u}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
