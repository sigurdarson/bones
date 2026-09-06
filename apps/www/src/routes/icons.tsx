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
  "menu",
  "moon",
  "search",
  "sun",
  "underline",
  "user",
];

function Page() {
  return (
    <>
      <PageHeader title="Icons" badge="Experimental" />
      <p className="lead">
        Any icon works in Bones: every component takes icons as children, so
        your existing set drops straight in. <code>@usebones/icons</code>{" "}
        adds a typed vocabulary on top: semantic names that fail to compile
        when misspelled, size from the same tokens as every control, and
        swap sets in one place. The package is experimental: the vocabulary
        API may still change between releases while the interface tier
        settles what it needs from it.
      </p>
      <InstallTabs pkg="@usebones/icons" />
      <h2>Use an icon</h2>
      <p>
        Names are typed as <code>IconName</code>, so a typo fails at compile
        time, for people and coding agents alike. Icons render{" "}
        <code>aria-hidden</code>; the control around them carries the
        accessible name.
      </p>
      <CodeBlock
        code={`import { Icon } from "@usebones/icons";
import { Button } from "@usebones/react";

<Button iconOnly aria-label="Search">
  <Icon name="search" />
</Button>`}
      />
      <h2>Grow the vocabulary</h2>
      <p>
        Declare your glyphs once and their keys become names: fifty icons is
        fifty lines in one object plus a single type line, and only the
        glyphs you import ship. A registered name with no glyph renders
        nothing and warns once in development.
      </p>
      <CodeBlock
        code={`// icons.tsx
import { defineIcons, IconProvider, type IconNamesOf } from "@usebones/icons";
import { Rocket, ThumbsUp } from "lucide-react";

export const icons = defineIcons({ rocket: Rocket, "thumbs-up": ThumbsUp });

declare module "@usebones/icons" {
  interface IconRegistry extends IconNamesOf<typeof icons> {}
}

<IconProvider icons={icons}>
  <App />
</IconProvider>

<Icon name="rocket" />`}
      />
      <h2>Swap the set</h2>
      <p>
        The same provider overrides built-in names, so pointing the app at
        a different set is one object at the root; anything you leave out
        keeps the default. The toggle in this site's sidebar is exactly
        that.
      </p>
      <CodeBlock
        code={`<IconProvider icons={{ search: MySearchGlyph, bell: MyBellGlyph }}>
  <App />
</IconProvider>`}
      />
      <h2>Built-in names</h2>
      <p>
        The names Bones-built UI may ask for, with Lucide defaults; when
        you swap sets, these are the glyphs to supply. Components hand-roll
        their own tiny structural glyphs (chevrons, checks), so nothing here
        is required by a component.
      </p>
      <ul className="icon-grid" aria-label="Built-in icons">
        {names.map((name) => (
          <li key={name}>
            <Icon name={name} />
            <code>{name}</code>
          </li>
        ))}
      </ul>
      <h2>Props</h2>
      <p>Everything an SVG accepts passes through, plus:</p>
      <PropsTable
        rows={[
          {
            name: "Icon.name",
            type: "IconName",
            description: "Which glyph to render; a built-in name or one you registered.",
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
            name: "defineIcons(icons)",
            type: "(icons) => icons",
            description: "Declares your glyphs once with their keys preserved as types; pass the result to IconProvider.",
          },
          {
            name: "IconNamesOf<typeof icons>",
            type: "type",
            description: "The registry entries for a defineIcons object; extend IconRegistry with it.",
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
