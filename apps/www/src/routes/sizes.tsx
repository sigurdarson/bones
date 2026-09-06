import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Switch, TabsList, TabsRoot, TabsTab } from "@usebones/react";
import { CodeBlock } from "@/components/code-block";
import { Preview } from "@/components/preview";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/sizes")({
  head: () => ({
    meta: [
      { title: "Sizes · Bones" },
      { name: "description", content: "The two-size system: default and compact, driven by three tokens." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Sizes" />
      <p className="lead">
        Everything in Bones comes in exactly two sizes: default and compact.
        No sm, md, lg, xl scale to memorize, and nothing to configure. One
        prop covers text, control height, and icons together.
      </p>
      <h2>The whole system</h2>
      <div className="props-table-wrap">
        <table className="props-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Default</th>
              <th>Compact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--ub-font-size / -compact</code>
              </td>
              <td>16px</td>
              <td>14px</td>
            </tr>
            <tr>
              <td>
                <code>--ub-control-height / -compact</code>
              </td>
              <td>36px</td>
              <td>28px</td>
            </tr>
            <tr>
              <td>
                <code>--ub-icon-size-default / -compact</code>
              </td>
              <td>16px</td>
              <td>14px</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The three move together on purpose: 16px icons match 16px text,
        14px icons match 14px text. Set{" "}
        <code>size="compact"</code> on a component and everything inside it,
        icons included, resizes as one.
      </p>
      <Preview>
        <Button>Default</Button>
        <Button size="compact">Compact</Button>
      </Preview>
      <CodeBlock
        code={`<Button>Default</Button>
<Button size="compact">Compact</Button>`}
      />
      <h2>Sizes nest cleanly</h2>
      <p>
        Size is resolved per component, not inherited from the page. A
        default-size component inside a compact one (or the reverse) keeps
        its own size, so dense toolbars and roomy forms can mix freely. The <code>size</code> prop never cascades; to change the default for a
        whole region, remap the tokens instead (see{" "}
        <Link to="/theming">Theming</Link>).
      </p>
      <Preview>
        <TabsRoot defaultValue="one" size="compact">
          <TabsList>
            <TabsTab value="one">Compact tabs</TabsTab>
            <TabsTab value="two">In a toolbar</TabsTab>
          </TabsList>
        </TabsRoot>
        <Button>Default button</Button>
        <Switch defaultChecked />
      </Preview>
      <h2>Easy to retune</h2>
      <p>
        The sizes are tokens, so adjusting the whole library is one override,
        not a refactor. Want denser compact controls everywhere? Change one
        line:
      </p>
      <CodeBlock
        lang="css"
        code={`:root {
  --ub-control-height-compact: 1.625rem; /* 26px instead of 28px */
}`}
      />
      <p>
        Components read the tokens; they never hardcode a height, font size,
        or icon size. That's the deal across all of Bones: understand one
        token, and you understand it everywhere it appears.
      </p>
    </>
  );
}
