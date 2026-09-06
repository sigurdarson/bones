import * as React from "react";
import {
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

/* Panel content goes in a wrapper, never on the panel itself: the panel's
   height is measured for the animation, and padding on the measured
   element makes it jump mid-transition. Shared with the States showcase. */
export function CollapsibleBody({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: "0.5rem 0 0",
        fontSize: "0.875rem",
        color: "var(--ub-text-secondary)",
      }}
    >
      {children}
    </p>
  );
}

interface PlaygroundState {
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ disabled }: PlaygroundState): string {
  return `import {
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "@usebones/react";

<CollapsibleRoot${disabled ? " disabled" : ""}>
  <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
  <CollapsiblePanel>
    <p>Custom domains, API access, and webhooks live here until you need them.</p>
  </CollapsiblePanel>
</CollapsibleRoot>`;
}

export function CollapsiblePlayground() {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ disabled })}
        note={
          <>
            Put padding on a wrapper inside the panel (the{" "}
            <code>p</code> here), not on <code>CollapsiblePanel</code>{" "}
            itself: the height is measured, and padding on the animated
            element makes the measurement jump mid-transition.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <CollapsibleRoot disabled={disabled}>
            <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
            <CollapsiblePanel>
              <CollapsibleBody>
                Custom domains, API access, and webhooks live here until
                you need them.
              </CollapsibleBody>
            </CollapsiblePanel>
          </CollapsibleRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
