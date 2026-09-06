import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { Badge, Status } from "@usebones/react";
import { siteNav } from "@/lib/nav";

export function Sidebar({ className }: { className?: string } = {}) {
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <nav
      className={className ? `sidebar ${className}` : "sidebar"}
      aria-label="Documentation"
    >
      {siteNav.map((section) => (
        <div key={section.title} className="sidebar-section">
          <div className="sidebar-title">{section.title}</div>
          <ul>
            {section.items.map((item) => (
              <li key={item.href}>
                {item.plain ? (
                  <a href={item.href}>{item.title}</a>
                ) : (
                  <Link
                    to={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.title}
                    {item.badge ? (
                      <Badge size="compact" className="sidebar-badge">
                        {item.badge}
                      </Badge>
                    ) : null}
                    {item.status ? (
                      <Status
                        color={item.status}
                        label={item.status === "info" ? "New" : item.status}
                        className="sidebar-status"
                      />
                    ) : null}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
