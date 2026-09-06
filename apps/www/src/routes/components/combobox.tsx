import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import {
  ComboboxAsyncMultiple,
  ComboboxAsyncSingle,
  ComboboxCreatable,
  ComboboxGrouped,
  ComboboxMultiple,
  ComboboxPopupInput,
} from "@/components/combobox-examples";
import { ComboboxPlayground } from "@/components/combobox-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/components/combobox")({
  head: () => ({ meta: [{ title: "Combobox · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Combobox" />
      <p className="lead">
        Pick from a list by typing, wrapping the Base UI Combobox. The
        input filters as you type, the chevron browses the whole list, and
        the selection is a real value like any form control. For a short
        fixed list, the <Link to="/components/select">Select</Link>{" "}
        stays simpler.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Try typing a few letters, then
        clearing; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <ComboboxPlayground />
      <h2>Multiple select</h2>
      <p>
        <code>multiple</code> turns the value into an array, and{" "}
        <code>ComboboxChips</code> shows it as removable chips with the
        input riding inline after them.
      </p>
      <ComboboxMultiple />
      <h2>Input inside popup</h2>
      <p>
        For a select-like control, swap the input for a{" "}
        <code>ComboboxTrigger</code> and put the search field inside the
        popup with <code>searchInput</code> on the content.
      </p>
      <ComboboxPopupInput />
      <h2>Grouped</h2>
      <p>
        Pass groups as the root's items and render each group's own items
        through <code>ComboboxCollection</code>; filtering reaches into
        every group.
      </p>
      <ComboboxGrouped />
      <h2>Async search</h2>
      <p>
        Fetch on <code>onInputValueChange</code>, hand the results to{" "}
        <code>items</code>, and keep a status line up while the request
        runs; the demo fakes the network with a delay.
      </p>
      <ComboboxAsyncSingle />
      <h2>Async search, multiple</h2>
      <p>
        The same pattern with chips: picked people stay selected while
        new searches stream fresh results into the list.
      </p>
      <ComboboxAsyncMultiple />
      <h2>Creatable</h2>
      <p>
        Manage the items yourself and append a create row when the query
        matches nothing; selecting it adds the value and keeps it chosen.
      </p>
      <ComboboxCreatable />
      <h2>Styling states</h2>
      <p>
        Items carry <code>data-highlighted</code> and{" "}
        <code>data-selected</code>, the chevron carries{" "}
        <code>data-popup-open</code>, and the popup has the usual{" "}
        <code>data-starting-style</code>/<code>data-ending-style</code>{" "}
        transitions:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-combobox-item[data-highlighted] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Props</h2>
      <p>
        Everything Base UI's Combobox parts accept passes through
        (multiple, itemToStringLabel for object items, onInputValueChange,
        ...). The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "ComboboxRoot.items",
            type: "Value[]",
            description: "The full list; typing filters it and powers the empty state.",
          },
          {
            name: "ComboboxRoot.value",
            type: "Value | Value[]",
            description: "Controlled selection (also defaultValue, onValueChange); multiple makes it an array.",
          },
          {
            name: "ComboboxRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Sizes the input and the list together.",
          },
          {
            name: "ComboboxInput.variant",
            type: '"default" | "borderless"',
            defaultValue: '"default"',
            description: "Borderless swaps the border for a muted fill, like the Select trigger.",
          },
          {
            name: "ComboboxInput.clearable",
            type: "boolean",
            defaultValue: "true",
            description: "Swaps the chevron for a clear button while something is selected.",
          },
          {
            name: "ComboboxInput.invalid",
            type: "boolean",
            defaultValue: "false",
            description: "Danger border and aria-invalid, like the Input; a surrounding Field sets it automatically. Also on ComboboxTrigger.",
          },
          {
            name: "ComboboxContent.empty",
            type: "ReactNode",
            description: "Shown while the filter matches nothing.",
          },
          {
            name: "ComboboxContent.children",
            type: "(item) => ReactNode",
            description: "Called with each filtered item; render a ComboboxItem.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`ComboboxRoot, ComboboxInput, ComboboxTrigger, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxGroupLabel, ComboboxChips, ComboboxChip, ComboboxValue, ComboboxCollection, ComboboxStatus, from @usebones/react.
- Structure: ComboboxRoot (pass items; size "default" | "compact") wraps ComboboxInput (placeholder, variant "default" | "borderless", clearable default true; chevron built in, swapped for a clear button while something is selected) + ComboboxContent (empty="..." plus function children rendering a ComboboxItem per filtered item).
- value/defaultValue/onValueChange like every control; multiple turns the value into an array. Object items need itemToStringLabel.
- Multiple with chips: ComboboxChips wrapping ComboboxValue's function children (map values to ComboboxChip; put ComboboxInput clearable={false} after them). Chip remove buttons are automatic.
- Select-like: ComboboxTrigger (placeholder is visual only; name it via aria-label or a Field label) with searchInput="..." on ComboboxContent putting the input inside the popup.
- Grouped: items are groups; function children get each group; ComboboxGroup items={group.items} + ComboboxGroupLabel + ComboboxCollection render the rows.
- Async: fetch in onInputValueChange, pass results as items, status="Searching..." on the content while loading (announced politely), empty={null} while loading.
- Creatable: manage items in state, render static children, and append a ComboboxItem whose value is the query when nothing matches.
- Prefer Select for short fixed lists; the combobox earns its input when the list is long enough to search.
- Restyle in CSS via .ub-combobox-input, .ub-combobox-chips, .ub-combobox-chip, .ub-combobox-popup, .ub-combobox-item, [data-highlighted], [data-selected], [data-popup-open] on the trigger. Tokens only.`}
      />
    </>
  );
}
