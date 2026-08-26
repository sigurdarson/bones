"use client";

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { withBase } from "../lib/with-base";

export interface TabsRootProps extends BaseTabs.Root.Props {
  /** Two sizes only: default is 36px tall tabs with 16px text, compact is 28px with 14px text. @default "default" */
  size?: "default" | "compact";
}

/**
 * Groups a tab list with its panels and tracks which one is active.
 * Uncontrolled via defaultValue, controlled via value/onValueChange.
 */
export function TabsRoot({ className, size = "default", ...props }: TabsRootProps) {
  return (
    <BaseTabs.Root
      data-size={size}
      className={withBase("ub-tabs", className)}
      {...props}
    />
  );
}

export interface TabsListProps extends BaseTabs.List.Props {}

/**
 * Holds the tab buttons. The sliding active indicator is rendered
 * automatically, so lists never need to include it by hand.
 */
export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <BaseTabs.List className={withBase("ub-tabs-list", className)} {...props}>
      {children}
      <BaseTabs.Indicator className="ub-tabs-indicator" />
    </BaseTabs.List>
  );
}

export interface TabsTabProps extends BaseTabs.Tab.Props {
  /**
   * Square tab holding only an icon. Provide an aria-label so the tab still
   * has an accessible name. @default false
   */
  iconOnly?: boolean;
}

/**
 * One tab button. The active state comes through data-active. Icons go in
 * as children: before the label (leading), after it (trailing), or alone
 * with iconOnly.
 */
export function TabsTab({ className, iconOnly = false, ...props }: TabsTabProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "Bones: an icon-only TabsTab needs an aria-label (or aria-labelledby) so it has an accessible name.",
    );
  }
  return (
    <BaseTabs.Tab
      data-icon-only={iconOnly ? "" : undefined}
      className={withBase("ub-tabs-tab", className)}
      {...props}
    />
  );
}

export interface TabsPanelProps extends BaseTabs.Panel.Props {}

/** The content shown while its matching Tab is active. */
export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={withBase("ub-tabs-panel", className)} {...props} />;
}
