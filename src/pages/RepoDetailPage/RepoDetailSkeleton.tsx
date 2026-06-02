import clsx from 'clsx';
import styles from './RepoDetailPage.module.css';

export default function RepoDetailSkeleton() {
  return (
    <div className="card shadow-sm overflow-hidden" aria-hidden="true">
      <div className={styles.repoDetailHeader}>
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div className={clsx(styles.skeletonLight, styles.skeletonRepoName)} />
          <div className={clsx(styles.skeletonLight, styles.skeletonButton)} />
        </div>
        <div className={clsx(styles.skeletonLight, styles.skeletonDesc)} />
      </div>
      <div className="card-body">
        <div className="row row-cols-2 row-cols-md-3 g-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="col">
              <div className="border rounded p-3 text-center">
                <div className={clsx(styles.skeleton, styles.skeletonStatValue, 'mx-auto')} />
                <div className={clsx(styles.skeleton, styles.skeletonStatLabel, 'mx-auto mt-2')} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
