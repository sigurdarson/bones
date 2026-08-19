"use client";

import * as React from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { withBase } from "../lib/with-base";

export interface ProgressProps extends BaseProgress.Root.Props {
  /** Text label above the bar; also names the bar for screen readers. */
  label?: React.ReactNode;
  /** Show the formatted value (a percentage by default) beside the label. @default false */
  showValue?: boolean;
}

/**
 * A task's completion, wrapping the Base UI Progress. Track and indicator
 * render automatically; value={null} means indeterminate (still working,
 * amount unknown). Pass label (or aria-label) so the bar has a name.
 */
export function Progress({
  className,
  label,
  showValue = false,
  ...props
}: ProgressProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    !label &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "bones: a Progress needs a label (or aria-label/aria-labelledby) so screen readers can name it.",
    );
  }
  return (
    <BaseProgress.Root className={withBase("ub-progress", className)} {...props}>
      {label || showValue ? (
        <div className="ub-progress-header">
          {label ? (
            <BaseProgress.Label className="ub-progress-label">
              {label}
            </BaseProgress.Label>
          ) : null}
          {showValue ? <BaseProgress.Value className="ub-progress-value" /> : null}
        </div>
      ) : null}
      <BaseProgress.Track className="ub-progress-track">
        <BaseProgress.Indicator className="ub-progress-indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
