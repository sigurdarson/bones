"use client";

import * as React from "react";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { withBase } from "../lib/with-base";

export interface MeterProps extends BaseMeter.Root.Props {
  /** Text label above the bar; also names the meter for screen readers. */
  label?: React.ReactNode;
  /** Show the formatted value (a percentage by default) beside the label. @default false */
  showValue?: boolean;
}

/**
 * A measurement within a known range (storage used, seats filled),
 * wrapping the Base UI Meter. Track and indicator render automatically.
 * Unlike Progress, a meter is a current level, not a task underway.
 */
export function Meter({ className, label, showValue = false, ...props }: MeterProps) {
  if (
    process.env.NODE_ENV !== "production" &&
    !label &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "Bones: a Meter needs a label (or aria-label/aria-labelledby) so screen readers can name it.",
    );
  }
  return (
    <BaseMeter.Root className={withBase("ub-meter", className)} {...props}>
      {label || showValue ? (
        <div className="ub-meter-header">
          {label ? (
            <BaseMeter.Label className="ub-meter-label">{label}</BaseMeter.Label>
          ) : null}
          {showValue ? <BaseMeter.Value className="ub-meter-value" /> : null}
        </div>
      ) : null}
      <BaseMeter.Track className="ub-meter-track">
        <BaseMeter.Indicator className="ub-meter-indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
