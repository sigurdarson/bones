"use client";

import * as React from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { withBase } from "../lib/with-base";

export interface ToggleProps extends BaseToggle.Props {
  /** Two sizes only: default is 36px tall with 16px text, compact is 28px with 14px text. @default "default" */
  size?: "default" | "compact";
  /**
   * Square toggle holding only an icon. Provide an aria-label so the
   * toggle still has an accessible name. @default false
   */
  iconOnly?: boolean;
}

/**
 * A pressed/unpressed button, wrapping the Base UI Toggle. Ghost at rest,
 * muted when pressed; state comes through data-pressed. Inside a
 * ToggleGroup, identify it with value.
 */
export function Toggle({
  className,
  size = "default",
  iconOnly = false,
  ...props
}: ToggleProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "Bones: an icon-only Toggle needs an aria-label (or aria-labelledby) so it has an accessible name.",
    );
  }
  return (
    <BaseToggle
      data-size={size}
      data-icon-only={iconOnly ? "" : undefined}
      className={withBase("ub-toggle", className)}
      {...props}
    />
  );
}
