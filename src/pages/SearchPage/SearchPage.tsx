import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import SearchCard from '../../components/SearchCard/SearchCard';
import { addToHistory } from '../../store/historySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.items);

  const handleSearch = (username: string) => {
    dispatch(addToHistory(username));
    navigate(`/user/${username}`);
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <SearchCard history={history} onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
