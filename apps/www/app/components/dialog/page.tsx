import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { DialogPlayground } from "@/components/dialog-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const metadata: Metadata = { title: "Dialog" };

export default function Page() {
  return (
    <>
      <PageHeader title="Dialog" />
      <p className="lead">
        A modal window over a dimmed page, wrapping the Base UI Dialog.
        Focus is trapped inside and returned on close, the window scrolls
        when taller than the screen, and Escape always works. For a panel
        that doesn't take over the page, reach for the{" "}
        <Link href="/components/popover">Popover</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <DialogPlayground />
      <h2>Styling states</h2>
      <p>
        The popup and backdrop both carry <code>data-starting-style</code>{" "}
        and <code>data-ending-style</code> during the enter and exit
        transitions, and the trigger carries <code>data-popup-open</code>{" "}
        while open:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-dialog-popup {
  max-width: 32rem;
}`}
      />
      <h2>Props</h2>
      <p>
        Open state lives on the root; the title and description wire the
        dialog's accessible name and description automatically. The
        essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "DialogRoot.open",
            type: "boolean",
            description: "Controlled state. Pair with onOpenChange (also defaultOpen).",
          },
          {
            name: "DialogRoot.modal",
            type: "boolean",
            defaultValue: "true",
            description: "Dims and inerts the page behind; false keeps it interactive.",
          },
          {
            name: "DialogRoot.disablePointerDismissal",
            type: "boolean",
            defaultValue: "false",
            description: "Ignore outside clicks, for forms that shouldn't be lost.",
          },
          {
            name: "DialogTrigger.render",
            type: "ReactElement",
            description: "The real control that opens the dialog, usually a bones Button.",
          },
          {
            name: "DialogContent.initialFocus",
            type: "RefObject<HTMLElement>",
            description: "Where focus lands on open; defaults to the first focusable part.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, from @usebones/react.
- Structure: DialogRoot wraps DialogTrigger + DialogContent; put DialogTitle (names the dialog), DialogDescription, and the body inside the content. DialogClose closes it; render several for Cancel/Save pairs.
- Attach trigger and close buttons to real controls via render={<Button ... />}.
- Modal by default: page dimmed and inert, focus trapped, Escape closes, focus returns to the trigger. disablePointerDismissal ignores outside clicks for forms.
- The content scrolls when taller than the screen; no height handling needed.
- Restyle in CSS via .ub-dialog-popup (26rem max-width default), .ub-dialog-backdrop, .ub-dialog-title, .ub-dialog-description, [data-starting-style]/[data-ending-style] for enter/exit. Tokens only.`}
      />
    </>
  );
}
