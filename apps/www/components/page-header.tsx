import { PageNav } from "./page-nav";

/* Page title row: H1 left, previous/next page buttons right. */
export function PageHeader({
  title,
  className,
}: {
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="page-header">
      <h1 className={className}>{title}</h1>
      <PageNav />
    </div>
  );
}
