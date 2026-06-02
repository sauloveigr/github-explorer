import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';
import type { GitHubUser } from '../../types/github';

const baseUser: GitHubUser = {
  id: 1,
  login: 'torvalds',
  avatar_url: 'https://avatars.githubusercontent.com/u/1',
  html_url: 'https://github.com/torvalds',
  name: 'Linus Torvalds',
  email: null,
  bio: 'Linux kernel creator',
  location: 'Portland, OR',
  public_repos: 5,
  followers: 200000,
  following: 0,
};

describe('UserCard', () => {
  it('renders avatar with descriptive alt text', () => {
    render(<UserCard user={baseUser} />);
    const avatar = screen.getByAltText('Avatar de torvalds');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', baseUser.avatar_url);
  });

  it('renders the user name', () => {
    render(<UserCard user={baseUser} />);
    expect(screen.getByText('Linus Torvalds')).toBeInTheDocument();
  });

  it('renders login as name fallback when name is null', () => {
    render(<UserCard user={{ ...baseUser, name: null }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('torvalds');
  });

  it('renders the GitHub profile link', () => {
    render(<UserCard user={baseUser} />);
    const link = screen.getByRole('link', { name: '@torvalds' });
    expect(link).toHaveAttribute('href', 'https://github.com/torvalds');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders bio when present', () => {
    render(<UserCard user={baseUser} />);
    expect(screen.getByText('Linux kernel creator')).toBeInTheDocument();
  });

  it('does not render bio when bio is null', () => {
    render(<UserCard user={{ ...baseUser, bio: null }} />);
    expect(screen.queryByText('Linux kernel creator')).not.toBeInTheDocument();
  });

  it('renders follower, following and repo stats', () => {
    render(<UserCard user={baseUser} />);
    const stats = screen.getByRole('region', { name: 'Estatísticas' });
    expect(stats).toBeInTheDocument();
    expect(screen.getByText('Seguidores')).toBeInTheDocument();
    expect(screen.getByText('Seguindo')).toBeInTheDocument();
    expect(screen.getByText('Repos')).toBeInTheDocument();
    expect(screen.getByText((200000).toLocaleString())).toBeInTheDocument();
    expect(screen.getByText((5).toLocaleString())).toBeInTheDocument();
  });

  it('renders location when present', () => {
    render(<UserCard user={baseUser} />);
    expect(screen.getByText(/Portland, OR/)).toBeInTheDocument();
  });

  it('renders email as a mailto link when present', () => {
    render(<UserCard user={{ ...baseUser, email: 'linus@example.com' }} />);
    const emailLink = screen.getByRole('link', { name: /linus@example.com/ });
    expect(emailLink).toHaveAttribute('href', 'mailto:linus@example.com');
  });

  it('does not render address section when both location and email are null', () => {
    const { container } = render(<UserCard user={{ ...baseUser, location: null, email: null }} />);
    expect(container.querySelector('address')).not.toBeInTheDocument();
  });


});
