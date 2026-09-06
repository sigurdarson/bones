"use client";

import * as React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bold,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  CreditCard,
  Info,
  Italic,
  Loader2,
  Menu,
  Moon,
  Search,
  Sun,
  Underline,
  User,
  X,
} from "lucide-react";

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/* Brand marks are not in stroke icon sets; the GitHub mark is a filled
   path (from the public domain Simple Icons set) drawn to the same box. */
function GithubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* The built-in vocabulary and its Lucide defaults. */
const builtInIcons = {
  "align-center": AlignCenter,
  "align-left": AlignLeft,
  "align-right": AlignRight,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  bell: Bell,
  bold: Bold,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  close: X,
  copy: Copy,
  "credit-card": CreditCard,
  github: GithubMark,
  info: Info,
  italic: Italic,
  loader: Loader2,
  menu: Menu,
  moon: Moon,
  search: Search,
  sun: Sun,
  underline: Underline,
  user: User,
} satisfies Record<string, IconComponent>;

export type BuiltInIconName = keyof typeof builtInIcons;

/**
 * The icon vocabulary: every name an app can ask for. It starts with the
 * built-in set, and an app grows it by augmenting this interface, then
 * supplying the glyphs through IconProvider:
 *
 *   declare module "@usebones/icons" {
 *     interface IconRegistry { rocket: true }
 *   }
 *
 *   <IconProvider icons={{ rocket: RocketGlyph }}>
 *
 * A typed vocabulary means a misspelled or invented name fails to
 * compile, for people and coding agents alike; add names on purpose.
 *
 * @experimental The registry API may change between releases.
 */
export interface IconRegistry extends Record<BuiltInIconName, true> {}

export type IconName = keyof IconRegistry;

/** Every name in the vocabulary mapped to a component. */
export type IconSet = Record<IconName, IconComponent>;

/** The Lucide defaults for the built-in names. */
export const defaultIcons: Record<BuiltInIconName, IconComponent> = builtInIcons;

/**
 * Declare an app's icons once. The returned object is what IconProvider
 * takes, and IconNamesOf<typeof icons> is what IconRegistry extends, so
 * adding fifty names is fifty lines in one object plus a single type
 * line, with every name typed and only the imported glyphs bundled:
 *
 *   export const icons = defineIcons({ rocket: Rocket, "thumbs-up": ThumbsUp });
 *   declare module "@usebones/icons" {
 *     interface IconRegistry extends IconNamesOf<typeof icons> {}
 *   }
 *
 * @experimental
 */
export function defineIcons<const T extends Record<string, IconComponent>>(icons: T): T {
  return icons;
}

/** The names of a defineIcons object as registry entries. @experimental */
export type IconNamesOf<T> = { [K in keyof T & string]: true };

const IconContext = React.createContext<Partial<IconSet>>(defaultIcons);

export interface IconProviderProps {
  /**
   * Glyphs by name: overrides for built-in names, and the glyphs for any
   * names the app added to IconRegistry. Anything omitted falls back to
   * the Lucide default.
   */
  icons: Partial<IconSet>;
  children: React.ReactNode;
}

export function IconProvider({ icons, children }: IconProviderProps) {
  const value = React.useMemo(() => ({ ...defaultIcons, ...icons }), [icons]);
  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

const MissingIcon: IconComponent = () => null;
const warned = new Set<string>();

/**
 * The component behind a name. A name with no glyph (an added name the
 * provider never supplied) renders nothing and warns once in development.
 */
export function useIcon(name: IconName): IconComponent {
  const Component = React.useContext(IconContext)[name];
  if (Component) return Component;
  if (process.env.NODE_ENV !== "production" && !warned.has(name)) {
    warned.add(name);
    console.warn(
      `Bones: no icon is registered for "${name}". Supply it through <IconProvider icons={{ "${name}": ... }}>.`,
    );
  }
  return MissingIcon;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  /**
   * Explicit square size in pixels. When omitted, the icon sizes from the
   * --ub-icon-size token: 16px by default, 14px inside compact contexts.
   */
  size?: number;
}

export function Icon({ name, size, style, ...props }: IconProps) {
  const Component = useIcon(name);
  /* Token-driven size goes through a style so compact scopes can remap the
     variable; an explicit size prop pins exact pixels instead. */
  const sizing =
    size == null
      ? { width: "var(--ub-icon-size, 1rem)", height: "var(--ub-icon-size, 1rem)" }
      : { width: size, height: size };
  return <Component style={{ ...sizing, ...style }} aria-hidden {...props} />;
}
