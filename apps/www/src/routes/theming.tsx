import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/code-block";
import { ColorScales } from "@/components/color-scale";
import { MatrixSwitch } from "@/components/matrix-switch";
import { PageHeader } from "@/components/page-header";

const overrideReference = [
  { token: "--ub-bg", light: "white", dark: "gray-950", controls: "Page background" },
  { token: "--ub-bg-subtle", light: "gray-50", dark: "gray-900", controls: "Wells, code blocks, panels" },
  { token: "--ub-bg-muted", light: "gray-200", dark: "gray-800", controls: "Hovers, secondary buttons, active pills" },
  { token: "--ub-bg-muted-hover", light: "gray-300", dark: "gray-700", controls: "One step deeper on hover" },
  { token: "--ub-surface", light: "white", dark: "gray-900", controls: "Cards and popups" },
  { token: "--ub-surface-glass", light: "surface at 90%", dark: "surface at 90%", controls: "Translucent overlays, pairs with blur" },
  { token: "--ub-overlay", light: "black 40%", dark: "black 60%", controls: "Dimming behind dialogs" },
  { token: "--ub-text-primary", light: "gray-950", dark: "gray-50", controls: "Headings and body text" },
  { token: "--ub-text-secondary", light: "gray-600", dark: "gray-400", controls: "Supporting text, labels" },
  { token: "--ub-text-tertiary", light: "gray-400", dark: "gray-500", controls: "Hints, captions, placeholders" },
  { token: "--ub-text-disabled", light: "gray-300", dark: "gray-700", controls: "Disabled text" },
  { token: "--ub-border", light: "gray-200", dark: "gray-800", controls: "Hairlines and dividers" },
  { token: "--ub-border-strong", light: "gray-300", dark: "gray-700", controls: "Inputs, select triggers, scrollbars" },
  { token: "--ub-accent", light: "gray-900", dark: "gray-50", controls: "Primary actions, checked states" },
  { token: "--ub-accent-hover", light: "gray-800", dark: "gray-200", controls: "Primary actions on hover" },
  { token: "--ub-accent-contrast", light: "white", dark: "gray-950", controls: "Text and icons on the accent" },
  { token: "--ub-ring", light: "gray-400", dark: "gray-500", controls: "Focus rings" },
  { token: "--ub-danger", light: "red-600", dark: "red-500", controls: "Destructive actions, invalid states" },
  { token: "--ub-danger-hover", light: "red-500", dark: "red-400", controls: "Destructive actions on hover" },
  { token: "--ub-danger-contrast", light: "white", dark: "white", controls: "Text on danger" },
  { token: "--ub-success", light: "green-600", dark: "green-500", controls: "Positive feedback" },
  { token: "--ub-warning", light: "orange-500", dark: "orange-400", controls: "Caution" },
  { token: "--ub-info", light: "blue-600", dark: "blue-400", controls: "Informational" },
  { token: "--ub-shadow-sm / md / lg", light: "soft", dark: "stronger", controls: "Elevation scale for overlays" },
  { token: "--ub-z-overlay", light: "1000", dark: "same", controls: "One layer for every floating part; raise above taller app chrome" },
  { token: "--ub-radius-xs to xl, full", light: "4 to 16px, 9999px", dark: "same", controls: "Container rounding steps" },
  { token: "--ub-radius-control", light: "8px (pill: full)", dark: "same", controls: "Every interactive element" },
  { token: "--ub-font-size / -compact", light: "16px / 14px", dark: "same", controls: "The two text sizes" },
  { token: "--ub-control-height / -compact", light: "36px / 28px", dark: "same", controls: "The two control heights" },
  { token: "--ub-icon-size-default / -compact", light: "16px / 14px", dark: "same", controls: "The two icon sizes" },
  { token: "--ub-duration-fast / base / slow", light: "120 / 180 / 280ms", dark: "same", controls: "All motion; zero under reduced motion" },
  { token: "--ub-ease-out / in-out / spring", light: "curves", dark: "same", controls: "Easings; spring for thumbs and pills" },
];

export const Route = createFileRoute("/theming")({
  head: () => ({ meta: [{ title: "Theming · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Theming" />
      <p className="lead">
        Every design decision in Bones is a CSS custom property prefixed{" "}
        <code>--ub-</code>. Components only ever read the semantic layer
        (<code>--ub-bg</code>, <code>--ub-accent</code>, ...), never raw
        palette steps, so a theme is a handful of overrides, not a fork.
        No provider, no config file; the switches are HTML attributes.
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
      <h2>Dark mode</h2>
      <p>
        Add <code>data-theme="dark"</code> to <code>&lt;html&gt;</code> or
        any subtree (a <code>.dark</code> class works too). There is no
        JavaScript involved; it's a CSS scope. To default to the system
        preference without a flash, run this before paint:
      </p>
      <CodeBlock
        code={`<script>{\`
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches))
      document.documentElement.setAttribute("data-theme", "dark");
  } catch (e) {}
\`}</script>`}
      />
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
      <h2>Prebuilt accent themes</h2>
      <p>
        Every color scale ships as a ready accent theme. One import recolors
        everything that means "primary action" in both modes:
      </p>
      <CodeBlock code={`import "@usebones/tokens/themes/blue.css";`} />
      <h2>Full themes</h2>
      <p>
        A full theme replaces every color role, not just the accent. It
        ships inert and activates with the same attribute that drives dark
        mode. matrix is a quirky one to try: green phosphor, sharp corners.
      </p>
      <CodeBlock
        code={`import "@usebones/tokens/themes/matrix.css";

<html data-theme="matrix">`}
      />
      <h2>Creating a theme</h2>
      <p>
        A theme is a plain CSS file imported after <code>index.css</code>.
        Accent theme: override the four action tokens in both modes (copy{" "}
        <code>themes/blue.css</code>). Full theme: scope every color role
        under your own <code>data-theme</code> value:
      </p>
      <CodeBlock
        lang="css"
        code={`[data-theme="my-theme"] {
  color-scheme: dark; /* or light: pick one, a full theme replaces both */

  /* backgrounds */
  --ub-bg: ...;
  --ub-bg-subtle: ...;
  --ub-bg-muted: ...;
  --ub-bg-muted-hover: ...;
  --ub-surface: ...;
  --ub-overlay: ...;

  /* text: primary, secondary, tertiary, disabled */
  /* borders: border, border-strong */
  /* interactive: accent, accent-hover, accent-contrast, ring */
  /* feedback: danger (+hover/contrast), success, warning, info */
  /* elevation: shadow-sm/md/lg */
  /* optional: the radius scale, like matrix does */
}`}
      />
      <p>
        The override reference below is the checklist. Keep primary text at
        4.5:1 contrast, leave danger red so destructive reads as
        destructive, and skip <code>--ub-surface-glass</code>; it derives
        from your surface automatically. A theme file works from anywhere;
        to ship one in <code>@usebones/tokens</code>, open a PR adding a
        file under <code>css/themes/</code>.
      </p>
      <MatrixSwitch />
      <h2>Styling component states</h2>
      <p>
        Below the token layer, every part has a stable class
        (<code>ub-button</code>, <code>ub-select-trigger</code>) and exposes
        state as data attributes (<code>data-checked</code>,{" "}
        <code>data-highlighted</code>, <code>data-invalid</code>). Each
        component page lists its hooks under "Styling states".
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-combobox-item[data-highlighted] {
  background: var(--ub-accent);
  color: var(--ub-accent-contrast);
}`}
      />
      <h2>Density is a token override</h2>
      <p>
        Because components read the size tokens for their default size,
        remapping them in a scope makes everything inside compact by
        default, no prop drilling:
      </p>
      <CodeBlock
        lang="css"
        code={`.dense-section {
  --ub-font-size: var(--ub-font-size-compact);
  --ub-control-height: var(--ub-control-height-compact);
  --ub-icon-size-default: var(--ub-icon-size-compact);
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
      <h2>Override reference</h2>
      <p>
        Everything a theme can change, in one place. Colors list their light
        and dark defaults; the rest apply to both modes.
      </p>
      <div className="props-table-wrap">
        <table className="props-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Light</th>
              <th>Dark</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {overrideReference.map((row) => (
              <tr key={row.token}>
                <td>
                  <code>{row.token}</code>
                </td>
                <td>{row.light}</td>
                <td>{row.dark}</td>
                <td>{row.controls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
