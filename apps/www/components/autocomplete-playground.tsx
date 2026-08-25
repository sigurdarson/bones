"use client";

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

const tags = ["feature", "fix", "docs", "refactor", "release", "tests"];

const inlineCompletionCode = `<AutocompleteRoot items={tags} mode="both">
  <AutocompleteInput placeholder="e.g. feature" />
  <AutocompleteContent empty="No tags found.">
    {(tag) => (
      <AutocompleteItem key={tag} value={tag}>
        {tag}
      </AutocompleteItem>
    )}
  </AutocompleteContent>
</AutocompleteRoot>`;

export function AutocompleteInlineCompletion() {
  return (
    <Showcase
      code={inlineCompletionCode}
      note={
        <>
          Arrow through the list and the input autofills with the
          highlighted tag; keep typing and the filter takes over again.
        </>
      }
    >
      <div style={{ width: "18rem" }}>
        <AutocompleteRoot items={tags} mode="both">
          <AutocompleteInput placeholder="e.g. feature" aria-label="Search tags" />
          <AutocompleteContent empty="No tags found.">
            {(tag: string) => (
              <AutocompleteItem key={tag} value={tag}>
                {tag}
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
            The value is the text itself: suggestions fill it in, and
            anything typed stays valid. Typing filters the list; the
            clear button appears once there is something to clear.
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
