import * as React from "react";
import {
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

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
    Custom domains, API access, and webhooks live here until you need
    them.
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
              <p
                style={{
                  margin: "0.5rem 0 0",
                  fontSize: "0.875rem",
                  color: "var(--ub-text-secondary)",
                }}
              >
                Custom domains, API access, and webhooks live here until
                you need them.
              </p>
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
