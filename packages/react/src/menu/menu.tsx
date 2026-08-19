"use client";

import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { withBase } from "../lib/with-base";

type MenuSize = "default" | "compact";

/* Size flows from the root through context because the popup portals to
   the body, out of CSS cascade reach of the trigger. */
const MenuSizeContext = React.createContext<MenuSize>("default");

export interface MenuRootProps extends BaseMenu.Root.Props {
  /** Two sizes only, applied to every item in the menu: default rows are 36px tall, compact are 28px. @default "default" */
  size?: MenuSize;
}

/**
 * Holds open state; renders no element of its own. Uncontrolled by
 * default, controlled via open/onOpenChange. Size set here flows to the
 * whole menu, submenus included.
 */
export function MenuRoot({ size = "default", ...props }: MenuRootProps) {
  return (
    <MenuSizeContext.Provider value={size}>
      <BaseMenu.Root {...props} />
    </MenuSizeContext.Provider>
  );
}

export interface MenuTriggerProps extends BaseMenu.Trigger.Props {}

/**
 * The button that opens the menu. Usually wraps an existing control via
 * render (render={<Button ... />}); carries data-popup-open while open.
 */
export function MenuTrigger({ className, ...props }: MenuTriggerProps) {
  return (
    <BaseMenu.Trigger
      className={withBase("ub-menu-trigger", className)}
      {...props}
    />
  );
}

export interface MenuContentProps extends BaseMenu.Popup.Props {
  /** Which side of the trigger to open on. Defaults to below the trigger; submenus open to the side. */
  side?: BaseMenu.Positioner.Props["side"];
  /** Alignment along that side. Menus align to the trigger's start edge by default. */
  align?: BaseMenu.Positioner.Props["align"];
  /** Gap between the trigger and the menu, in pixels. @default 4 */
  sideOffset?: number;
}

/**
 * The dropdown. Bundles the Base UI Portal, Positioner, and Popup so usage
 * stays small; also serves as a submenu's popup inside MenuSubmenuRoot.
 */
export function MenuContent({
  className,
  side,
  align,
  sideOffset = 4,
  children,
  ...props
}: MenuContentProps) {
  const size = React.useContext(MenuSizeContext);
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="ub-menu-positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          data-size={size}
          className={withBase("ub-menu-popup", className)}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps extends BaseMenu.Item.Props {}

/**
 * One action. Clicking it runs onClick and closes the menu (set
 * closeOnClick={false} to keep it open). The highlighted state comes
 * through data-highlighted.
 */
export function MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item className={withBase("ub-menu-item", className)} {...props} />
  );
}

export interface MenuCheckboxItemProps extends BaseMenu.CheckboxItem.Props {}

/**
 * An item that toggles a setting and stays open by default. The check
 * renders automatically; state comes through data-checked.
 */
export function MenuCheckboxItem({
  className,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={withBase("ub-menu-item ub-menu-checkbox-item", className)}
      {...props}
    >
      {children}
      <BaseMenu.CheckboxItemIndicator className="ub-menu-item-indicator">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6.5 5 9l4.5-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseMenu.CheckboxItemIndicator>
    </BaseMenu.CheckboxItem>
  );
}

export interface MenuRadioGroupProps extends BaseMenu.RadioGroup.Props {}

/** Groups MenuRadioItems into one value (value/defaultValue/onValueChange). */
export function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  return (
    <BaseMenu.RadioGroup
      className={withBase("ub-menu-radio-group", className)}
      {...props}
    />
  );
}

export interface MenuRadioItemProps extends BaseMenu.RadioItem.Props {}

/**
 * One choice in a MenuRadioGroup; stays open by default so the selection
 * is visible. The dot renders automatically; state comes through
 * data-checked.
 */
export function MenuRadioItem({ className, children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      className={withBase("ub-menu-item ub-menu-radio-item", className)}
      {...props}
    >
      {children}
      <BaseMenu.RadioItemIndicator className="ub-menu-item-indicator">
        <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <circle cx="6" cy="6" r="2.5" />
        </svg>
      </BaseMenu.RadioItemIndicator>
    </BaseMenu.RadioItem>
  );
}

export interface MenuGroupProps extends BaseMenu.Group.Props {}

/** Groups related items under an optional MenuGroupLabel. */
export function MenuGroup({ className, ...props }: MenuGroupProps) {
  return (
    <BaseMenu.Group className={withBase("ub-menu-group", className)} {...props} />
  );
}

export interface MenuGroupLabelProps extends BaseMenu.GroupLabel.Props {}

/** A non-interactive heading for a MenuGroup, announced by screen readers. */
export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={withBase("ub-menu-group-label", className)}
      {...props}
    />
  );
}

export interface MenuSeparatorProps extends BaseMenu.Separator.Props {}

/** A line between groups of items. */
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      className={withBase("ub-menu-separator", className)}
      {...props}
    />
  );
}

export interface MenuSubmenuRootProps extends BaseMenu.SubmenuRoot.Props {}

/**
 * Nests a menu inside another. Wrap a MenuSubmenuTrigger and a
 * MenuContent; opens on hover or arrow key.
 */
export function MenuSubmenuRoot(props: MenuSubmenuRootProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

export interface MenuSubmenuTriggerProps extends BaseMenu.SubmenuTrigger.Props {}

/** The item that opens a submenu; the chevron renders automatically. */
export function MenuSubmenuTrigger({
  className,
  children,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={withBase("ub-menu-item ub-menu-submenu-trigger", className)}
      {...props}
    >
      {children}
      <span className="ub-menu-submenu-chevron" aria-hidden>
        <svg viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </BaseMenu.SubmenuTrigger>
  );
}
