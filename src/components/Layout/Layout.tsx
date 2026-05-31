import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            GitHub Explorer
          </Link>
        </div>
      </nav>
      <main className="py-4">{children}</main>
    </>
  );
}
