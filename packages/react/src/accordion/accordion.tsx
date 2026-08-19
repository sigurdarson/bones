"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { withBase } from "../lib/with-base";

export interface AccordionRootProps extends BaseAccordion.Root.Props {}

/**
 * A stack of expandable sections, wrapping the Base UI Accordion. One
 * section open at a time by default; multiple lets several stay open.
 * Value is an array of the open items' values.
 */
export function AccordionRoot({ className, ...props }: AccordionRootProps) {
  return (
    <BaseAccordion.Root className={withBase("ub-accordion", className)} {...props} />
  );
}

export interface AccordionItemProps extends BaseAccordion.Item.Props {}

/** One section: a trigger and its panel. Identify it with value. */
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={withBase("ub-accordion-item", className)}
      {...props}
    />
  );
}

export interface AccordionTriggerProps extends BaseAccordion.Trigger.Props {}

/**
 * The row that toggles a section. Bundles the Base UI Header (a heading
 * element screen readers can navigate by) around the Trigger; children
 * become the label and the chevron renders automatically.
 */
export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="ub-accordion-header">
      <BaseAccordion.Trigger
        className={withBase("ub-accordion-trigger", className)}
        {...props}
      >
        {children}
        <span className="ub-accordion-chevron" aria-hidden>
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
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export interface AccordionPanelProps extends BaseAccordion.Panel.Props {}

/** The section's content. Height animates open and closed. */
export function AccordionPanel({ className, children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={withBase("ub-accordion-panel", className)}
      {...props}
    >
      <div className="ub-accordion-panel-content">{children}</div>
    </BaseAccordion.Panel>
  );
}
