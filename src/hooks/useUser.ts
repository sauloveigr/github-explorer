import {useState, useEffect} from 'react';
import {getUser} from '../services/github';
import type {GitHubUser} from '../types';

interface State {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export function useUser(username: string): State {
  const [state, setState] = useState<State>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();
    setState({user: null, loading: true, error: null});

    getUser(username, controller.signal)
      .then((user) => setState({user, loading: false, error: null}))
      .catch((err: Error) => {
        if (err.name === 'CanceledError') return;
        setState({user: null, loading: false, error: err.message});
      });

    return () => controller.abort();
  }, [username]);

  return state;
}
