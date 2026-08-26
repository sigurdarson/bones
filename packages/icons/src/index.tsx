"use client";

import * as React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ArrowRight,
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
  Moon,
  Search,
  Sun,
  Underline,
  User,
  X,
} from "lucide-react";

/**
 * Bones components never import an icon library directly; they ask for a
 * semantic name through this adapter. The default set is Lucide; apps swap
 * sets (e.g. Hugeicons) by mounting <IconProvider icons={...}> once.
 */
export type IconName =
  | "align-center"
  | "align-left"
  | "align-right"
  | "arrow-left"
  | "arrow-right"
  | "bell"
  | "bold"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "close"
  | "copy"
  | "credit-card"
  | "info"
  | "italic"
  | "loader"
  | "moon"
  | "search"
  | "sun"
  | "underline"
  | "user";

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type IconSet = Record<IconName, IconComponent>;

export const defaultIcons: IconSet = {
  "align-center": AlignCenter,
  "align-left": AlignLeft,
  "align-right": AlignRight,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
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
  moon: Moon,
  search: Search,
  sun: Sun,
  underline: Underline,
  user: User,
};

const IconContext = React.createContext<IconSet>(defaultIcons);

export interface IconProviderProps {
  /** Partial overrides; anything omitted falls back to the Lucide default. */
  icons: Partial<IconSet>;
  children: React.ReactNode;
}

export function IconProvider({ icons, children }: IconProviderProps) {
  const value = React.useMemo(() => ({ ...defaultIcons, ...icons }), [icons]);
  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

export function useIcon(name: IconName): IconComponent {
  return React.useContext(IconContext)[name];
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
