"use client";

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { withBase } from "../lib/with-base";

type ComboboxSize = "default" | "compact";

/* Size flows from the root through context because the popup portals to
   the body, out of CSS cascade reach of the input. */
const ComboboxSizeContext = React.createContext<ComboboxSize>("default");

/* With chips, the popup should anchor to the whole chips box, not the
   small inline input; the chips register themselves here. */
const ComboboxAnchorContext = React.createContext<{
  chipsElement: HTMLElement | null;
  setChipsElement: (element: HTMLElement | null) => void;
}>({ chipsElement: null, setChipsElement: () => {} });

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
  const [chipsElement, setChipsElement] = React.useState<HTMLElement | null>(
    null,
  );
  const anchor = React.useMemo(
    () => ({ chipsElement, setChipsElement }),
    [chipsElement],
  );
  return (
    <ComboboxSizeContext.Provider value={size}>
      <ComboboxAnchorContext.Provider value={anchor}>
        <BaseCombobox.Root {...props} />
      </ComboboxAnchorContext.Provider>
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
      data-variant={variant}
      data-clearable={clearable ? "" : undefined}
      className="ub-combobox-input-group"
    >
      <BaseCombobox.Input
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

export interface ComboboxTriggerProps extends BaseCombobox.Trigger.Props {
  /** Shown while nothing is selected. */
  placeholder?: React.ReactNode;
}

/**
 * A select-like button alternative to ComboboxInput: it shows the
 * current value and opens the popup, with typing happening inside the
 * popup instead (pair with searchInput on ComboboxContent). Renders the
 * Select trigger's classes, so the two restyle together.
 */
export function ComboboxTrigger({
  className,
  placeholder,
  children,
  ...props
}: ComboboxTriggerProps) {
  const size = React.useContext(ComboboxSizeContext);
  return (
    <BaseCombobox.Trigger
      data-size={size}
      className={withBase("ub-select-trigger ub-combobox-select-trigger", className)}
      {...props}
    >
      {children ?? (
        <span className="ub-select-value">
          <BaseCombobox.Value placeholder={placeholder} />
        </span>
      )}
      <span className="ub-select-icon" aria-hidden>
        <svg viewBox="0 0 12 12" fill="none">
          <path
            d="M3 4.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </BaseCombobox.Trigger>
  );
}

export interface ComboboxContentProps
  extends Omit<BaseCombobox.Popup.Props, "children"> {
  /** The items, or a function called with each filtered item. */
  children?: BaseCombobox.List.Props["children"];
  /** Shown while the filter matches nothing; requires items on the root. */
  empty?: React.ReactNode;
  /**
   * Puts the text input inside the popup (for ComboboxTrigger usage);
   * pass true or a placeholder string.
   */
  searchInput?: boolean | string;
  /** A status line above the list ("Searching..."), announced politely; swap its content rather than unmounting. */
  status?: React.ReactNode;
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
  searchInput,
  status,
  ...props
}: ComboboxContentProps) {
  const size = React.useContext(ComboboxSizeContext);
  const { chipsElement } = React.useContext(ComboboxAnchorContext);
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        className="ub-combobox-positioner"
        sideOffset={4}
        anchor={chipsElement ?? undefined}
      >
        <BaseCombobox.Popup
          data-size={size}
          className={withBase("ub-combobox-popup", className)}
          {...props}
        >
          {searchInput ? (
            <BaseCombobox.Input
              className="ub-combobox-popup-input"
              placeholder={
                typeof searchInput === "string" ? searchInput : undefined
              }
            />
          ) : null}
          {status !== undefined ? (
            <BaseCombobox.Status className="ub-combobox-status">
              {status}
            </BaseCombobox.Status>
          ) : null}
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

export interface ComboboxChipsProps extends BaseCombobox.Chips.Props {}

/**
 * The multi-select control: selected values as removable chips with the
 * input inline after them. Use with multiple on the root; render chips
 * via ComboboxValue's function children.
 */
export function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  const size = React.useContext(ComboboxSizeContext);
  const { setChipsElement } = React.useContext(ComboboxAnchorContext);
  return (
    <BaseCombobox.Chips
      ref={setChipsElement}
      data-size={size}
      className={withBase("ub-combobox-chips", className)}
      {...props}
    />
  );
}

export interface ComboboxChipProps extends BaseCombobox.Chip.Props {}

/** One selected value; the remove button renders automatically. */
export function ComboboxChip({ className, children, ...props }: ComboboxChipProps) {
  return (
    <BaseCombobox.Chip className={withBase("ub-combobox-chip", className)} {...props}>
      {children}
      <BaseCombobox.ChipRemove
        className="ub-combobox-chip-remove"
        aria-label="Remove"
      >
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 3l6 6M9 3l-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  );
}

export interface ComboboxValueProps extends BaseCombobox.Value.Props {}

/**
 * The current selection, for custom rendering: function children receive
 * the value (an array with multiple), for mapping to chips.
 */
export function ComboboxValue(props: ComboboxValueProps) {
  return <BaseCombobox.Value {...props} />;
}

export interface ComboboxCollectionProps extends BaseCombobox.Collection.Props {}

/** Renders a group's items; use inside a ComboboxGroup with items. */
export function ComboboxCollection(props: ComboboxCollectionProps) {
  return <BaseCombobox.Collection {...props} />;
}

export interface ComboboxStatusProps extends BaseCombobox.Status.Props {}

/**
 * A status line in the popup ("Searching..."), announced politely to
 * screen readers. Keep it mounted and swap its children.
 */
export function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  return (
    <BaseCombobox.Status
      className={withBase("ub-combobox-status", className)}
      {...props}
    />
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
