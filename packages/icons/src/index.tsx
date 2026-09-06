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
