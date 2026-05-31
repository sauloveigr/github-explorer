import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="container text-center py-5">
        <h1 className="display-1 fw-bold text-muted">404</h1>
        <p className="fs-4 mb-4">Página não encontrada</p>
        <Link to="/" className="btn btn-dark">
          Voltar para o início
        </Link>
      </div>
    </Layout>
  );
}
