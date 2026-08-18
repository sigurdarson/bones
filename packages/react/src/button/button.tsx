import * as React from "react";
import { cx } from "../lib/cx";

export interface ButtonProps extends React.ComponentProps<"button"> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Two sizes only: default is 36px tall with 16px text, compact is 28px with 14px text. @default "default" */
  size?: "default" | "compact";
  /**
   * Square button holding only an icon. Provide an aria-label so the button
   * still has an accessible name. @default false
   */
  iconOnly?: boolean;
}

/**
 * A button. Radius follows --ub-radius-control, so it respects the
 * rounded/pill setting; colors come from semantic tokens and sizing from
 * the size tokens (default/compact). Icons go in as children: before the
 * label (leading), after it (trailing), or alone with iconOnly.
 */
export function Button({
  variant = "primary",
  size = "default",
  iconOnly = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "bones: an icon-only Button needs an aria-label (or aria-labelledby) so it has an accessible name.",
    );
  }
  return (
    <button
      type={type}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly ? "" : undefined}
      className={cx("ub-button", className)}
      {...props}
    />
  );
}
