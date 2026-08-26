"use client";

import * as React from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { withBase } from "../lib/with-base";

export type DrawerSide = "bottom" | "left" | "right";

/* Side flows through context because the popup portals to the body, out
   of CSS cascade reach of the root. */
const DrawerSideContext = React.createContext<DrawerSide>("right");

export interface DrawerRootProps extends BaseDrawer.Root.Props {
  /** Which edge the sheet slides in from; the dismiss swipe matches. @default "right" */
  side?: DrawerSide;
}

/**
 * A sheet that slides in from an edge, wrapping the Base UI Drawer.
 * Holds open state; renders no element of its own. Modal like a dialog,
 * and dismissable by swiping toward its edge on touch screens. Right and
 * left are side panels; bottom is the mobile sheet.
 */
export function DrawerRoot({ side = "right", swipeDirection, ...props }: DrawerRootProps) {
  return (
    <DrawerSideContext.Provider value={side}>
      <BaseDrawer.Root
        swipeDirection={swipeDirection ?? (side === "bottom" ? "down" : side)}
        {...props}
      />
    </DrawerSideContext.Provider>
  );
}

export interface DrawerTriggerProps extends BaseDrawer.Trigger.Props {}

/**
 * The button that opens the drawer. Usually wraps an existing control via
 * render (render={<Button ... />}); carries data-popup-open while open.
 */
export function DrawerTrigger({ className, ...props }: DrawerTriggerProps) {
  return (
    <BaseDrawer.Trigger
      className={withBase("ub-drawer-trigger", className)}
      {...props}
    />
  );
}

export interface DrawerContentProps extends BaseDrawer.Popup.Props {}

/**
 * The sheet itself. Bundles the Base UI Portal, Backdrop, Viewport,
 * Popup, and scrollable Content, with a grab handle on top; children
 * scroll when taller than the sheet.
 */
export function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  const side = React.useContext(DrawerSideContext);
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="ub-drawer-backdrop" />
      <BaseDrawer.Viewport className="ub-drawer-viewport">
        <BaseDrawer.Popup
          data-side={side}
          className={withBase("ub-drawer-popup", className)}
          {...props}
        >
          <BaseDrawer.Content className="ub-drawer-content">
            {children}
          </BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export interface DrawerTitleProps extends BaseDrawer.Title.Props {}

/** The drawer's heading; names the sheet for screen readers. */
export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <BaseDrawer.Title className={withBase("ub-drawer-title", className)} {...props} />
  );
}

export interface DrawerDescriptionProps extends BaseDrawer.Description.Props {}

/** Supporting text, linked to the sheet via aria-describedby. */
export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description
      className={withBase("ub-drawer-description", className)}
      {...props}
    />
  );
}

export interface DrawerCloseProps extends BaseDrawer.Close.Props {}

/** A button that closes the drawer. Usually wraps a Bones Button via render. */
export function DrawerClose({ className, ...props }: DrawerCloseProps) {
  return (
    <BaseDrawer.Close className={withBase("ub-drawer-close", className)} {...props} />
  );
}
