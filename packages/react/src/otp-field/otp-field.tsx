"use client";

import * as React from "react";
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import { withBase } from "../lib/with-base";

export interface OTPFieldProps extends BaseOTPField.Root.Props {
  /** Two sizes only: default slots are 36px tall, compact are 28px. @default "default" */
  size?: "default" | "compact";
}

/**
 * A one-time code entry, wrapping the Base UI OTP Field. One component:
 * length renders that many slots, typing and pasting distribute across
 * them, and the value is a single string (value/defaultValue/
 * onValueChange). Wrap it in a Field with a FieldLabel, or pass
 * aria-label, so the code has a name.
 */
export function OTPField({
  className,
  length,
  size = "default",
  ...props
}: OTPFieldProps) {
  return (
    <BaseOTPField.Root
      length={length}
      data-size={size}
      className={withBase("ub-otp-field", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <BaseOTPField.Input key={index} className="ub-otp-field-input" />
      ))}
    </BaseOTPField.Root>
  );
}
