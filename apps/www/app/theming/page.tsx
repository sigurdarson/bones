import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { ColorScales, SemanticSwatches } from "@/components/color-scale";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Theming" };

export default function Page() {
  return (
    <>
      <PageHeader title="Theming" />
      <p className="lead">
        Every design decision in bones is a CSS custom property prefixed{" "}
        <code>--ub-</code>. Components only ever read the semantic layer, so a
        theme is a handful of overrides, not a fork.
      </p>
      <h2>Color steps</h2>
      <p>
        Every scale runs 50 through 950 on a shared lightness ladder, so any
        step swaps cleanly across hues. Gray is the neutral default. Red,
        orange, green, and blue back the feedback roles (danger, warning,
        success, info); violet, teal, fuchsia, and rose are secondary colors
        for badges and accents. Raw steps are for themes to reference;
        components never read them directly.
      </p>
      <ColorScales />
      <h2>Semantic tokens</h2>
      <p>
        This is the layer components consume and the layer you override. The
        swatches below are live; flip the theme toggle and watch them remap.
      </p>
      <SemanticSwatches />
      <h2>Dark mode</h2>
      <p>
        Add <code>class="dark"</code> (or <code>data-theme="dark"</code>) to{" "}
        <code>&lt;html&gt;</code> or any subtree. There is no JavaScript
        involved; it's a CSS scope.
      </p>
      <CodeBlock lang="html" code={`<html class="dark">`} />
      <h2>Radius: rounded or pill</h2>
      <p>
        Interactive elements read <code>--ub-radius-control</code>, which is
        8px by default. Set <code>data-radius="pill"</code> anywhere to make
        every control inside fully rounded.
      </p>
      <CodeBlock lang="html" code={`<html data-radius="pill">`} />
      <h2>Your own accent</h2>
      <p>
        The neutral default uses near-black as the accent. Give it a color by
        overriding two tokens:
      </p>
      <CodeBlock
        lang="css"
        code={`:root {
  --ub-accent: oklch(0.55 0.2 260);
  --ub-accent-hover: oklch(0.5 0.2 260);
  --ub-accent-contrast: white;
}`}
      />
      <h2>Sizing is tokens too</h2>
      <p>
        The same override-a-token approach covers dimensions: text, control
        heights, and icons all come in two sizes (default and compact) driven
        by size tokens. See <a href="/sizes">Sizes</a> for the whole system.
      </p>
      <h2>Scoped themes</h2>
      <p>
        Tokens cascade, so any override can be scoped to a subtree: a sidebar
        that's always dark, a marketing section with a different accent. Wrap
        it in a class and override tokens there.
      </p>
    </>
  );
}
