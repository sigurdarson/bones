import { createFileRoute } from "@tanstack/react-router";
import { TabsList, TabsRoot, TabsTab } from "@usebones/react";
import { Icon } from "@usebones/icons";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";
import { TabsPlayground } from "@/components/tabs-playground";
import { AgentInstructions } from "@/components/agent-instructions";

export const Route = createFileRoute("/components/tabs")({
  head: () => ({ meta: [{ title: "Tabs · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Tabs" />
      <p className="lead">
        Switch between panels of content, wrapping the Base UI Tabs. The
        active background slides between tabs with a light spring.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. The Code tab always shows the markup
        for exactly what you've configured.
      </p>
      <TabsPlayground />
      <h2>Variants</h2>
      <p>
        Three flavors, one component: text, text with icons, and icon only.
        Icons are just children, so there's no separate API to learn.
      </p>
      <Showcase
        code={`<TabsList>
  <TabsTab value="overview">Overview</TabsTab>
</TabsList>

<TabsList>
  <TabsTab value="profile">
    <Icon name="user" />
    Profile
  </TabsTab>
</TabsList>

<TabsList>
  <TabsTab value="profile" iconOnly aria-label="Profile">
    <Icon name="user" />
  </TabsTab>
</TabsList>`}
      >
        <div className="showcase-stack">
          <TabsRoot defaultValue="overview">
            <TabsList>
              <TabsTab value="overview">Overview</TabsTab>
              <TabsTab value="activity">Activity</TabsTab>
              <TabsTab value="settings">Settings</TabsTab>
            </TabsList>
          </TabsRoot>
          <TabsRoot defaultValue="profile">
            <TabsList>
              <TabsTab value="profile">
                <Icon name="user" />
                Profile
              </TabsTab>
              <TabsTab value="notifications">
                <Icon name="bell" />
                Notifications
              </TabsTab>
              <TabsTab value="billing">
                <Icon name="credit-card" />
                Billing
              </TabsTab>
            </TabsList>
          </TabsRoot>
          <TabsRoot defaultValue="profile">
            <TabsList>
              <TabsTab value="profile" iconOnly aria-label="Profile">
                <Icon name="user" />
              </TabsTab>
              <TabsTab value="notifications" iconOnly aria-label="Notifications">
                <Icon name="bell" />
              </TabsTab>
              <TabsTab value="billing" iconOnly aria-label="Billing">
                <Icon name="credit-card" />
              </TabsTab>
            </TabsList>
          </TabsRoot>
        </div>
      </Showcase>
      <h2>States</h2>
      <p>
        Active, inactive, and disabled. Keyboard focus adds a ring on top of
        whichever state a tab is in.
      </p>
      <Showcase
        code={`<TabsRoot defaultValue="active">
  <TabsList>
    <TabsTab value="active">Active</TabsTab>
    <TabsTab value="inactive">Inactive</TabsTab>
    <TabsTab value="disabled" disabled>Disabled</TabsTab>
  </TabsList>
</TabsRoot>`}
      >
        <TabsRoot defaultValue="active">
          <TabsList>
            <TabsTab value="active">Active</TabsTab>
            <TabsTab value="inactive">Inactive</TabsTab>
            <TabsTab value="disabled" disabled>
              Disabled
            </TabsTab>
          </TabsList>
        </TabsRoot>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        The active tab carries <code>data-active</code>; the indicator
        position comes through Base UI's custom properties, so restyling
        never needs JavaScript:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-tabs-tab[data-active] {
  color: var(--ub-accent);
}`}
      />
      <h2>Props</h2>
      <p>
        Each part passes the full Base UI API through. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "TabsRoot.defaultValue",
            type: "any",
            description: "The tab selected on first render, when uncontrolled.",
          },
          {
            name: "TabsRoot.value",
            type: "any",
            description: "Controlled selection. Pair with onValueChange.",
          },
          {
            name: "TabsRoot.onValueChange",
            type: "(value) => void",
            description: "Called when the active tab changes.",
          },
          {
            name: "TabsRoot.size",
            type: '"default" | "compact"',
            defaultValue: '"default"',
            description: "Default is 36px tall tabs with 16px text; compact is 28px with 14px text.",
          },
          {
            name: "TabsTab.value",
            type: "any",
            description: "Identity of the tab; matches a Panel's value.",
          },
          {
            name: "TabsTab.iconOnly",
            type: "boolean",
            defaultValue: "false",
            description: "Square tab holding only an icon; pair with aria-label.",
          },
          {
            name: "TabsTab.disabled",
            type: "boolean",
            defaultValue: "false",
            description: "Blocks selecting this tab.",
          },
          {
            name: "TabsPanel.value",
            type: "any",
            description: "Shown while the matching Tab is active.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`TabsRoot, TabsList, TabsTab, TabsPanel, from @usebones/react.
- TabsRoot: defaultValue or value + onValueChange; size "default" | "compact".
- TabsList renders the sliding indicator automatically. Each TabsTab value matches a TabsPanel value.
- Icons are children via @usebones/icons; iconOnly makes a square tab and requires aria-label. disabled blocks a tab.
- Restyle in CSS via [data-active], [data-disabled]; the indicator is .ub-tabs-indicator. Tokens only.`}
      />
    </>
  );
}
