"use client";

import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { withBase } from "../lib/with-base";

export interface ToolbarRootProps extends BaseToolbar.Root.Props {}

/**
 * A row of controls that acts as one tab stop, wrapping the Base UI
 * Toolbar: arrow keys move between the controls inside. Put Bones
 * controls in via ToolbarButton render={<Button ... />} (or a Toggle,
 * ToggleGroup, Select trigger); disabled switches off everything.
 */
export function ToolbarRoot({ className, ...props }: ToolbarRootProps) {
  return (
    <BaseToolbar.Root className={withBase("ub-toolbar", className)} {...props} />
  );
}

export interface ToolbarButtonProps extends BaseToolbar.Button.Props {}

/**
 * One control in the toolbar. Usually wraps a real control via render
 * (render={<Button ... />} or render={<Toggle ... />}), which keeps its
 * own styling while the toolbar wires the roving focus.
 */
export function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={withBase("ub-toolbar-button", className)}
      {...props}
    />
  );
}

export interface ToolbarLinkProps extends BaseToolbar.Link.Props {}

/** A link that participates in the toolbar's arrow-key focus. */
export function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  return (
    <BaseToolbar.Link className={withBase("ub-toolbar-link", className)} {...props} />
  );
}

export interface ToolbarGroupProps extends BaseToolbar.Group.Props {}

/** Groups related controls; disabled switches off the group. */
export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group
      className={withBase("ub-toolbar-group", className)}
      {...props}
    />
  );
}

export interface ToolbarSeparatorProps extends BaseToolbar.Separator.Props {}

/**
 * A line between groups, perpendicular to the toolbar automatically. It
 * is the Separator component's look (ub-separator) plus toolbar spacing,
 * so the two restyle together.
 */
export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      className={withBase("ub-separator ub-toolbar-separator", className)}
      {...props}
    />
  );
}

export interface ToolbarInputProps extends BaseToolbar.Input.Props {}

/**
 * An input that participates in the toolbar's focus order. Usually wraps
 * the Bones Input via render={<Input ... />}.
 */
export function ToolbarInput({ className, ...props }: ToolbarInputProps) {
  return (
    <BaseToolbar.Input
      className={withBase("ub-toolbar-input", className)}
      {...props}
    />
  );
}
