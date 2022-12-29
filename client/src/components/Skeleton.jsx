import "../styles/skeleton.css";

const SkeletonElement = ({ type }) => {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
};

export const Shimmer = () => {
    return (
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    );
  };

export const SkeletonList = () => {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton-list">
            <div className="skeleton-inner">
                <SkeletonElement type="imgwrap" />
                <div className="skeleton-content-inner">
                    <SkeletonElement type="review-farm-title" />
                    <SkeletonElement type="review-content" />
                    <SkeletonElement type="review-content" />
                    <SkeletonElement type="review-content" />
                    <SkeletonElement type="review-content" />
                </div>
            </div>
            <div className="skeleton-button-wrap">
                <SkeletonElement type="confirm-button" />
                <SkeletonElement type="confirm-button" />
            </div>
        </div>
      </div>
    );
};
  