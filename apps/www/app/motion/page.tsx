import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { Preview } from "@/components/preview";
import { Switch } from "@usebones/react";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Motion" };

export default function Page() {
  return (
    <>
      <PageHeader title="Motion" />
      <p className="lead">
        Fluid and snappy, never showy. Every duration and easing is a token,
        and reduced motion is respected everywhere without any extra work.
      </p>
      <h2>See it</h2>
      <Preview>
        <label className="preview-field">
          <Switch defaultChecked />
          The thumb settles with a light spring
        </label>
      </Preview>
      <h2>The tokens</h2>
      <p>
        Three durations (<code>--ub-duration-fast</code>,{" "}
        <code>--ub-duration-base</code>, <code>--ub-duration-slow</code>) and
        three easings. <code>--ub-ease-spring</code> is a CSS{" "}
        <code>linear()</code> approximation of a light spring; use it for
        thumbs, toggles, and small position changes.{" "}
        <code>--ub-ease-out</code> covers fades and color shifts.
      </p>
      <CodeBlock
        lang="css"
        code={`.my-thing {
  transition: transform var(--ub-duration-slow) var(--ub-ease-spring);
}`}
      />
      <h2>Reduced motion</h2>
      <p>
        When someone prefers reduced motion, the duration tokens collapse to
        zero at the token level. Anything built on them, in the library or in
        your app, goes still automatically. This is the payoff of never
        hardcoding a millisecond value.
      </p>
    </>
  );
}
