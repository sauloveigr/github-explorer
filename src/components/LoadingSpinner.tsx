export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center py-5">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
}
