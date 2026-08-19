"use client";

import * as React from "react";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { withBase } from "../lib/with-base";

export interface CheckboxGroupProps extends BaseCheckboxGroup.Props {}

/**
 * Groups checkboxes into one value array, wrapping the Base UI Checkbox
 * Group. Checkboxes inside join by their value prop; pass allValues plus a
 * parent checkbox for a select-all with an indeterminate middle state.
 */
export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup className={withBase("ub-checkbox-group", className)} {...props} />
  );
}
