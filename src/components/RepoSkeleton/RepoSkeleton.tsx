import clsx from 'clsx';
import styles from './RepoSkeleton.module.css';

export default function RepoSkeleton() {
  return (
    <div className="card mb-2 shadow-sm" aria-hidden="true">
      <div className="card-body py-3">
        <div className="d-flex justify-content-between align-items-start">
          <div className={clsx(styles.skeleton, styles.skeletonTitle)} />
          <div className="d-flex gap-2">
            <div className={clsx(styles.skeleton, styles.skeletonBadge)} />
            <div className={clsx(styles.skeleton, styles.skeletonBadgeLg)} />
          </div>
        </div>
        <div className={clsx(styles.skeleton, styles.skeletonDesc, 'mt-2')} />
        <div className={clsx(styles.skeleton, styles.skeletonDate, 'mt-1')} />
      </div>
    </div>
  );
}
