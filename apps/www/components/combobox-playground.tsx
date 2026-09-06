import * as React from "react";
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

/* The roster is Icelanders of saga fame. */
const members = [
  "Gunnar á Hlíðarenda",
  "Eiríkur rauði",
  "Leifur heppni",
  "Snorri Sturluson",
  "Egill Skallagrímsson",
  "Ingólfur Arnarson",
  "Auður djúpúðga",
  "Guðríður Þorbjarnardóttir",
  "Hallgerður langbrók",
  "Grettir sterki",
];

interface PlaygroundState {
  compact: boolean;
  borderless: boolean;
  clearable: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({
  compact,
  borderless,
  clearable,
  disabled,
}: PlaygroundState): string {
  const inputAttrs = [
    `\n    placeholder="Assign to..."`,
    borderless ? `\n    variant="borderless"` : "",
    clearable ? "" : "\n    clearable={false}",
    disabled ? "\n    disabled" : "",
  ].join("");
  return `import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
} from "@usebones/react";

const members = ["Gunnar á Hlíðarenda", "Eiríkur rauði", /* ... */];

<ComboboxRoot items={members}${compact ? ' size="compact"' : ""}>
  <ComboboxInput${inputAttrs}
  />
  <ComboboxContent empty="No one matches.">
    {(member) => (
      <ComboboxItem key={member} value={member}>
        {member}
      </ComboboxItem>
    )}
  </ComboboxContent>
</ComboboxRoot>`;
}

export function ComboboxPlayground() {
  const [compact, setCompact] = React.useState(false);
  const [borderless, setBorderless] = React.useState(false);
  const [clearable, setClearable] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ compact, borderless, clearable, disabled })}
        note={
          <>
            Type to filter, or browse everything with the chevron. items
            on the root drives the filtering and the empty state; function
            children receive each match.
          </>
        }
      >
        <div style={{ width: "22rem" }}>
          <ComboboxRoot
            key={String(compact)}
            items={members}
            size={compact ? "compact" : "default"}
          >
            <ComboboxInput
              placeholder="Assign to..."
              aria-label="Assignee"
              variant={borderless ? "borderless" : "default"}
              clearable={clearable}
              disabled={disabled}
            />
            <ComboboxContent empty="No one matches.">
              {(member: string) => (
                <ComboboxItem key={member} value={member}>
                  {member}
                </ComboboxItem>
              )}
            </ComboboxContent>
          </ComboboxRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Borderless">
          <Switch checked={borderless} onCheckedChange={setBorderless} />
        </ControlRow>
        <ControlRow label="Clearable">
          <Switch checked={clearable} onCheckedChange={setClearable} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
