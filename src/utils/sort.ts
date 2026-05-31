import type { GitHubRepository, SortBy } from '../types';

type Repo = GitHubRepository;

export const comparators: Record<SortBy, (a: Repo, b: Repo) => number> = {
  stars: (a, b) => a.stargazers_count - b.stargazers_count,
  name: (a, b) => a.name.localeCompare(b.name),
  updated: (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at),
};
