"use client";

import * as React from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { withBase } from "../lib/with-base";

export interface RadioGroupProps extends BaseRadioGroup.Props {}

/**
 * Groups radios into a single choice, wrapping the Base UI Radio Group.
 * Uncontrolled via defaultValue, controlled via value/onValueChange;
 * arrow keys move the selection.
 */
export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={withBase("ub-radio-group", className)} {...props} />;
}

export interface RadioProps extends BaseRadio.Root.Props {}

/**
 * One option in a RadioGroup, wrapping the Base UI Radio. State is exposed
 * through data attributes (data-checked, data-disabled); the dot indicator
 * renders automatically. Always round, even in pill mode, because it was
 * round already.
 */
export function Radio({ className, ...props }: RadioProps) {
  return (
    <BaseRadio.Root className={withBase("ub-radio", className)} {...props}>
      <BaseRadio.Indicator className="ub-radio-indicator" />
    </BaseRadio.Root>
  );
}
