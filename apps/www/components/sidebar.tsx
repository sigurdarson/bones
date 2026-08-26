import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { siteNav } from "@/lib/nav";

export function Sidebar() {
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <nav className="sidebar" aria-label="Documentation">
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
