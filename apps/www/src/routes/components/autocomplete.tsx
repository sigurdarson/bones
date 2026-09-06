import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import {
  AutocompleteInlineCompletion,
  AutocompletePlayground,
} from "@/components/autocomplete-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/autocomplete")({
  head: () => ({ meta: [{ title: "Autocomplete · Bones" }] }),
  component: Page,
});

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
        Every control maps to a prop. Try arrowing through suggestions in
        each mode; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <AutocompletePlayground />
      <h2>Inline completion</h2>
      <p>
        <code>mode</code> autofills the input with the highlighted item
        while arrowing through the list. It accepts the aria-autocomplete
        values: <code>list</code> (the default) filters without
        autofilling, <code>both</code> filters and autofills,{" "}
        <code>inline</code> autofills over a static list, and{" "}
        <code>none</code> does neither.
      </p>
      <AutocompleteInlineCompletion />
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
            description: "Two behaviors combined: list filters only, both also completes inline, inline completes without filtering, none does neither.",
          },
          {
            name: "AutocompleteRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes the input and the list together.",
          },
          {
            name: "AutocompleteInput.clearable",
            type: "boolean",
            defaultValue: "true",
            description: "Shows the clear button while something is typed.",
          },
          {
            name: "AutocompleteInput.invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border and aria-invalid, like the Input; a surrounding Field sets it automatically.",
          },
          {
            name: "AutocompleteContent.empty / status",
            type: "ReactNode",
            description: "Empty state, and a politely announced status line for async searches.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`AutocompleteRoot, AutocompleteInput, AutocompleteContent, AutocompleteItem, from @usebones/react.
- Structure: AutocompleteRoot (pass items; size "default" | "compact"; mode "list" default) wraps AutocompleteInput (placeholder, variant "default" | "borderless", clearable default true; no chevron, typing-first) + AutocompleteContent (empty="...", status for async, function children rendering an AutocompleteItem per suggestion).
- The value is the input string (value/defaultValue/onValueChange); selecting a suggestion fills it and free text stays valid. Use Combobox when the value must come from the list.
- mode is a 2x2 of filtering and inline completion: "list" filters only (default), "both" filters and completes inline, "inline" completes without filtering (static list), "none" does neither.
- Async: fetch in onValueChange (it fires per keystroke, since the value is the text), pass results as items, and put status="Searching..." on the content.
- Shares the Combobox classes (.ub-combobox-input, .ub-combobox-popup, .ub-combobox-item) plus .ub-autocomplete-* hooks; restyling one restyles both. Tokens only.`}
      />
    </>
  );
}
