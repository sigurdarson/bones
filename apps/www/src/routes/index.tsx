import { createFileRoute, Link } from "@tanstack/react-router";
import { InstallTabs } from "@/components/install-tabs";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader className="intro-title" title="Components with good Bones." />
      <p className="lead">
        Bones is a minimal, themable component library built on Base UI.
        Fluid by default, quiet until you theme it, and designed so coding
        agents get it right on the first try.
      </p>
      <div className="intro-actions">
        <Link to="/quick-start" className="ub-button" data-variant="primary">
          Quick start
        </Link>
        <a
          href="https://github.com/sigurdarson/bones"
          className="ub-button"
          data-variant="secondary"
        >
          GitHub
        </a>
      </div>
      <InstallTabs pkg="@usebones/react @usebones/tokens" />
      <h2>Quiet by default</h2>
      <p>
        The default palette is pure neutral gray with near-black as the only
        accent. That's deliberate: components should recede so your product
        stands out. When you're ready to make it yours, a theme is a handful
        of CSS variables, not a fork of the stylesheet. Override{" "}
        <code>--ub-accent</code> and everything that means "primary action"
        follows.
      </p>

      <h2>Two sizes, not five</h2>
      <p>
        Everything in Bones comes in exactly two sizes: default and compact.
        No sm, md, lg, xl scale to argue about in review. Text is 16px or
        14px, controls are 36px or 28px tall, and every one of those numbers
        is a token, so a dense admin table and a roomy marketing form can
        coexist without custom CSS.
      </p>

      <h2>Motion with a job to do</h2>
      <p>
        Interactions answer with small, springy movements: a switch thumb
        settles instead of snapping, a pressed button gives slightly under
        your finger. Every duration and easing is a token, nothing is
        hardcoded, and when someone prefers reduced motion the whole library
        goes still automatically. Fluid, never showy.
      </p>

      <h2>Behavior you don't have to write</h2>
      <p>
        Interactive components wrap Base UI parts, so keyboard handling,
        focus management, and screen reader semantics come from a
        battle-tested foundation. Bones adds the styling layer and stays out
        of the behavior's way; state is exposed as data attributes you can
        target from plain CSS.
      </p>

      <h2>Agents are first-class users</h2>
      <p>
        Most component libraries are written for people and merely tolerated
        by AI tools. Bones flips that: exported and documented prop types, a
        predictable file per component, class names that match component
        names, and conventions recorded where agents actually read them.
        Point your coding agent at <a href="/llms.txt">llms.txt</a> or the{" "}
        <Link to="/skills">skills</Link> and it composes Bones correctly
        without trial and error.
      </p>

      <h2>Where this is going</h2>
      <p>
        The open-source packages cover the everyday primitives, growing one
        well-made component at a time. On top of them, a commercial tier of
        product-ready AI interface components is planned: chat, streaming and
        thinking states, prompt input, message bubbles. Same tokens, same
        conventions, same quiet defaults.
      </p>
    </>
  );
}
