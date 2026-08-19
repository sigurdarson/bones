"use client";

import { Form as BaseForm } from "@base-ui/react/form";
import { withBase } from "../lib/with-base";

export interface FormProps<FormValues extends Record<string, any> = Record<string, any>>
  extends BaseForm.Props<FormValues> {}

/**
 * A native form with consolidated error handling, wrapping the Base UI
 * Form. Wrap Fields inside; onFormSubmit receives the values once they all
 * pass validation, and the errors prop maps server errors back onto fields
 * by name (each FieldError renders its field's message automatically).
 */
export function Form<FormValues extends Record<string, any> = Record<string, any>>({
  className,
  ...props
}: FormProps<FormValues>) {
  return <BaseForm className={withBase("ub-form", className)} {...props} />;
}
