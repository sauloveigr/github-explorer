import clsx from 'clsx';
import styles from './UserCard.module.css';

export default function UserCardSkeleton() {
  return (
    <div className="card shadow-sm overflow-hidden" aria-hidden="true">
      <div className={styles.userCardHeader} />
      <div className="card-body">
        <div className={clsx('d-flex align-items-end gap-3', styles.userCardTop)}>
          <div className={clsx(styles.skeleton, styles.skeletonAvatar)} />
          <div className="pb-1 d-flex flex-column gap-2 flex-grow-1 overflow-hidden">
            <div className={clsx(styles.skeleton, styles.skeletonName)} />
            <div className={clsx(styles.skeleton, styles.skeletonLogin)} />
          </div>
        </div>
        <div className={clsx(styles.skeleton, styles.skeletonBio, 'mt-3')} />
        <hr className="my-3" />
        <div className="d-flex justify-content-around text-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="col d-flex flex-column align-items-center gap-1">
              <div className={clsx(styles.skeleton, styles.skeletonStatValue)} />
              <div className={clsx(styles.skeleton, styles.skeletonStatLabel)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
