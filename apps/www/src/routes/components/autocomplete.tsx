import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteRoot,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import {
  AutocompletePlayground,
  AutocompleteVariants,
} from "@/components/autocomplete-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/components/autocomplete")({
  head: () => ({ meta: [{ title: "Autocomplete · Bones" }] }),
  component: Page,
});

const labels = ["bug", "docs", "enhancement", "refactor"];

function LabelList() {
  return (
    <AutocompleteContent empty="No labels found.">
      {(label: string) => (
        <AutocompleteItem key={label} value={label}>
          {label}
        </AutocompleteItem>
      )}
    </AutocompleteContent>
  );
}

function Page() {
  return (
    <>
      <PageHeader title="Autocomplete" />
      <p className="lead">
        Free text with suggestions, wrapping the Base UI Autocomplete. The
        value is the input text itself: picking a suggestion fills it in,
        and anything typed stays valid. When the answer must come from the
        list, use the <Link to="/components/combobox">Combobox</Link>{" "}
        instead.
      </p>
      <h2>Playground</h2>
      <p>
        Type a letter or two and arrow through what's left; Borderless and
        Compact restyle the input and the list together, and the Code tab
        shows the markup for exactly what you've configured.
      </p>
      <AutocompletePlayground />
      <h2>Variants</h2>
      <p>
        <code>mode</code> decides what arrowing through the list does to
        the input. The default, <code>list</code>, only filters as you
        type; <code>both</code> also writes the highlighted suggestion
        into the input; <code>inline</code> writes but never filters, for
        short lists you want to keep whole; <code>none</code> does neither,
        for lists you filter yourself.
      </p>
      <AutocompleteVariants />
      <h2>States</h2>
      <p>
        Open and highlighted are live (type to see them); disabled and
        invalid are yours to set, and invalid turns the border to the
        danger color, which a surrounding Field does for you on failed
        validation.
      </p>
      <Showcase
        code={`<AutocompleteInput placeholder="Add a label" />
<AutocompleteRoot items={labels} defaultValue="docs">
<AutocompleteInput placeholder="Add a label" disabled />
<AutocompleteRoot items={labels} defaultValue="needs review">
  <AutocompleteInput invalid />`}
      >
        <div className="showcase-stack" style={{ width: "18rem" }}>
          <AutocompleteRoot items={labels}>
            <AutocompleteInput placeholder="Add a label" aria-label="Empty" />
            <LabelList />
          </AutocompleteRoot>
          <AutocompleteRoot items={labels} defaultValue="docs">
            <AutocompleteInput placeholder="Add a label" aria-label="Filled" />
            <LabelList />
          </AutocompleteRoot>
          <AutocompleteRoot items={labels}>
            <AutocompleteInput placeholder="Add a label" aria-label="Disabled" disabled />
            <LabelList />
          </AutocompleteRoot>
          <AutocompleteRoot items={labels} defaultValue="needs review">
            <AutocompleteInput placeholder="Add a label" aria-label="Invalid" invalid />
            <LabelList />
          </AutocompleteRoot>
        </div>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The autocomplete shares the Combobox's classes, so the two restyle
        together; items carry <code>data-highlighted</code> and the popup
        the usual <code>data-starting-style</code>/
        <code>data-ending-style</code> transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-autocomplete-popup .ub-combobox-item[data-highlighted] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything the Base UI Autocomplete accepts passes through
        (openOnInputClick, autoHighlight, itemToStringValue for object
        items, ...). The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "AutocompleteRoot.items",
            type: "Value[]",
            description: "The suggestions; typing filters them and powers the empty state.",
          },
          {
            name: "AutocompleteRoot.value",
            type: "string",
            description: "The input text (also defaultValue, onValueChange); suggestions fill it.",
          },
          {
            name: "AutocompleteRoot.mode",
            type: '"list" | "both" | "inline" | "none"',
            defaultValue: '"list"',
            description: "Whether arrowing writes into the input and whether typing filters; see Variants above.",
          },
          {
            name: "AutocompleteRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes the input and the list together: 36px tall with 16px text by default, 28px with 14px text compact.",
          },
          {
            name: "AutocompleteInput.clearable",
            type: "boolean",
            defaultValue: "true",
            description: "Shows the clear button while something is typed.",
          },
          {
            name: "AutocompleteInput.variant",
            type: '"default" | "borderless"',
            defaultValue: '"default"',
            description: "Bordered, or a muted fill with no border.",
          },
          {
            name: "AutocompleteInput.placeholder",
            type: "string",
            description: "Hint text while the input is empty.",
          },
          {
            name: "AutocompleteInput.invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border and ring, plus aria-invalid; a surrounding Field sets it automatically.",
          },
          {
            name: "AutocompleteContent.empty / status",
            type: "ReactNode",
            description: "Empty state, and a politely announced status line for async searches.",
          },
          {
            name: "AutocompleteContent.sideOffset",
            type: "number",
            defaultValue: "4",
            description: "Gap between the input and the popup, in pixels. Also side and align.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`AutocompleteRoot, AutocompleteInput, AutocompleteContent, AutocompleteItem, from @usebones/react.
- Structure: AutocompleteRoot (pass items; size "default" | "compact"; mode "list" default) wraps AutocompleteInput (placeholder, variant "default" | "borderless", clearable default true, invalid; no chevron, typing-first) + AutocompleteContent (empty="...", status for async, function children rendering an AutocompleteItem per suggestion).
- The value is the input string (value/defaultValue/onValueChange); selecting a suggestion fills it and free text stays valid. Use Combobox when the value must come from the list.
- mode: "list" (default) filters as you type; "both" also writes the highlighted suggestion into the input while arrowing; "inline" writes without filtering; "none" does neither.
- Async: fetch in onValueChange (it fires per keystroke, since the value is the text), pass results as items, and put status="Searching..." on the content.
- Inside FieldRoot, drop invalid and use FieldLabel and FieldError instead; the Field wires the name and validation.
- Restyle in CSS via the shared Combobox classes (.ub-combobox-input, .ub-combobox-popup, .ub-combobox-item) plus .ub-autocomplete-* hooks; restyling one restyles both. Tokens only.`}
      />
    </>
  );
}
