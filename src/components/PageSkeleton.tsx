type Props = { variant?: "page" | "form"; standalone?: boolean };

export default function PageSkeleton({ variant = "page", standalone = false }: Props) {
  return (
    <div className={`page-skeleton${standalone ? " page-skeleton-standalone" : ""}`} role="status" aria-label="Loading content" aria-busy="true">
      <div className="container-advisory" aria-hidden="true">
        <div className="skeleton-block skeleton-heading" />
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line skeleton-short" />
        {variant === "form" ? (
          <div className="skeleton-form">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i}>
                <div className="skeleton-block skeleton-label" />
                <div className="skeleton-block skeleton-input" />
              </div>
            ))}
            <div className="skeleton-block skeleton-button" />
          </div>
        ) : (
          <>
            <div className="skeleton-block skeleton-hero" />
            <div className="skeleton-cards">
              {Array.from({ length: 3 }, (_, i) => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-block skeleton-media" />
                  <div className="skeleton-block skeleton-line" />
                  <div className="skeleton-block skeleton-line skeleton-short" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
