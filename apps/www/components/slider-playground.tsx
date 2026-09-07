import * as React from "react";
import { Slider, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

interface PlaygroundState {
  range: boolean;
  disabled: boolean;
  vertical: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ range, disabled, vertical }: PlaygroundState): string {
  return `import { Slider } from "@usebones/react";

<Slider
  defaultValue={${range ? "[20, 60]" : "40"}}
  aria-label="${range ? "Price" : "Volume"}"${vertical ? '\n  orientation="vertical"\n  style={{ height: "12rem" }}' : ""}${disabled ? "\n  disabled" : ""}
/>`;
}

export function SliderPlayground() {
  const [range, setRange] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [vertical, setVertical] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ range, disabled, vertical })}
        note={
          <>
            Track, filled indicator, and thumbs render automatically; an
            array value gets a thumb per entry. Arrow keys step, home and
            end jump.
          </>
        }
      >
        <div style={{ width: vertical ? "1.25rem" : "16rem" }}>
          <Slider
            key={String(range)}
            defaultValue={range ? [20, 60] : 40}
            aria-label={range ? "Price" : "Volume"}
            orientation={vertical ? "vertical" : "horizontal"}
            style={vertical ? { height: "12rem" } : undefined}
            disabled={disabled}
          />
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Range">
          <Switch checked={range} onCheckedChange={setRange} />
        </ControlRow>
        <ControlRow label="Vertical">
          <Switch checked={vertical} onCheckedChange={setVertical} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
