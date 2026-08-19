"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { withBase } from "../lib/with-base";

export interface TooltipProviderProps extends BaseTooltip.Provider.Props {}

/**
 * Optional: shares one hover delay across many tooltips (a toolbar), so
 * moving between triggers feels instant after the first opens.
 */
export function TooltipProvider(props: TooltipProviderProps) {
  return <BaseTooltip.Provider {...props} />;
}

export interface TooltipRootProps extends BaseTooltip.Root.Props {}

/**
 * Holds open state; renders no element of its own. Uncontrolled by
 * default, controlled via open/onOpenChange.
 */
export function TooltipRoot(props: TooltipRootProps) {
  return <BaseTooltip.Root {...props} />;
}

export interface TooltipTriggerProps extends BaseTooltip.Trigger.Props {}

/**
 * The element the tooltip describes. Usually wraps an existing control via
 * render (render={<Button iconOnly ... />}); hover delay lives here
 * (delay, closeDelay).
 */
export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <BaseTooltip.Trigger
      className={withBase("ub-tooltip-trigger", className)}
      {...props}
    />
  );
}

export interface TooltipContentProps extends BaseTooltip.Popup.Props {
  /** Which side of the trigger to open on. @default "top" */
  side?: BaseTooltip.Positioner.Props["side"];
  /** Alignment along that side. @default "center" */
  align?: BaseTooltip.Positioner.Props["align"];
  /** Gap between the trigger and the tooltip, in pixels. @default 8 */
  sideOffset?: number;
}

/**
 * The floating label. Bundles the Base UI Portal, Positioner, and Popup so
 * usage stays small; flips to the opposite side when out of room.
 */
export function TooltipContent({
  className,
  side = "top",
  align,
  sideOffset = 8,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        className="ub-tooltip-positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseTooltip.Popup
          className={withBase("ub-tooltip-popup", className)}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
