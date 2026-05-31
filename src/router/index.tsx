import { createBrowserRouter } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import UserPage from '../pages/UserPage';
import RepoDetailPage from '../pages/RepoDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  { path: '/', element: <SearchPage /> },
  { path: '/user/:username', element: <UserPage /> },
  { path: '/user/:username/repo/:repoName', element: <RepoDetailPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
