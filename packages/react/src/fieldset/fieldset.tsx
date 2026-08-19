"use client";

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { withBase } from "../lib/with-base";

export interface FieldsetRootProps extends BaseFieldset.Root.Props {}

/**
 * Groups related fields under one legend, rendering a native fieldset.
 * disabled disables every control inside, the native way. Put Field
 * components inside; the legend names the group for screen readers.
 */
export function FieldsetRoot({ className, ...props }: FieldsetRootProps) {
  return (
    <BaseFieldset.Root className={withBase("ub-fieldset", className)} {...props} />
  );
}

export interface FieldsetLegendProps extends BaseFieldset.Legend.Props {}

/** The group's title, automatically associated with the fieldset. */
export function FieldsetLegend({ className, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      className={withBase("ub-fieldset-legend", className)}
      {...props}
    />
  );
}
