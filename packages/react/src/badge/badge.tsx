import * as React from "react";
import { cx } from "../lib/cx";
import { Status, type StatusColor } from "../status/status";

export type BadgeColor =
  | "neutral"
  | "red"
  | "orange"
  | "green"
  | "teal"
  | "blue"
  | "violet"
  | "fuchsia"
  | "rose";

export interface BadgeProps extends React.ComponentProps<"span"> {
  /** The tint: neutral by default, or one of the eight palette hues for categories. Feedback goes through status instead. @default "neutral" */
  color?: BadgeColor;
  /** Two sizes: default is 24px tall, compact is 16px. @default "default" */
  size?: "default" | "compact";
  /** A status dot before the label, in one of the five feedback colors. */
  status?: StatusColor;
}

/**
 * A small label for categories, counts, and states. Hand-rolled (no Base
 * UI part exists): a non-interactive span, so it carries no role of its
 * own and reads as plain text; put a real control around it when it
 * should do something. Icons go in as children before the text, like the
 * Button; status adds a dot before everything.
 */
export function Badge({
  className,
  color = "neutral",
  size = "default",
  status,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx("ub-badge", className)}
      data-color={color}
      data-size={size}
      {...props}
    >
      {status ? <Status color={status} className="ub-badge-status" /> : null}
      {children}
    </span>
  );
}
