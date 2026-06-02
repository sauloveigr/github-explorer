import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserCard from '../../components/UserCard/UserCard';
import UserCardSkeleton from '../../components/UserCard/UserCardSkeleton';
import RepoList from '../../components/RepoList/RepoList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGetUserQuery, getApiErrorMessage } from '../../store/githubApi';
import { addToHistory } from '../../store/historySlice';
import { useAppDispatch } from '../../store/hooks';

export default function UserPage() {
  const { username = '' } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: user, isLoading: userLoading, error: userError } = useGetUserQuery(username);

  const handleSearch = (newUsername: string) => {
    dispatch(addToHistory(newUsername));
    navigate(`/user/${newUsername}`);
  };

  return (
    <Layout>
      <div className="container">
        <div className="mb-4">
          <SearchBar initialValue={username} onSearch={handleSearch} />
        </div>

        {userError && <ErrorMessage message={getApiErrorMessage(userError)} />}

        {!userError && (
          <div className="row g-4">
            <div className="col-lg-4">
              {userLoading && <UserCardSkeleton />}
              {user && <UserCard user={user} />}
            </div>
            <RepoList username={username} />
          </div>
        )}
      </div>
    </Layout>
  );
}
