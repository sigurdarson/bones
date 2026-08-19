"use client";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { withBase } from "../lib/with-base";

export interface ToggleGroupProps extends BaseToggleGroup.Props {}

/**
 * Groups toggles into one value array, wrapping the Base UI Toggle Group.
 * Single-select by default; set multiple for independent toggles (like
 * text formatting).
 */
export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup className={withBase("ub-toggle-group", className)} {...props} />
  );
}
