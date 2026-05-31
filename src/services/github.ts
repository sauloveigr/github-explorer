import api from './api';
import type {GitHubUser, GitHubRepository} from '../types';

export async function getUser(username: string, signal?: AbortSignal) {
  const { data } = await api.get<GitHubUser>(`/users/${username}`, { signal });
  return data;
}

export async function getUserRepos(username: string, signal?: AbortSignal) {
  const { data } = await api.get<GitHubRepository[]>(`/users/${username}/repos`, {
    params: { per_page: 100 },
    signal,
  });
  return data;
}

export async function getRepo(fullName: string, signal?: AbortSignal) {
  const { data } = await api.get<GitHubRepository>(`/repos/${fullName}`, { signal });
  return data;
}
