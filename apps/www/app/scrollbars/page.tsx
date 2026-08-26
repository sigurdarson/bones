import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Scrollbars" };

export default function Page() {
  return (
    <>
      <PageHeader title="Scrollbars" />
      <p className="lead">
        Default scrollbars are loud and ignore your theme. Bones ships an
        opt-in stylesheet that makes every scrollbar thin, theme-aware, and
        invisible until you hover whatever is scrolling.
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
        leaves. The gutter stays reserved, so content never shifts.
      </p>
      <div className="scroll-demo">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>
            Row {i + 1}. The scrollbar picks up <code>--ub-border-strong</code>,
            so it follows the theme, light or dark.
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
