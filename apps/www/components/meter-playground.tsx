import * as React from "react";
import { Meter, Slider, Switch } from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow, ControlField } from "./controls";

interface PlaygroundState {
  value: number;
  showValue: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ value, showValue }: PlaygroundState): string {
  return `import { Meter } from "@usebones/react";

<Meter value={${value}} label="Storage used"${showValue ? " showValue" : ""} />`;
}

export function MeterPlayground() {
  const [value, setValue] = React.useState(62);
  const [showValue, setShowValue] = React.useState(true);

  return (
    <>
      <Showcase
        code={buildCode({ value, showValue })}
        note={
          <>
            The value reads as a percentage of min and max by default; pass{" "}
            <code>format</code> (Intl.NumberFormatOptions) for units like
            gigabytes. Always pass <code>label</code> or{" "}
            <code>aria-label</code>: a dev warning fires without one.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <Meter value={value} label="Storage used" showValue={showValue} />
        </div>
      </Showcase>
      <Controls>
        <ControlField label="Value">
          <Slider
            value={value}
            onValueChange={(next) => setValue(next as number)}
            aria-label="Meter value"
          />
        </ControlField>
        <ControlRow label="Show value">
          <Switch checked={showValue} onCheckedChange={setShowValue} />
        </ControlRow>
      </Controls>
    </>
  );
}
