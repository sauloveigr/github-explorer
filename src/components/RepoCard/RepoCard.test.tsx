import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepoCard from './RepoCard';
import type { GitHubRepository } from '../../types/github';

const baseRepo: GitHubRepository = {
  id: 1,
  name: 'linux',
  full_name: 'torvalds/linux',
  html_url: 'https://github.com/torvalds/linux',
  description: 'Linux kernel source tree',
  stargazers_count: 180000,
  forks_count: 55000,
  language: 'C',
  updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
};

function renderRepoCard(repo = baseRepo, username = 'torvalds') {
  return render(
    <MemoryRouter>
      <RepoCard repo={repo} username={username} />
    </MemoryRouter>,
  );
}

describe('RepoCard', () => {
  it('renders the repo name', () => {
    renderRepoCard();
    expect(screen.getByRole('heading', { name: 'linux' })).toBeInTheDocument();
  });

  it('links to the correct repo detail page', () => {
    renderRepoCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/user/torvalds/repo/linux');
  });

  it('renders description when present', () => {
    renderRepoCard();
    expect(screen.getByText('Linux kernel source tree')).toBeInTheDocument();
  });

  it('does not render description when null', () => {
    renderRepoCard({ ...baseRepo, description: null });
    expect(screen.queryByText('Linux kernel source tree')).not.toBeInTheDocument();
  });

  it('renders star count formatted', () => {
    renderRepoCard();
    expect(screen.getByText(/180.000|180,000/)).toBeInTheDocument();
  });

  it('renders language when present', () => {
    renderRepoCard();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('does not render language when null', () => {
    renderRepoCard({ ...baseRepo, language: null });
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });

  it('renders relative update date', () => {
    renderRepoCard();
    expect(screen.getByText(/dia|dias/i)).toBeInTheDocument();
  });
});
