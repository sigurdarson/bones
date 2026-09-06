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
        <Link to="/components/button" className="ub-button" data-variant="secondary">
          Browse components
        </Link>
        <a
          href="https://github.com/sigurdarson/bones"
          className="ub-button"
          data-variant="ghost"
        >
          GitHub
        </a>
      </div>
      <InstallTabs pkg="@usebones/react @usebones/tokens" />
      <h2>Agents are first-class users</h2>
      <p>
        Bones is written to be read by machines as well as people: exported
        and documented prop types, one predictable file per component, class
        names that match component names, and conventions recorded where
        agents actually look. Point your coding agent at{" "}
        <a href="/llms.txt">llms.txt</a> or install the{" "}
        <Link to="/skills">skill</Link> and it composes Bones correctly
        without trial and error.
      </p>
      <h2>The whole set</h2>
      <p>
        Thirty-eight components today, from Button and Input to Combobox,
        Toast, Drawer, and Navigation menu, every one wrapping a Base UI part
        so keyboard handling, focus management, and screen reader semantics
        come from a battle-tested foundation. Bones adds the styling layer
        and stays out of the behavior's way; state is exposed as data
        attributes you can target from plain CSS.
      </p>
      <h2>Quiet by default</h2>
      <p>
        The default palette is pure neutral gray with near-black as the only
        accent, so components recede and your product stands out. A theme is
        a handful of CSS variables, not a fork: override{" "}
        <code>--ub-accent</code> and everything that means "primary action"
        follows. See <Link to="/theming">Theming</Link>.
      </p>
      <h2>Two sizes, not five</h2>
      <p>
        Everything comes in exactly two sizes, default and compact, and every
        number behind them is a token, so a dense admin table and a roomy
        marketing form coexist without custom CSS. See{" "}
        <Link to="/sizes">Sizes</Link>.
      </p>
      <h2>Motion with a job to do</h2>
      <p>
        Interactions answer with small, springy movements, every duration and
        easing is a token, and the whole library goes still automatically for
        anyone who prefers reduced motion. See <Link to="/motion">Motion</Link>.
      </p>
      <h2>Where this is going</h2>
      <p>
        On top of the open-source packages, a commercial tier of AI interface
        components is planned: chat, streaming and thinking states, prompt
        input, message bubbles. Same tokens, same conventions, same quiet
        defaults. Until then, the <Link to="/quick-start">quick start</Link>{" "}
        takes about two minutes.
      </p>
    </>
  );
}
