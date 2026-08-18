"use client";

import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { withBase } from "../lib/with-base";

export interface FieldRootProps extends BaseField.Root.Props {}

/**
 * Groups a form control with its label, description, and error, and feeds
 * validation state to whatever control sits inside. bones controls (Input,
 * Checkbox, Select) pick the state up automatically through their data
 * attributes.
 */
export function FieldRoot({ className, ...props }: FieldRootProps) {
  return <BaseField.Root className={withBase("ub-field", className)} {...props} />;
}

export interface FieldLabelProps extends BaseField.Label.Props {}

/** The field's label, wired to the control for click and screen readers. */
export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <BaseField.Label className={withBase("ub-field-label", className)} {...props} />;
}

export interface FieldDescriptionProps extends BaseField.Description.Props {}

/** Helper text under the control, linked via aria-describedby. */
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={withBase("ub-field-description", className)}
      {...props}
    />
  );
}

export interface FieldErrorProps extends BaseField.Error.Props {}

/**
 * The error message. Renders only while the field is invalid; use match to
 * bind it to a specific validity condition.
 */
export function FieldError({ className, ...props }: FieldErrorProps) {
  return <BaseField.Error className={withBase("ub-field-error", className)} {...props} />;
}
