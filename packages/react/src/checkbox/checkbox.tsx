"use client";

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { withBase } from "../lib/with-base";

export interface CheckboxProps extends BaseCheckbox.Root.Props {}

/**
 * A checkbox wrapping the Base UI Checkbox. State is exposed through data
 * attributes (data-checked, data-unchecked, data-indeterminate,
 * data-disabled); the indicator renders a check, or a dash when
 * indeterminate.
 */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root className={withBase("ub-checkbox", className)} {...props}>
      <BaseCheckbox.Indicator className="ub-checkbox-indicator">
        <svg className="ub-checkbox-check" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6.5 5 9l4.5-6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="ub-checkbox-dash" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
