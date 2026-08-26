"use client";

import * as React from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { withBase } from "../lib/with-base";
import { MenuSizeContext, type MenuSize } from "../menu/menu";

export interface ContextMenuRootProps extends BaseContextMenu.Root.Props {
  /** Two sizes only, applied to every item in the menu: default rows are 36px tall, compact are 28px. @default "default" */
  size?: MenuSize;
}

/**
 * Holds open state; renders no element of its own. Opens at the pointer
 * on right click (or long press on touch). Everything inside the content
 * is the regular Bones Menu parts: MenuItem, MenuCheckboxItem,
 * MenuRadioGroup, MenuGroup, MenuSeparator, submenus.
 */
export function ContextMenuRoot({ size = "default", ...props }: ContextMenuRootProps) {
  return (
    <MenuSizeContext.Provider value={size}>
      <BaseContextMenu.Root {...props} />
    </MenuSizeContext.Provider>
  );
}

export interface ContextMenuTriggerProps extends BaseContextMenu.Trigger.Props {}

/**
 * The surface that opens the menu on right click or long press. Renders a
 * div around whatever it wraps (a card, a row, a canvas).
 */
export function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <BaseContextMenu.Trigger
      className={withBase("ub-context-menu-trigger", className)}
      {...props}
    />
  );
}

export interface ContextMenuContentProps extends BaseContextMenu.Popup.Props {}

/**
 * The menu that opens at the pointer. Bundles the Base UI Portal,
 * Positioner, and Popup; renders the same popup as Menu (ub-menu-popup),
 * so the two restyle together.
 */
export function ContextMenuContent({
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  const size = React.useContext(MenuSizeContext);
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="ub-menu-positioner">
        <BaseContextMenu.Popup
          data-size={size}
          className={withBase("ub-menu-popup", className)}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}
