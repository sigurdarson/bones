"use client";

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { withBase } from "../lib/with-base";

type ComboboxSize = "default" | "compact";

/* Size flows from the root through context because the popup portals to
   the body, out of CSS cascade reach of the input. */
const ComboboxSizeContext = React.createContext<ComboboxSize>("default");

export interface ComboboxRootProps<
  Value = string,
  Multiple extends boolean | undefined = false,
> extends BaseCombobox.Root.Props<Value, Multiple> {
  /** Two sizes only, applied to the input and the list together: default is 36px tall, compact is 28px. @default "default" */
  size?: ComboboxSize;
}

/**
 * Pick from a list by typing, wrapping the Base UI Combobox. Holds the
 * state; renders no element of its own. Pass items so typing filters the
 * list (and ComboboxContent's empty state can show); value/defaultValue/
 * onValueChange work like every other bones control, and multiple turns
 * the value into an array.
 */
export function ComboboxRoot<
  Value = string,
  Multiple extends boolean | undefined = false,
>({ size = "default", ...props }: ComboboxRootProps<Value, Multiple>) {
  return (
    <ComboboxSizeContext.Provider value={size}>
      <BaseCombobox.Root {...props} />
    </ComboboxSizeContext.Provider>
  );
}

export interface ComboboxInputProps extends BaseCombobox.Input.Props {
  /** Bordered by default; borderless swaps the border for a muted fill, like the Select trigger. @default "default" */
  variant?: "default" | "borderless";
  /** Show the clear button while something is selected or typed. @default true */
  clearable?: boolean;
}

/**
 * The text input, with the list-toggle chevron and a clear button built
 * in. Typing opens and filters the list; the chevron browses it without
 * typing.
 */
export function ComboboxInput({
  className,
  variant = "default",
  clearable = true,
  ...props
}: ComboboxInputProps) {
  const size = React.useContext(ComboboxSizeContext);
  return (
    <BaseCombobox.InputGroup
      data-size={size}
      className="ub-combobox-input-group"
    >
      <BaseCombobox.Input
        data-variant={variant}
        className={withBase("ub-combobox-input", className)}
        {...props}
      />
      {clearable ? (
        <BaseCombobox.Clear className="ub-combobox-clear" aria-label="Clear">
          <svg viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </BaseCombobox.Clear>
      ) : null}
      <BaseCombobox.Trigger className="ub-combobox-trigger" aria-label="Open list">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 4.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseCombobox.Trigger>
    </BaseCombobox.InputGroup>
  );
}

export interface ComboboxContentProps
  extends Omit<BaseCombobox.Popup.Props, "children"> {
  /** The items, or a function called with each filtered item. */
  children?: BaseCombobox.List.Props["children"];
  /** Shown while the filter matches nothing; requires items on the root. */
  empty?: React.ReactNode;
}

/**
 * The dropdown list. Bundles the Base UI Portal, Positioner, Popup, and
 * List so usage stays small; opens below the input and matches its
 * width. Function children receive each filtered item.
 */
export function ComboboxContent({
  className,
  children,
  empty,
  ...props
}: ComboboxContentProps) {
  const size = React.useContext(ComboboxSizeContext);
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner className="ub-combobox-positioner" sideOffset={4}>
        <BaseCombobox.Popup
          data-size={size}
          className={withBase("ub-combobox-popup", className)}
          {...props}
        >
          {empty != null ? (
            <BaseCombobox.Empty className="ub-combobox-empty">
              {empty}
            </BaseCombobox.Empty>
          ) : null}
          <BaseCombobox.List className="ub-combobox-list">
            {children}
          </BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export interface ComboboxItemProps extends BaseCombobox.Item.Props {}

/**
 * One option. Children become the item text; the selected check renders
 * automatically. The highlighted state comes through data-highlighted.
 */
export function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item className={withBase("ub-combobox-item", className)} {...props}>
      <span className="ub-combobox-item-text">{children}</span>
      <BaseCombobox.ItemIndicator className="ub-combobox-item-indicator">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6.5 5 9l4.5-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

export interface ComboboxGroupProps extends BaseCombobox.Group.Props {}

/** Groups related items under an optional ComboboxGroupLabel. */
export function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <BaseCombobox.Group
      className={withBase("ub-combobox-group", className)}
      {...props}
    />
  );
}

export interface ComboboxGroupLabelProps extends BaseCombobox.GroupLabel.Props {}

/** A non-interactive heading for a ComboboxGroup. */
export function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      className={withBase("ub-combobox-group-label", className)}
      {...props}
    />
  );
}
