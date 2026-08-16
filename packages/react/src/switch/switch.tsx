"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../lib/cx";

export interface SwitchProps extends BaseSwitch.Root.Props {}

/**
 * A toggle switch, wrapping the Base UI Switch. State is exposed through
 * Base UI's data attributes (data-checked / data-unchecked), which the
 * stylesheet targets; the wrapper only adds classes.
 */
export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={(state) =>
        cx("ub-switch", typeof className === "function" ? className(state) : className)
      }
      {...props}
    >
      <BaseSwitch.Thumb className="ub-switch-thumb" />
    </BaseSwitch.Root>
  );
}
