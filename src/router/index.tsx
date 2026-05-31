import { createBrowserRouter } from 'react-router-dom';
import SearchPage from '../pages/SearchPage/SearchPage';
import UserPage from '../pages/UserPage/UserPage';
import RepoDetailPage from '../pages/RepoDetailPage/RepoDetailPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  { path: '/', element: <SearchPage /> },
  { path: '/user/:username', element: <UserPage /> },
  { path: '/user/:username/repo/:repoName', element: <RepoDetailPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
