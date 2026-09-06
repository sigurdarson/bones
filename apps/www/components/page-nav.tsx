import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { Button } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { siteNav } from "@/lib/nav";

/* Reading order comes straight from the sidebar; plain files (llms.txt)
   are not pages, so they're skipped. */
const pages = siteNav.flatMap((section) => section.items).filter((item) => !item.plain);

export function PageNav() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const index = pages.findIndex((page) => page.href === pathname);
  const prev = index > 0 ? pages[index - 1] : undefined;
  const next = index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined;

  return (
    <nav className="page-nav" aria-label="Previous and next page">
      {prev ? (
        <Link
          to={prev.href}
          className="ub-button"
          data-variant="secondary"
          data-size="compact"
          data-icon-only=""
          aria-label={`Previous page: ${prev.title}`}
        >
          <Icon name="arrow-left" />
        </Link>
      ) : (
        <Button variant="secondary" size="compact" iconOnly disabled aria-label="Previous page">
          <Icon name="arrow-left" />
        </Button>
      )}
      {next ? (
        <Link
          to={next.href}
          className="ub-button"
          data-variant="secondary"
          data-size="compact"
          data-icon-only=""
          aria-label={`Next page: ${next.title}`}
        >
          <Icon name="arrow-right" />
        </Link>
      ) : (
        <Button variant="secondary" size="compact" iconOnly disabled aria-label="Next page">
          <Icon name="arrow-right" />
        </Button>
      )}
    </nav>
  );
}
