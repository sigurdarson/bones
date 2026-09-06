export interface NavItem {
  title: string;
  href: string;
  /* Plain files (like llms.txt) use a regular anchor, not a router Link. */
  plain?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/* Single source of truth for the sidebar, and the prev/next reading order
   (see page-nav.tsx). New pages register here.

   Component categories, alphabetical within each: Forms hold values a
   user enters or picks; Overlays float above the page; Navigation moves
   between places; Feedback reports state back; General is everything
   else (actions, grouping, display). Ambiguous cases follow the
   primary job: Button is an action (General), Toggle holds a value
   (Forms), Tabs move between panels (Navigation). */
export const siteNav: NavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Quick start", href: "/quick-start" },
      { title: "Theming", href: "/theming" },
      { title: "Sizes", href: "/sizes" },
      { title: "Icons", href: "/icons" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Motion", href: "/motion" },
      { title: "Scrollbars", href: "/scrollbars" },
      { title: "Accessibility", href: "/accessibility" },
      { title: "Skills", href: "/skills" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Autocomplete", href: "/components/autocomplete" },
      { title: "Checkbox", href: "/components/checkbox" },
      { title: "Checkbox group", href: "/components/checkbox-group" },
      { title: "Combobox", href: "/components/combobox" },
      { title: "Field", href: "/components/field" },
      { title: "Fieldset", href: "/components/fieldset" },
      { title: "Form", href: "/components/form" },
      { title: "Input", href: "/components/input" },
      { title: "Number field", href: "/components/number-field" },
      { title: "OTP field", href: "/components/otp-field" },
      { title: "Radio", href: "/components/radio" },
      { title: "Select", href: "/components/select" },
      { title: "Slider", href: "/components/slider" },
      { title: "Switch", href: "/components/switch" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Toggle group", href: "/components/toggle-group" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Alert dialog", href: "/components/alert-dialog" },
      { title: "Context menu", href: "/components/context-menu" },
      { title: "Dialog", href: "/components/dialog" },
      { title: "Drawer", href: "/components/drawer" },
      { title: "Menu", href: "/components/menu" },
      { title: "Popover", href: "/components/popover" },
      { title: "Preview card", href: "/components/preview-card" },
      { title: "Tooltip", href: "/components/tooltip" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Menubar", href: "/components/menubar" },
      { title: "Navigation menu", href: "/components/navigation-menu" },
      { title: "Tabs", href: "/components/tabs" },
      { title: "Toolbar", href: "/components/toolbar" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Meter", href: "/components/meter" },
      { title: "Progress", href: "/components/progress" },
      { title: "Toast", href: "/components/toast" },
    ],
  },
  {
    title: "General",
    items: [
      { title: "Accordion", href: "/components/accordion" },
      { title: "Avatar", href: "/components/avatar" },
      { title: "Avatar group", href: "/components/avatar-group" },
      { title: "Button", href: "/components/button" },
      { title: "Collapsible", href: "/components/collapsible" },
      { title: "Scroll area", href: "/components/scroll-area" },
      { title: "Separator", href: "/components/separator" },
    ],
  },
  {
    title: "More",
    items: [
      { title: "Changelog", href: "/changelog" },
      { title: "llms.txt", href: "/llms.txt", plain: true },
    ],
  },
];
