"use client";

import * as React from "react";
import { Slider, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  range: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ range, disabled }: PlaygroundState): string {
  return `import { Slider } from "@usebones/react";

<Slider
  defaultValue={${range ? "[20, 60]" : "40"}}
  aria-label="${range ? "Price" : "Volume"}"${disabled ? "\n  disabled" : ""}
/>`;
}

export function SliderPlayground() {
  const [range, setRange] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ range, disabled })}
        note={
          <>
            Track, filled indicator, and thumbs render automatically; an
            array value gets a thumb per entry. Arrow keys step, home and
            end jump.
          </>
        }
      >
        <div style={{ width: "16rem" }}>
          <Slider
            key={String(range)}
            defaultValue={range ? [20, 60] : 40}
            aria-label={range ? "Price" : "Volume"}
            disabled={disabled}
          />
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Range">
          <Switch checked={range} onCheckedChange={setRange} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
