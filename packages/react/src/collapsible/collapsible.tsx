"use client";

import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { withBase } from "../lib/with-base";

export interface CollapsibleRootProps extends BaseCollapsible.Root.Props {}

/**
 * A section that expands and collapses. Uncontrolled via defaultOpen,
 * controlled via open/onOpenChange; the height animates automatically.
 */
export function CollapsibleRoot({ className, ...props }: CollapsibleRootProps) {
  return (
    <BaseCollapsible.Root
      className={withBase("ub-collapsible", className)}
      {...props}
    />
  );
}

export interface CollapsibleTriggerProps extends BaseCollapsible.Trigger.Props {}

/**
 * The button that toggles the panel. Children become the label; the
 * chevron renders automatically and rotates while open.
 */
export function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      className={withBase("ub-collapsible-trigger", className)}
      {...props}
    >
      {children}
      <span className="ub-collapsible-chevron" aria-hidden>
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
    </BaseCollapsible.Trigger>
  );
}

export interface CollapsiblePanelProps extends BaseCollapsible.Panel.Props {}

/**
 * The content that shows while open. Height animates open and closed;
 * hiddenUntilFound keeps the content findable with in-page search.
 */
export function CollapsiblePanel({ className, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      className={withBase("ub-collapsible-panel", className)}
      {...props}
    />
  );
}
