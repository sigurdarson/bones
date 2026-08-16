import * as React from "react";
import { cx } from "../lib/cx";

export interface ButtonProps extends React.ComponentProps<"button"> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Control height: sm = 32px, md = 36px, lg = 40px. @default "md" */
  size?: "sm" | "md" | "lg";
}

/**
 * A button. Radius follows --ub-radius-control, so it respects the
 * rounded/pill setting; colors come from semantic tokens.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-variant={variant}
      data-size={size}
      className={cx("ub-button", className)}
      {...props}
    />
  );
}
