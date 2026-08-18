"use client";

import * as React from "react";
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  Input,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  description: boolean;
  invalid: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ description, invalid, disabled }: PlaygroundState): string {
  const rootAttrs = [
    invalid ? " invalid" : "",
    disabled ? " disabled" : "",
  ].join("");
  const lines = [
    `<FieldRoot name="email"${rootAttrs}>`,
    `  <FieldLabel>Email</FieldLabel>`,
    `  <Input type="email" placeholder="you@example.com" />`,
    ...(description ? [`  <FieldDescription>We only use this for receipts.</FieldDescription>`] : []),
    `  <FieldError>That doesn't look like an email address.</FieldError>`,
    `</FieldRoot>`,
  ];
  return `import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  Input,
} from "@usebones/react";

${lines.join("\n")}`;
}

export function FieldPlayground() {
  const [description, setDescription] = React.useState(true);
  const [invalid, setInvalid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ description, invalid, disabled })}
        note={
          <>
            The control inside needs no wiring: <code>FieldRoot</code> links
            the label, sets <code>aria-describedby</code>, and drives the
            control's <code>data-invalid</code> and <code>data-disabled</code>.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <FieldRoot name="email" invalid={invalid} disabled={disabled}>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
            {description ? (
              <FieldDescription>We only use this for receipts.</FieldDescription>
            ) : null}
            <FieldError match={invalid}>
              That doesn't look like an email address.
            </FieldError>
          </FieldRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Description">
          <Switch checked={description} onCheckedChange={setDescription} />
        </ControlRow>
        <ControlRow label="Invalid">
          <Switch checked={invalid} onCheckedChange={setInvalid} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
