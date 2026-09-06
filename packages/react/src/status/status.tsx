import * as React from "react";
import { cx } from "../lib/cx";

export type StatusColor = "neutral" | "success" | "info" | "warning" | "danger";

export interface StatusProps extends React.ComponentProps<"span"> {
  /** Which feedback color the dot shows. @default "neutral" */
  color?: StatusColor;
  /**
   * The accessible name when the dot stands alone ("Online", "Failed").
   * Omit it only when adjacent text already says the same thing; the dot
   * is then hidden from screen readers, since color alone carries nothing.
   */
  label?: string;
}

/**
 * An 8px status dot in one of the feedback colors. Hand-rolled (no Base
 * UI part exists). With a label it is an image with that name; without
 * one it is decorative, for placing beside text that already reads the
 * state, which is how the Badge uses it.
 */
export function Status({
  className,
  color = "neutral",
  label,
  ...props
}: StatusProps) {
  return (
    <span
      className={cx("ub-status", className)}
      data-color={color}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
}
