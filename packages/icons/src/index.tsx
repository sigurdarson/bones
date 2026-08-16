"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Loader2,
  Search,
  X,
} from "lucide-react";

/**
 * bones components never import an icon library directly; they ask for a
 * semantic name through this adapter. The default set is Lucide; apps swap
 * sets (e.g. Hugeicons) by mounting <IconProvider icons={...}> once.
 */
export type IconName =
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "close"
  | "copy"
  | "loader"
  | "search";

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type IconSet = Record<IconName, IconComponent>;

export const defaultIcons: IconSet = {
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  close: X,
  copy: Copy,
  loader: Loader2,
  search: Search,
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
  /** Square size in pixels. @default 16 */
  size?: number;
}

export function Icon({ name, size = 16, ...props }: IconProps) {
  const Component = useIcon(name);
  return <Component width={size} height={size} aria-hidden {...props} />;
}
