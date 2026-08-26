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
  autoSubmit: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({
  length,
  compact,
  mask,
  disabled,
  autoSubmit,
}: PlaygroundState): string {
  const attrs = [
    `\n    length={${length}}`,
    `\n    aria-label="Verification code"`,
    compact ? `\n    size="compact"` : "",
    mask ? "\n    mask" : "",
    disabled ? "\n    disabled" : "",
    autoSubmit ? "\n    autoSubmit" : "",
    `\n    value={code}`,
    `\n    onValueChange={setCode}`,
  ].join("");
  if (autoSubmit) {
    return `import { OTPField } from "@usebones/react";

/* autoSubmit submits the surrounding form once the last slot fills. */
<form onSubmit={signIn}>
  <OTPField${attrs}
  />
</form>`;
  }
  return `import { OTPField } from "@usebones/react";

<OTPField${attrs.replace(/\n    /g, "\n  ")}
/>`;
}

export function OTPFieldPlayground() {
  const [length, setLength] = React.useState(6);
  const [compact, setCompact] = React.useState(false);
  const [mask, setMask] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [autoSubmit, setAutoSubmit] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [signingIn, setSigningIn] = React.useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSigningIn(true);
    setTimeout(() => {
      setSigningIn(false);
      setCode("");
    }, 1500);
  }

  return (
    <>
      <Showcase
        code={buildCode({ length, compact, mask, disabled, autoSubmit })}
        note={
          <>
            Type or paste: characters distribute across the slots and the
            value is one string. With auto submit on, filling the last
            slot submits the form; this demo fakes a sign-in and resets.
          </>
        }
      >
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <OTPField
            key={length}
            length={length}
            aria-label="Verification code"
            size={compact ? "compact" : "default"}
            mask={mask}
            disabled={disabled || signingIn}
            autoSubmit={autoSubmit}
            value={code}
            onValueChange={setCode}
          />
          <p
            style={{
              margin: 0,
              minHeight: "1.3125rem",
              fontSize: "0.875rem",
              color: "var(--ub-text-secondary)",
            }}
          >
            {signingIn ? "Signing in..." : ""}
          </p>
        </form>
      </Showcase>
      <Controls>
        <ControlRow label="Length">
          <SelectRoot
            size="compact"
            items={lengths}
            value={String(length)}
            onValueChange={(value) => {
              if (value) {
                setLength(Number(value));
                setCode("");
              }
            }}
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
        <ControlRow label="Auto submit">
          <Switch checked={autoSubmit} onCheckedChange={setAutoSubmit} />
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
