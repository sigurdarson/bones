"use client";

import * as React from "react";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { withBase } from "../lib/with-base";

type AutocompleteSize = "default" | "compact";

/* Size flows from the root through context because the popup portals to
   the body, out of CSS cascade reach of the input. */
const AutocompleteSizeContext = React.createContext<AutocompleteSize>("default");

export interface AutocompleteRootProps extends BaseAutocomplete.Root.Props<any> {
  /** Two sizes only, applied to the input and the list together: default is 36px tall, compact is 28px. @default "default" */
  size?: AutocompleteSize;
}

/**
 * Free text with suggestions, wrapping the Base UI Autocomplete. Unlike
 * the Combobox, the value IS the input text: picking a suggestion just
 * fills it in, and anything typed is valid. Pass items so typing filters
 * the suggestions; mode tunes the behavior (inline completion, static
 * lists).
 */
export function AutocompleteRoot({ size = "default", ...props }: AutocompleteRootProps) {
  return (
    <AutocompleteSizeContext.Provider value={size}>
      <BaseAutocomplete.Root {...props} />
    </AutocompleteSizeContext.Provider>
  );
}

export interface AutocompleteInputProps extends BaseAutocomplete.Input.Props {
  /** Bordered by default; borderless swaps the border for a muted fill. @default "default" */
  variant?: "default" | "borderless";
  /** Show the clear button while something is typed. @default true */
  clearable?: boolean;
}

/**
 * The text input, with a clear button built in. No chevron: an
 * autocomplete is typing-first, and suggestions open as you type. Shares
 * the Combobox input's styling.
 */
export function AutocompleteInput({
  className,
  variant = "default",
  clearable = true,
  ...props
}: AutocompleteInputProps) {
  const size = React.useContext(AutocompleteSizeContext);
  return (
    <BaseAutocomplete.InputGroup
      data-size={size}
      data-variant={variant}
      data-clearable={clearable ? "" : undefined}
      className="ub-combobox-input-group ub-autocomplete-input-group"
    >
      <BaseAutocomplete.Input
        className={withBase("ub-combobox-input ub-autocomplete-input", className)}
        {...props}
      />
      {clearable ? (
        <BaseAutocomplete.Clear className="ub-combobox-clear" aria-label="Clear">
          <svg viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </BaseAutocomplete.Clear>
      ) : null}
    </BaseAutocomplete.InputGroup>
  );
}

export interface AutocompleteContentProps
  extends Omit<BaseAutocomplete.Popup.Props, "children"> {
  /** The items, or a function called with each filtered item. */
  children?: BaseAutocomplete.List.Props["children"];
  /** Shown while the filter matches nothing; requires items on the root. */
  empty?: React.ReactNode;
  /** A status line above the list ("Searching..."), announced politely; swap its content rather than unmounting. */
  status?: React.ReactNode;
}

/**
 * The suggestion list. Bundles the Base UI Portal, Positioner, Popup,
 * and List; opens below the input and matches its width. Shares the
 * Combobox popup's styling.
 */
export function AutocompleteContent({
  className,
  children,
  empty,
  status,
  ...props
}: AutocompleteContentProps) {
  const size = React.useContext(AutocompleteSizeContext);
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className="ub-combobox-positioner"
        sideOffset={4}
      >
        <BaseAutocomplete.Popup
          data-size={size}
          className={withBase("ub-combobox-popup ub-autocomplete-popup", className)}
          {...props}
        >
          {status !== undefined ? (
            <BaseAutocomplete.Status className="ub-combobox-status">
              {status}
            </BaseAutocomplete.Status>
          ) : null}
          {empty != null ? (
            <BaseAutocomplete.Empty className="ub-combobox-empty">
              {empty}
            </BaseAutocomplete.Empty>
          ) : null}
          <BaseAutocomplete.List className="ub-combobox-list">
            {children}
          </BaseAutocomplete.List>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

export interface AutocompleteItemProps extends BaseAutocomplete.Item.Props {}

/**
 * One suggestion. Selecting it fills the input; there is no persistent
 * selection, so no check renders. Shares the Combobox item's styling.
 */
export function AutocompleteItem({ className, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      className={withBase("ub-combobox-item ub-autocomplete-item", className)}
      {...props}
    />
  );
}
