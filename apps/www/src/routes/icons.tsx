import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon, type IconName } from "@usebones/icons";
import { CodeBlock } from "@/components/code-block";
import { InstallTabs } from "@/components/install-tabs";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

export const Route = createFileRoute("/icons")({
  head: () => ({
    meta: [
      { title: "Icons · Bones" },
      {
        name: "description",
        content: "Semantic icon names with a swappable set, sized by the same tokens as everything else.",
      },
    ],
  }),
  component: Page,
});

const names: IconName[] = [
  "align-left",
  "align-center",
  "align-right",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "bell",
  "bold",
  "check",
  "chevron-down",
  "chevron-right",
  "close",
  "copy",
  "credit-card",
  "info",
  "italic",
  "loader",
  "moon",
  "search",
  "sun",
  "underline",
  "user",
];

function Page() {
  return (
    <>
      <PageHeader title="Icons" />
      <p className="lead">
        Icons are a typed vocabulary of semantic names, not a vendor.{" "}
        <code>@usebones/icons</code> maps each name to a glyph (Lucide by
        default), sizes it from the same tokens as every control, and lets
        an app grow the vocabulary and swap sets in one place. Bones
        components also take any icon component as children, so nothing
        forces the adapter on you.
      </p>
      <InstallTabs pkg="@usebones/icons" />
      <h2>Use an icon</h2>
      <p>
        Names are typed as <code>IconName</code>, so a typo fails at compile
        time. Icons render <code>aria-hidden</code>; the control around
        them carries the accessible name.
      </p>
      <CodeBlock
        code={`import { Icon } from "@usebones/icons";
import { Button } from "@usebones/react";

<Button iconOnly aria-label="Search">
  <Icon name="search" />
</Button>`}
      />
      <h2>The set</h2>
      <p>
        The built-in names. Components hand-roll their own tiny structural
        glyphs (chevrons, checks); this vocabulary is for your UI and for
        Bones-built UI that should follow your set.
      </p>
      <ul className="icon-grid" aria-label="Available icons">
        {names.map((name) => (
          <li key={name}>
            <Icon name={name} />
            <code>{name}</code>
          </li>
        ))}
      </ul>
      <h2>Add your own names</h2>
      <p>
        A misspelled or invented name fails to compile, for people and
        coding agents alike, so grow the vocabulary on purpose: augment the
        registry in a declaration file your tsconfig includes, then supply
        the glyph. A registered name with no glyph renders nothing and
        warns once in development.
      </p>
      <CodeBlock
        lang="ts"
        code={`// icons.d.ts
declare module "@usebones/icons" {
  interface IconRegistry {
    rocket: true;
    "thumbs-up": true;
  }
}`}
      />
      <CodeBlock
        code={`<IconProvider icons={{ rocket: RocketGlyph, "thumbs-up": ThumbsUpGlyph }}>
  <App />
</IconProvider>

<Icon name="rocket" />`}
      />
      <h2>Swap the set</h2>
      <p>
        Wrap the app in <code>IconProvider</code> with a partial map from
        name to component; anything you leave out keeps the default. The
        toggle in this site's sidebar is exactly that.
      </p>
      <CodeBlock
        code={`import { IconProvider } from "@usebones/icons";

<IconProvider icons={{ search: MySearchGlyph, bell: MyBellGlyph }}>
  <App />
</IconProvider>`}
      />
      <h2>Props</h2>
      <p>Everything an SVG accepts passes through, plus:</p>
      <PropsTable
        rows={[
          {
            name: "Icon.name",
            type: "IconName",
            description: "Which glyph to render; the union above.",
          },
          {
            name: "Icon.size",
            type: "number",
            description: "Pins an exact pixel size; by default the icon follows --ub-icon-size (16px, 14px in compact contexts).",
          },
          {
            name: "IconProvider.icons",
            type: "Partial<IconSet>",
            description: "Glyphs by name: overrides for built-in names and the glyphs for names you added; omitted names fall back to the default set.",
          },
          {
            name: "IconRegistry",
            type: "interface",
            description: "The vocabulary; augment it to add names.",
          },
        ]}
      />
      <p>
        Sizing follows the two-size system described in{" "}
        <Link to="/sizes">Sizes</Link>.
      </p>
    </>
  );
}
