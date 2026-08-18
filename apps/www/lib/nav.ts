export interface NavItem {
  title: string;
  href: string;
  /* Plain files (like llms.txt) use a regular anchor, not a Next Link. */
  plain?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/* Single source of truth for the sidebar. New pages register here. */
export const siteNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Quick start", href: "/quick-start" },
      { title: "Accessibility", href: "/accessibility" },
      { title: "Changelog", href: "/changelog" },
      { title: "llms.txt", href: "/llms.txt", plain: true },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Motion", href: "/motion" },
      { title: "Scrollbars", href: "/scrollbars" },
      { title: "Sizes", href: "/sizes" },
      { title: "Theming", href: "/theming" },
      { title: "Skills", href: "/skills" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/components/button" },
      { title: "Switch", href: "/components/switch" },
      { title: "Tabs", href: "/components/tabs" },
    ],
  },
];
