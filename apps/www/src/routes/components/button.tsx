import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@usebones/react";
import { ButtonPlayground } from "@/components/button-playground";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { AgentInstructions } from "@/components/agent-instructions";

export const Route = createFileRoute("/components/button")({
  head: () => ({ meta: [{ title: "Button · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Button" />
      <p className="lead">
        The everyday action element. Four variants, two sizes, radius that
        follows the rounded/pill setting.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <ButtonPlayground />
      <h2>Variants</h2>
      <p>
        Primary carries the accent and there should rarely be more than one
        in view; secondary and ghost do the everyday work; danger is for
        destructive actions only.
      </p>
      <Showcase
        code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      >
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </Showcase>
      <h2>States</h2>
      <p>
        Hover, focus, and press are live on every example above; disabled is
        the one you set. Disabled buttons keep their variant, dimmed.
      </p>
      <Showcase
        code={`<Button disabled>Saving</Button>
<Button variant="secondary" disabled>Saving</Button>`}
      >
        <Button disabled>Saving</Button>
        <Button variant="secondary" disabled>
          Saving
        </Button>
      </Showcase>
      <h2>As a link</h2>
      <p>
        Styling is class and data-attribute based, so anchors can look like
        buttons without a wrapper component. Base styles carry the default
        size; add <code>data-size="compact"</code> for the small one:
      </p>
      <CodeBlock
        code={`<a href="/quick-start" className="ub-button" data-variant="primary">
  Get started
</a>`}
      />
      <h2>Props</h2>
      <p>
        Everything a native <code>button</code> accepts, plus:
      </p>
      <PropsTable
        rows={[
          {
            name: "variant",
            type: '"primary" | "secondary" | "ghost" | "danger"',
            defaultValue: '"primary"',
            description: "Visual style.",
          },
          {
            name: "size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default is 36px tall with 16px text; compact is 28px with 14px text.",
          },
          {
            name: "iconOnly",
            type: "boolean",
            defaultValue: "false",
            description: "Square button holding only an icon; pair with aria-label.",
          },
        ]}
      />
      <p>
        <code>type</code> defaults to <code>"button"</code> so buttons inside
        forms don't submit by accident.
      </p>
      <AgentInstructions
        instructions={`Button, from @usebones/react.
- variant: "primary" | "secondary" | "ghost" | "danger" (default "primary"). Danger is for destructive actions only.
- size: "default" (36px) | "compact" (28px). iconOnly makes it square and requires aria-label.
- Icons are children via @usebones/icons: <Icon name="..." /> before the label for leading, after for trailing, alone with iconOnly.
- type defaults to "button"; every native button prop passes through.
- Links styled as buttons: <a className="ub-button" data-variant="primary">.
- Restyle in CSS via [data-variant], [data-size], :hover, :disabled, using --ub-* tokens only.`}
      />
    </>
  );
}
