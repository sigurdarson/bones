"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "../lib/cx";
import { withBase } from "../lib/with-base";

type SelectSize = "default" | "compact";

/* Size flows from the root through context because the popup portals to
   the body, out of CSS cascade reach of the trigger. */
const SelectSizeContext = React.createContext<SelectSize>("default");

export interface SelectRootProps<Value = string> extends BaseSelect.Root.Props<Value> {
  /** Two sizes only, applied to the trigger and the dropdown items together: default is 36px tall, compact is 28px. @default "default" */
  size?: SelectSize;
}

/**
 * Holds selection state; renders no element of its own. Uncontrolled via
 * defaultValue, controlled via value/onValueChange. Size set here flows to
 * the trigger and the dropdown.
 */
export function SelectRoot<Value = string>({ size = "default", ...props }: SelectRootProps<Value>) {
  return (
    <SelectSizeContext.Provider value={size}>
      <BaseSelect.Root {...props} />
    </SelectSizeContext.Provider>
  );
}

export interface SelectTriggerProps extends BaseSelect.Trigger.Props {
  /** Shown while nothing is selected. */
  placeholder?: React.ReactNode;
  /** Bordered by default; borderless swaps the border for a muted fill. @default "default" */
  variant?: "default" | "borderless";
  /** Marks the selection as invalid: danger border, danger hint, aria-invalid. @default false */
  invalid?: boolean;
  /** Icon shown before the value. Decorative; hidden from screen readers. */
  leadingIcon?: React.ReactNode;
  /** Helper text below the trigger, linked via aria-describedby. Turns danger when invalid. */
  hint?: React.ReactNode;
}

/**
 * The button that opens the select. Renders the selected value (or the
 * placeholder) and a chevron automatically; pass children to replace the
 * value rendering. With a hint, the trigger renders inside a
 * ub-select-field wrapper.
 */
export function SelectTrigger({
  className,
  placeholder,
  variant = "default",
  invalid = false,
  leadingIcon,
  hint,
  children,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectTriggerProps) {
  const hintId = React.useId();
  const size = React.useContext(SelectSizeContext);

  /* Only claim the invalid attributes when this prop asserts them; passing
     the keys with undefined would override the state a wrapping Field sets. */
  const invalidProps = invalid ? { "data-invalid": "", "aria-invalid": true } : {};

  const trigger = (
    <BaseSelect.Trigger
      data-size={size}
      data-variant={variant}
      {...invalidProps}
      aria-describedby={hint ? cx(hintId, ariaDescribedBy) : ariaDescribedBy}
      className={withBase("ub-select-trigger", className)}
      {...props}
    >
      {leadingIcon ? (
        <span className="ub-select-leading-icon" aria-hidden>
          {leadingIcon}
        </span>
      ) : null}
      {children ?? <BaseSelect.Value className="ub-select-value" placeholder={placeholder} />}
      <BaseSelect.Icon className="ub-select-icon">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 4.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );

  if (!hint) return trigger;

  return (
    <span className="ub-select-field" data-invalid={invalid ? "" : undefined}>
      {trigger}
      <span className="ub-select-hint" id={hintId}>
        {hint}
      </span>
    </span>
  );
}

export interface SelectContentProps extends BaseSelect.Popup.Props {}

/**
 * The dropdown. Bundles the Base UI Portal, Positioner, and Popup so usage
 * stays small; opens below the trigger and matches its width.
 */
export function SelectContent({ className, children, ...props }: SelectContentProps) {
  const size = React.useContext(SelectSizeContext);
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className="ub-select-positioner"
        sideOffset={4}
        alignItemWithTrigger={false}
      >
        <BaseSelect.Popup
          data-size={size}
          className={withBase("ub-select-popup", className)}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export interface SelectItemProps extends BaseSelect.Item.Props {}

/**
 * One option. Children become the item text; the selected check renders
 * automatically. The highlighted state comes through data-highlighted.
 */
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item className={withBase("ub-select-item", className)} {...props}>
      <BaseSelect.ItemText className="ub-select-item-text">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="ub-select-item-indicator">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6.5 5 9l4.5-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
