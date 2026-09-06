import * as React from "react";
import {
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteRoot,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

const pages = [
  "Accessibility",
  "Button",
  "Checkbox",
  "Combobox",
  "Motion",
  "Quick start",
  "Theming",
  "Tokens",
];

interface PlaygroundState {
  compact: boolean;
  borderless: boolean;
  disabled: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ compact, borderless, disabled }: PlaygroundState): string {
  const inputAttrs = [
    `\n    placeholder="Search the docs"`,
    borderless ? `\n    variant="borderless"` : "",
    disabled ? "\n    disabled" : "",
  ].join("");
  return `import {
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteRoot,
} from "@usebones/react";

const pages = ["Accessibility", "Button", /* ... */];

<AutocompleteRoot items={pages}${compact ? ' size="compact"' : ""}>
  <AutocompleteInput${inputAttrs}
  />
  <AutocompleteContent empty="No pages found.">
    {(page) => (
      <AutocompleteItem key={page} value={page}>
        {page}
      </AutocompleteItem>
    )}
  </AutocompleteContent>
</AutocompleteRoot>`;
}

const labels = ["bug", "docs", "enhancement", "refactor", "release", "tests"];

const variantsCode = `<AutocompleteRoot items={labels}>
  <AutocompleteInput placeholder="Add a label" />
  <AutocompleteContent empty="No labels found.">
    {(label) => (
      <AutocompleteItem key={label} value={label}>
        {label}
      </AutocompleteItem>
    )}
  </AutocompleteContent>
</AutocompleteRoot>

<AutocompleteRoot items={labels} mode="both">
  <AutocompleteInput placeholder="Add a label" />
  <AutocompleteContent empty="No labels found.">
    {(label) => (
      <AutocompleteItem key={label} value={label}>
        {label}
      </AutocompleteItem>
    )}
  </AutocompleteContent>
</AutocompleteRoot>`;

export function AutocompleteVariants() {
  return (
    <Showcase
      code={variantsCode}
      note={
        <>
          Type a letter in each, then press the down arrow: the first only
          highlights, the second also writes the highlighted label into
          the input. Either way Enter commits and Escape keeps what you
          typed.
        </>
      }
    >
      <div className="showcase-stack" style={{ width: "18rem" }}>
        <AutocompleteRoot items={labels}>
          <AutocompleteInput placeholder="Add a label" aria-label="Filter only" />
          <AutocompleteContent empty="No labels found.">
            {(label: string) => (
              <AutocompleteItem key={label} value={label}>
                {label}
              </AutocompleteItem>
            )}
          </AutocompleteContent>
        </AutocompleteRoot>
        <AutocompleteRoot items={labels} mode="both">
          <AutocompleteInput placeholder="Add a label" aria-label="Filter and complete inline" />
          <AutocompleteContent empty="No labels found.">
            {(label: string) => (
              <AutocompleteItem key={label} value={label}>
                {label}
              </AutocompleteItem>
            )}
          </AutocompleteContent>
        </AutocompleteRoot>
      </div>
    </Showcase>
  );
}

export function AutocompletePlayground() {
  const [compact, setCompact] = React.useState(false);
  const [borderless, setBorderless] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
      <Showcase
        code={buildCode({ compact, borderless, disabled })}
        note={
          <>
            Enter fills the input with the highlighted suggestion and
            closes the list; Escape closes it and keeps what you typed.
            The clear button only appears once there is text, in the slot
            a Combobox uses for its chevron.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <AutocompleteRoot
            key={String(compact)}
            items={pages}
            size={compact ? "compact" : "default"}
          >
            <AutocompleteInput
              placeholder="Search the docs"
              aria-label="Search the docs"
              variant={borderless ? "borderless" : "default"}
              disabled={disabled}
            />
            <AutocompleteContent empty="No pages found.">
              {(page: string) => (
                <AutocompleteItem key={page} value={page}>
                  {page}
                </AutocompleteItem>
              )}
            </AutocompleteContent>
          </AutocompleteRoot>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Compact">
          <Switch checked={compact} onCheckedChange={setCompact} />
        </ControlRow>
        <ControlRow label="Borderless">
          <Switch checked={borderless} onCheckedChange={setBorderless} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </Controls>
    </>
  );
}
