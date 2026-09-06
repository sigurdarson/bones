import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Accessibility" />
      <p className="lead">
        Table stakes, not a feature. Bones treats accessibility as part of a
        component being correct, the same as its visual states.
      </p>
      <h2>Behavior comes from Base UI</h2>
      <p>
        Interactive components wrap Base UI parts, which handle the hard
        parts: roles and ARIA attributes, keyboard interaction, focus
        management, and screen reader semantics. Bones adds styling on top and
        deliberately avoids reimplementing behavior, so those guarantees stay
        intact.
      </p>
      <h2>Focus is always visible</h2>
      <p>
        Every focusable part shows a ring on keyboard focus, driven by the{" "}
        <code>--ub-ring</code> token so it stays visible in both themes and
        any custom theme. Rings are scoped per component, never a global
        rule; text fields ring on every focus so the caret's destination is
        never in doubt:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-button:focus-visible {
  outline: 2px solid var(--ub-ring);
  outline-offset: 2px;
}`}
      />
      <h2>Reduced motion</h2>
      <p>
        All animation runs through duration tokens, and those collapse to zero
        when someone prefers reduced motion. There is no per-component opt-in
        to forget.
      </p>
      <h2>ARIA attributes always pass through</h2>
      <p>
        Every component spreads your props onto the underlying element last,
        so <code>aria-label</code>, <code>aria-describedby</code>, and
        friends always land where they should. Variants that can lack a
        visible label (like icon-only tabs) warn in development when no
        accessible name is provided, so the gap is caught before it ships.
      </p>
      <h2>Sensible defaults</h2>
      <ul>
        <li>
          Buttons default to <code>type="button"</code>, so forms don't submit
          by accident.
        </li>
        <li>
          Icons render <code>aria-hidden</code> by default; they're visual
          unless you say otherwise.
        </li>
        <li>
          Body and secondary text meet WCAG AA contrast in both themes;
          tertiary and disabled text sit deliberately below it and never
          carry meaning alone.
        </li>
      </ul>
      <h2>Found a gap?</h2>
      <p>
        Accessibility issues are treated as bugs. Open an issue on GitHub with
        the component, your setup, and what you expected.
      </p>
    </>
  );
}
