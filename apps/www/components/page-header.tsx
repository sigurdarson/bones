import { Badge } from "@usebones/react";
import { PageNav } from "./page-nav";

/* Page title row: H1 left (with an optional status badge), previous/next
   page buttons right. */
export function PageHeader({
  title,
  badge,
  className,
}: {
  title: React.ReactNode;
  /* A short status shown beside the title, e.g. "Experimental". */
  badge?: string;
  className?: string;
}) {
  return (
    <div className="page-header">
      <h1 className={className}>
        {title}
        {badge ? (
          <Badge size="compact" className="page-badge">
            {badge}
          </Badge>
        ) : null}
      </h1>
      <PageNav />
    </div>
  );
}
