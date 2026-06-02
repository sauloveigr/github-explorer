import { comparators } from './sort';
import type { GitHubRepository } from '../types/github';

const makeRepo = (overrides: Partial<GitHubRepository>): GitHubRepository => ({
  id: 1,
  name: 'repo',
  full_name: 'user/repo',
  html_url: 'https://github.com/user/repo',
  description: null,
  stargazers_count: 0,
  forks_count: 0,
  language: null,
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('comparators.stars', () => {
  it('retorna positivo quando a tem mais estrelas que b', () => {
    const a = makeRepo({ stargazers_count: 10 });
    const b = makeRepo({ stargazers_count: 5 });
    expect(comparators.stars(a, b)).toBeGreaterThan(0);
  });

  it('retorna negativo quando a tem menos estrelas que b', () => {
    const a = makeRepo({ stargazers_count: 2 });
    const b = makeRepo({ stargazers_count: 8 });
    expect(comparators.stars(a, b)).toBeLessThan(0);
  });

  it('retorna zero quando têm o mesmo número de estrelas', () => {
    const a = makeRepo({ stargazers_count: 5 });
    const b = makeRepo({ stargazers_count: 5 });
    expect(comparators.stars(a, b)).toBe(0);
  });
});

describe('comparators.name', () => {
  it('ordena por nome em ordem alfabética', () => {
    const a = makeRepo({ name: 'b-repo' });
    const b = makeRepo({ name: 'a-repo' });
    expect(comparators.name(a, b)).toBeGreaterThan(0);
  });

  it('retorna zero para nomes iguais', () => {
    const a = makeRepo({ name: 'repo' });
    const b = makeRepo({ name: 'repo' });
    expect(comparators.name(a, b)).toBe(0);
  });
});

describe('comparators.updated', () => {
  it('retorna negativo quando a é mais antigo que b', () => {
    const a = makeRepo({ updated_at: '2024-01-01T00:00:00Z' });
    const b = makeRepo({ updated_at: '2024-06-01T00:00:00Z' });
    expect(comparators.updated(a, b)).toBeLessThan(0);
  });

  it('retorna positivo quando a é mais recente que b', () => {
    const a = makeRepo({ updated_at: '2024-12-01T00:00:00Z' });
    const b = makeRepo({ updated_at: '2024-01-01T00:00:00Z' });
    expect(comparators.updated(a, b)).toBeGreaterThan(0);
  });
});
