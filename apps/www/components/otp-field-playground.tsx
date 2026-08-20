"use client";

import * as React from "react";
import {
  OTPField,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const lengths: Record<string, string> = { "4": "4", "6": "6" };

interface PlaygroundState {
  length: number;
  compact: boolean;
  mask: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ length, compact, mask, disabled }: PlaygroundState): string {
  const attrs = [
    `\n  length={${length}}`,
    `\n  aria-label="Verification code"`,
    compact ? `\n  size="compact"` : "",
    mask ? "\n  mask" : "",
    disabled ? "\n  disabled" : "",
    `\n  onValueChange={(code) => setCode(code)}`,
  ].join("");
  return `import { OTPField } from "@usebones/react";

<OTPField${attrs}
/>`;
}

export function OTPFieldPlayground() {
  const [length, setLength] = React.useState(6);
  const [compact, setCompact] = React.useState(false);
  const [mask, setMask] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ length, compact, mask, disabled })}
        note={
          <>
            Type or paste: characters distribute across the slots and the
            value is one string. Wrap it in a Field with a FieldLabel in
            real forms; the label wires up automatically.
          </>
        }
      >
        <OTPField
          key={length}
          length={length}
          aria-label="Verification code"
          size={compact ? "compact" : "default"}
          mask={mask}
          disabled={disabled}
        />
      </Showcase>
      <Controls>
        <ControlRow label="Length">
          <SelectRoot
            size="compact"
            items={lengths}
            value={String(length)}
            onValueChange={(value) => value && setLength(Number(value))}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {Object.keys(lengths).map((value) => (
                <SelectItem key={value} value={value}>
                  {lengths[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Mask">
          <Switch checked={mask} onCheckedChange={setMask} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
