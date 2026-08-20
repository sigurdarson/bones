import * as React from "react";
import { cx } from "../lib/cx";

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** How many avatars to show; the rest collapse into a +N chip. Omit to show all. */
  max?: number;
  /** Size of the +N overflow chip; match it to the Avatars inside. @default "default" */
  size?: "default" | "compact";
}

/**
 * Overlapping Avatars for a team or a set of collaborators. Hand-rolled
 * (no Base UI part exists): put Avatars inside; each gets a ring in the
 * page background so the stack reads cleanly, and anything past max
 * collapses into a +N chip. Order children most-important first.
 */
export function AvatarGroup({
  className,
  max,
  size = "default",
  children,
  ...props
}: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max != null && items.length > max ? items.slice(0, max) : items;
  const overflow = items.length - visible.length;

  return (
    <div className={cx("ub-avatar-group", className)} {...props}>
      {visible}
      {overflow > 0 ? (
        <span
          className="ub-avatar ub-avatar-group-overflow"
          data-size={size}
        >{`+${overflow}`}</span>
      ) : null}
    </div>
  );
}
