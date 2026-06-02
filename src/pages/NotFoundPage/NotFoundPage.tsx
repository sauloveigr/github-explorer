import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="container text-center py-5">
        <p className="display-1 fw-bold text-muted" aria-hidden="true">404</p>
        <h1 className="fs-4 mb-4">Página não encontrada</h1>
        <Link to="/" className="btn btn-dark">
          Voltar para o início
        </Link>
      </div>
    </Layout>
  );
}
