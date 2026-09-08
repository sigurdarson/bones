"use client";

import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { cx } from "../lib/cx";
import { withBase } from "../lib/with-base";

export interface NumberFieldProps extends BaseNumberField.Root.Props {
  /** Two sizes only: default is 36px tall with 16px text, compact is 28px with 14px text. @default "default" */
  size?: "default" | "compact";
  /** Bordered by default; borderless swaps the border for a muted fill. @default "default" */
  variant?: "default" | "borderless";
  /** Marks the value as invalid: danger border, danger hint, aria-invalid on the input. @default false */
  invalid?: boolean;
  /** Helper text below the field, linked via aria-describedby. Turns danger when invalid. */
  hint?: React.ReactNode;
  /** Placeholder for the inner input. */
  placeholder?: string;
}

/**
 * A number input with stepper buttons, wrapping the Base UI Number Field.
 * min, max, step, value/defaultValue, and onValueChange pass through to
 * the root; arrow keys and holding the steppers work out of the box.
 */
export function NumberField({
  className,
  size = "default",
  variant = "default",
  invalid = false,
  hint,
  placeholder,
  ...props
}: NumberFieldProps) {
  const hintId = React.useId();
  // Labels and validation describe the editable control. Container ARIA
  // (such as aria-hidden) stays on the root so it still covers every part.
  const inputAria: React.AriaAttributes = {};
  const rootProps = { ...props };
  for (const key of [
    "aria-label", "aria-labelledby", "aria-describedby", "aria-details",
    "aria-invalid", "aria-errormessage",
  ] as const) {
    // Omitted values must not overwrite a wrapping Field's attributes.
    if (props[key] !== undefined) {
      Object.assign(inputAria, { [key]: props[key] });
    }
    delete rootProps[key];
  }
  if (hint) {
    inputAria["aria-describedby"] = cx(hintId, inputAria["aria-describedby"]);
  }

  /* Only claim the invalid attributes when this prop asserts them; passing
     the keys with undefined would override the state a wrapping Field sets. */
  const rootInvalidProps = invalid ? { "data-invalid": "" } : {};
  const inputInvalidProps = invalid ? { "data-invalid": "", "aria-invalid": true } : {};

  return (
    <BaseNumberField.Root
      data-size={size}
      data-variant={variant}
      {...rootInvalidProps}
      className={withBase("ub-number-field", className)}
      {...rootProps}
    >
      <BaseNumberField.Group className="ub-number-field-group">
        <BaseNumberField.Decrement
          className="ub-number-field-step"
          aria-label="Decrease"
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          className="ub-number-field-input"
          placeholder={placeholder}
          {...inputInvalidProps}
          {...inputAria}
        />
        <BaseNumberField.Increment
          className="ub-number-field-step"
          aria-label="Increase"
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M6 2.5v7M2.5 6h7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
      {hint ? (
        <span className={cx("ub-number-field-hint")} id={hintId}>
          {hint}
        </span>
      ) : null}
    </BaseNumberField.Root>
  );
}
