"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { withBase } from "../lib/with-base";

export interface ScrollAreaProps extends BaseScrollArea.Root.Props {}

/**
 * A scroll container with the same overlay scrollbars in every browser,
 * wrapping the Base UI Scroll Area. One component: viewport, both
 * scrollbars, thumbs, and the corner render automatically, and the bars
 * appear only while hovering or scrolling. Size it like any box (height,
 * max-height); keyboard scrolling comes from the focusable viewport.
 */
export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root
      className={withBase("ub-scroll-area", className)}
      {...props}
    >
      <BaseScrollArea.Viewport className="ub-scroll-area-viewport">
        <BaseScrollArea.Content className="ub-scroll-area-content">
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        className="ub-scroll-area-scrollbar"
      >
        <BaseScrollArea.Thumb className="ub-scroll-area-thumb" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar
        orientation="horizontal"
        className="ub-scroll-area-scrollbar"
      >
        <BaseScrollArea.Thumb className="ub-scroll-area-thumb" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner className="ub-scroll-area-corner" />
    </BaseScrollArea.Root>
  );
}
