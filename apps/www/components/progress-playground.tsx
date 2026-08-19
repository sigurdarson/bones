"use client";

import * as React from "react";
import { Progress, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  showValue: boolean;
  indeterminate: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ showValue, indeterminate }: PlaygroundState): string {
  return `import { Progress } from "@usebones/react";

<Progress
  value={${indeterminate ? "null" : "64"}}
  label="Uploading photos"${showValue ? "\n  showValue" : ""}
/>`;
}

export function ProgressPlayground() {
  const [showValue, setShowValue] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ showValue, indeterminate })}
        note={
          <>
            <code>value={"{null}"}</code> means indeterminate: still
            working, amount unknown. The sweep animation derives from the
            motion tokens, so reduced motion stills it.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <Progress
            value={indeterminate ? null : 64}
            label="Uploading photos"
            showValue={showValue && !indeterminate}
          />
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Show value">
          <Switch
            checked={showValue && !indeterminate}
            onCheckedChange={setShowValue}
            disabled={indeterminate}
          />
        </ControlRow>
        <ControlRow label="Indeterminate">
          <Switch checked={indeterminate} onCheckedChange={setIndeterminate} />
        </ControlRow>
      </Controls>
    </>
  );
}
