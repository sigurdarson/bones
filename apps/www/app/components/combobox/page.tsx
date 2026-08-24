import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { ComboboxPlayground } from "@/components/combobox-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Combobox" };

export default function Page() {
  return (
    <>
      <PageHeader title="Combobox" />
      <p className="lead">
        Pick from a list by typing, wrapping the Base UI Combobox. The
        input filters as you type, the chevron browses the whole list, and
        the selection is a real value like any form control. For a short
        fixed list, the <Link href="/components/select">Select</Link>{" "}
        stays simpler.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Try typing a few letters, then
        clearing; the Code tab always shows the markup for exactly what
        you've configured.
      </p>
      <ComboboxPlayground />
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
            name: "ComboboxInput.clearable",
            type: "boolean",
            defaultValue: "true",
            description: "Shows the clear button while something is typed or selected.",
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
        instructions={`ComboboxRoot, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxGroupLabel, from @usebones/react.
- Structure: ComboboxRoot (pass items; size "default" | "compact") wraps ComboboxInput (placeholder, clearable default true; chevron and clear built in) + ComboboxContent (empty="..." plus function children rendering a ComboboxItem per filtered item).
- value/defaultValue/onValueChange like every control; multiple turns the value into an array. Object items need itemToStringLabel.
- Typing filters and opens; the chevron browses everything; the selected check renders automatically.
- Prefer Select for short fixed lists; the combobox earns its input when the list is long enough to search.
- Restyle in CSS via .ub-combobox-input, .ub-combobox-popup, .ub-combobox-item, [data-highlighted], [data-selected], [data-popup-open] on the trigger. Tokens only.`}
      />
    </>
  );
}
