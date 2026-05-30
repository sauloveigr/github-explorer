import {useState, useEffect} from 'react';
import {getUserRepos} from '../services/github';
import type {GitHubRepository} from '../types';

interface State {
  repos: GitHubRepository[];
  loading: boolean;
  error: string | null;
}

export const useRepositories = (username: string): State => {
  const [state, setState] = useState<State>({
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();
    setState({repos: [], loading: true, error: null});

    getUserRepos(username, controller.signal)
      .then((repos) => setState({repos, loading: false, error: null}))
      .catch((err: Error) => {
        if (err.name === 'CanceledError') return;
        setState({repos: [], loading: false, error: err.message});
      });

    return () => controller.abort();
  }, [username]);

  return state;
};
