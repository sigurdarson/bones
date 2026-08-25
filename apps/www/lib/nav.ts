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
      { title: "Accordion", href: "/components/accordion" },
      { title: "Alert dialog", href: "/components/alert-dialog" },
      { title: "Avatar", href: "/components/avatar" },
      { title: "Avatar group", href: "/components/avatar-group" },
      { title: "Button", href: "/components/button" },
      { title: "Checkbox", href: "/components/checkbox" },
      { title: "Checkbox group", href: "/components/checkbox-group" },
      { title: "Collapsible", href: "/components/collapsible" },
      { title: "Combobox", href: "/components/combobox" },
      { title: "Context menu", href: "/components/context-menu" },
      { title: "Dialog", href: "/components/dialog" },
      { title: "Drawer", href: "/components/drawer" },
      { title: "Field", href: "/components/field" },
      { title: "Fieldset", href: "/components/fieldset" },
      { title: "Form", href: "/components/form" },
      { title: "Input", href: "/components/input" },
      { title: "Menu", href: "/components/menu" },
      { title: "Menubar", href: "/components/menubar" },
      { title: "Meter", href: "/components/meter" },
      { title: "Navigation menu", href: "/components/navigation-menu" },
      { title: "Number field", href: "/components/number-field" },
      { title: "OTP field", href: "/components/otp-field" },
      { title: "Popover", href: "/components/popover" },
      { title: "Preview card", href: "/components/preview-card" },
      { title: "Progress", href: "/components/progress" },
      { title: "Radio", href: "/components/radio" },
      { title: "Scroll area", href: "/components/scroll-area" },
      { title: "Select", href: "/components/select" },
      { title: "Separator", href: "/components/separator" },
      { title: "Slider", href: "/components/slider" },
      { title: "Switch", href: "/components/switch" },
      { title: "Tabs", href: "/components/tabs" },
      { title: "Toast", href: "/components/toast" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Toggle group", href: "/components/toggle-group" },
      { title: "Toolbar", href: "/components/toolbar" },
      { title: "Tooltip", href: "/components/tooltip" },
    ],
  },
];
