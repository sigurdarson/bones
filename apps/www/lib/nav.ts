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
      { title: "Alert dialog", href: "/components/alert-dialog" },
      { title: "Button", href: "/components/button" },
      { title: "Checkbox", href: "/components/checkbox" },
      { title: "Checkbox group", href: "/components/checkbox-group" },
      { title: "Dialog", href: "/components/dialog" },
      { title: "Field", href: "/components/field" },
      { title: "Fieldset", href: "/components/fieldset" },
      { title: "Form", href: "/components/form" },
      { title: "Input", href: "/components/input" },
      { title: "Menu", href: "/components/menu" },
      { title: "Number field", href: "/components/number-field" },
      { title: "Popover", href: "/components/popover" },
      { title: "Radio", href: "/components/radio" },
      { title: "Select", href: "/components/select" },
      { title: "Slider", href: "/components/slider" },
      { title: "Switch", href: "/components/switch" },
      { title: "Tabs", href: "/components/tabs" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Toggle group", href: "/components/toggle-group" },
      { title: "Tooltip", href: "/components/tooltip" },
    ],
  },
];
