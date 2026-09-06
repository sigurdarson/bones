import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/scrollbars")({
  head: () => ({
    meta: [
      { title: "Scrollbars · Bones" },
      { name: "description", content: "Thin, theme-aware scrollbars from one opt-in stylesheet." },
    ],
  }),
  component: Page,
});

const deploys = [
  { time: "09:41", what: "Deployed v0.2.1 to production" },
  { time: "09:38", what: "Smoke tests passed on preview" },
  { time: "09:36", what: "Built 47 pages in 3.6s" },
  { time: "09:12", what: "Merged: matrix full theme" },
  { time: "08:57", what: "Deployed v0.2.0 to production" },
  { time: "08:55", what: "Tagged v0.2.0" },
  { time: "08:40", what: "Merged: consistency pass" },
  { time: "08:31", what: "Merged: rename Input wrapper anatomy" },
  { time: "08:02", what: "Merged: autocomplete" },
  { time: "07:48", what: "Merged: combobox" },
  { time: "07:30", what: "Merged: navigation menu" },
  { time: "07:15", what: "Deployed v0.1.0 to production" },
];

function Page() {
  return (
    <>
      <PageHeader title="Scrollbars" />
      <p className="lead">
        Default scrollbars are loud and ignore your theme. Bones ships an
        opt-in stylesheet that makes every scrollbar thin, theme-aware, and
        invisible until you hover whatever is scrolling. For one scrolling
        pane rather than the whole page, use the{" "}
        <Link to="/components/scroll-area">Scroll area</Link> component.
      </p>
      <h2>Opt in</h2>
      <p>
        One import, applied page-wide. It's separate from{" "}
        <code>index.css</code> on purpose: restyling every scrollbar is a
        whole-page opinion your app should choose deliberately.
      </p>
      <CodeBlock code={`import "@usebones/tokens/scrollbars.css";`} />
      <h2>See it</h2>
      <p>
        This box scrolls; this site has the stylesheet enabled. The scrollbar
        fades in when your cursor is over the box and hides again when it
        leaves, picking up <code>--ub-border-strong</code> so it follows the
        theme. The gutter stays reserved, so content never shifts.
      </p>
      <div className="scroll-demo">
        {deploys.map((deploy) => (
          <p key={deploy.time}>
            <code>{deploy.time}</code> {deploy.what}
          </p>
        ))}
      </div>
      <h2>How it works</h2>
      <p>
        Just the standard CSS scrollbar properties, colored by tokens. No
        JavaScript, no wrapper component, nothing to keep in sync:
      </p>
      <CodeBlock
        lang="css"
        code={`* {
  scrollbar-width: thin;
  /* the visible color at zero alpha, so a fade moves opacity only */
  scrollbar-color: oklch(from var(--ub-border-strong) l c h / 0) transparent;
}

*:hover {
  scrollbar-color: var(--ub-border-strong) transparent;
}`}
      />
      <h2>Fading the reveal</h2>
      <p>
        The stylesheet deliberately ships no transition: transitions on broad
        selectors animate things that were never meant to move and make
        components that wait for transitions linger. To fade the reveal,
        declare it on the scrollables you own:
      </p>
      <CodeBlock
        lang="css"
        code={`.my-scroll-area {
  transition: scrollbar-color var(--ub-duration-base) var(--ub-ease-out);
}`}
      />
    </>
  );
}
