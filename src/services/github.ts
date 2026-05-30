import api from './api';
import type {GitHubUser, GitHubRepository} from '../types';

export const getUser = (username: string, signal?: AbortSignal) =>
  api.get<GitHubUser>(`/users/${username}`, {signal}).then((r) => r.data);

export const getUserRepos = (username: string, signal?: AbortSignal) =>
  api
    .get<GitHubRepository[]>(`/users/${username}/repos`, {
      params: {per_page: 100},
      signal,
    })
    .then((r) => r.data);

export const getRepo = (fullName: string, signal?: AbortSignal) =>
  api.get<GitHubRepository>(`/repos/${fullName}`, {signal}).then((r) => r.data);
