"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { withBase } from "../lib/with-base";

export interface PreviewCardRootProps extends BasePreviewCard.Root.Props {}

/**
 * A rich preview that opens while hovering a link, wrapping the Base UI
 * Preview Card. Holds open state; renders no element of its own.
 */
export function PreviewCardRoot(props: PreviewCardRootProps) {
  return <BasePreviewCard.Root {...props} />;
}

export interface PreviewCardTriggerProps extends BasePreviewCard.Trigger.Props {}

/**
 * The link the preview describes. A real anchor: pass href as usual, and
 * the page navigates on click like any link; delay tunes the hover wait.
 */
export function PreviewCardTrigger({ className, ...props }: PreviewCardTriggerProps) {
  return (
    <BasePreviewCard.Trigger
      className={withBase("ub-preview-card-trigger", className)}
      {...props}
    />
  );
}

export interface PreviewCardContentProps extends BasePreviewCard.Popup.Props {
  /** Which side of the link to open on. @default "bottom" */
  side?: BasePreviewCard.Positioner.Props["side"];
  /** Alignment along that side. @default "center" */
  align?: BasePreviewCard.Positioner.Props["align"];
  /** Gap between the link and the card, in pixels. @default 8 */
  sideOffset?: number;
}

/**
 * The floating preview. Bundles the Base UI Portal, Positioner, and Popup
 * so usage stays small; stays open while hovered, so links inside are
 * clickable.
 */
export function PreviewCardContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: PreviewCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        className="ub-preview-card-positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BasePreviewCard.Popup
          className={withBase("ub-preview-card-popup", className)}
          {...props}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
