"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { withBase } from "../lib/with-base";

export interface PopoverRootProps extends BasePopover.Root.Props {}

/**
 * Holds open state; renders no element of its own. Uncontrolled by
 * default, controlled via open/onOpenChange. Non-modal: the page behind
 * stays interactive.
 */
export function PopoverRoot(props: PopoverRootProps) {
  return <BasePopover.Root {...props} />;
}

export interface PopoverTriggerProps extends BasePopover.Trigger.Props {}

/**
 * The button that opens the popover. Usually wraps an existing control via
 * render (render={<Button ... />}); carries data-popup-open while open.
 */
export function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      className={withBase("ub-popover-trigger", className)}
      {...props}
    />
  );
}

export interface PopoverContentProps extends BasePopover.Popup.Props {
  /** Which side of the trigger to open on. @default "bottom" */
  side?: BasePopover.Positioner.Props["side"];
  /** Alignment along that side. @default "center" */
  align?: BasePopover.Positioner.Props["align"];
  /** Gap between the trigger and the popover, in pixels. @default 8 */
  sideOffset?: number;
}

/**
 * The floating panel. Bundles the Base UI Portal, Positioner, and Popup so
 * usage stays small; focus moves in on open and returns to the trigger on
 * close. Escape and outside clicks dismiss it.
 */
export function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="ub-popover-positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BasePopover.Popup
          className={withBase("ub-popover-popup", className)}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export interface PopoverTitleProps extends BasePopover.Title.Props {}

/** The panel's heading; names the popover for screen readers. */
export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={withBase("ub-popover-title", className)}
      {...props}
    />
  );
}

export interface PopoverDescriptionProps extends BasePopover.Description.Props {}

/** Supporting text, linked to the popover via aria-describedby. */
export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={withBase("ub-popover-description", className)}
      {...props}
    />
  );
}

export interface PopoverCloseProps extends BasePopover.Close.Props {}

/** A button that closes the popover. Usually wraps a bones Button via render. */
export function PopoverClose({ className, ...props }: PopoverCloseProps) {
  return (
    <BasePopover.Close
      className={withBase("ub-popover-close", className)}
      {...props}
    />
  );
}
