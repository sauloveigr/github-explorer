export default function RepoSkeleton() {
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body py-3">
        <div className="d-flex justify-content-between align-items-start">
          <div className="skeleton skeleton-title" />
          <div className="d-flex gap-2">
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-badge-lg" />
          </div>
        </div>
        <div className="skeleton skeleton-desc mt-2" />
        <div className="skeleton skeleton-date mt-1" />
      </div>
    </div>
  );
}
