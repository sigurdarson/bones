"use client";

import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../lib/cx";
import { withBase } from "../lib/with-base";

export interface InputProps extends Omit<BaseInput.Props, "size"> {
  /** Two sizes only: default is 36px tall with 16px text, compact is 28px with 14px text. @default "default" */
  size?: "default" | "compact";
  /** Bordered by default; borderless swaps the border for a muted fill. @default "default" */
  variant?: "default" | "borderless";
  /** Marks the value as invalid: danger border, danger hint, aria-invalid. @default false */
  invalid?: boolean;
  /** Icon shown inside the input, before the text. Decorative; hidden from screen readers. */
  leadingIcon?: React.ReactNode;
  /** Icon shown inside the input, after the text. Decorative; hidden from screen readers. */
  trailingIcon?: React.ReactNode;
  /** Helper text below the input, linked via aria-describedby. Turns danger when invalid. */
  hint?: React.ReactNode;
}

/**
 * A text input wrapping the Base UI Input. Field state comes through data
 * attributes the stylesheet targets (data-focused, data-filled,
 * data-invalid, ...). The native size attribute is replaced by the bones
 * size prop; control width with CSS. With icons or a hint, the input
 * renders inside a ub-input-root wrapper.
 */
export function Input({
  className,
  size = "default",
  variant = "default",
  invalid = false,
  leadingIcon,
  trailingIcon,
  hint,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const hintId = React.useId();

  const input = (
    <BaseInput
      data-size={size}
      data-variant={variant}
      data-invalid={invalid ? "" : undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={hint ? cx(hintId, ariaDescribedBy) : ariaDescribedBy}
      className={withBase("ub-input", className)}
      {...props}
    />
  );

  if (!leadingIcon && !trailingIcon && !hint) return input;

  return (
    <span
      className="ub-input-root"
      data-size={size}
      data-invalid={invalid ? "" : undefined}
      data-leading={leadingIcon ? "" : undefined}
      data-trailing={trailingIcon ? "" : undefined}
    >
      <span className="ub-input-field">
        {leadingIcon ? (
          <span className="ub-input-icon" data-side="leading" aria-hidden>
            {leadingIcon}
          </span>
        ) : null}
        {input}
        {trailingIcon ? (
          <span className="ub-input-icon" data-side="trailing" aria-hidden>
            {trailingIcon}
          </span>
        ) : null}
      </span>
      {hint ? (
        <span className="ub-input-hint" id={hintId}>
          {hint}
        </span>
      ) : null}
    </span>
  );
}
