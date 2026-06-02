import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import api from '../services/api';
import type { GitHubUser, GitHubRepository } from '../types/github';

type ApiError = { message: string };

const axiosBaseQuery: BaseQueryFn<string | AxiosRequestConfig, unknown, ApiError> = async (
  args,
  { signal },
) => {
  try {
    const config: AxiosRequestConfig = typeof args === 'string' ? { url: args } : args;
    const { data } = await api.request({ ...config, signal });
    return { data };
  } catch (err) {
    return { error: { message: (err as Error).message } };
  }
};

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<GitHubUser, string>({
      query: (username) => `/users/${username}`,
    }),
    getUserRepos: builder.query<GitHubRepository[], string>({
      query: (username) => ({
        url: `/users/${username}/repos`,
        params: { per_page: 100 },
      }),
    }),
    getRepo: builder.query<GitHubRepository, string>({
      query: (fullName) => `/repos/${fullName}`,
    }),
  }),
});

export const { useGetUserQuery, useGetUserReposQuery, useGetRepoQuery } = githubApi;

export function getApiErrorMessage(error: { message?: string }): string {
  return error.message ?? 'Erro inesperado. Tente novamente.';
}
