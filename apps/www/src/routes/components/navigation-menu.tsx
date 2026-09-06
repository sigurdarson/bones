import { createFileRoute, Link } from "@tanstack/react-router";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@usebones/react";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { NavigationMenuPlayground } from "@/components/navigation-menu-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";
import { Showcase } from "@/components/showcase";

const exampleDescription: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "var(--ub-text-secondary)",
};

const audiences = [
  {
    value: "startups",
    title: "Startups",
    tagline: "Ship fast, measure faster.",
    heading: "Find product-market fit sooner",
    body: "Activation and retention tracked from day one, no data team required.",
    links: [
      { title: "Startup program", description: "Free for your first year." },
      {
        title: "Case studies",
        description: "How early teams put it to work.",
      },
    ],
  },
  {
    value: "agencies",
    title: "Agencies",
    tagline: "Every client, one login.",
    heading: "Report across every client",
    body: "A workspace per client and shared templates for the whole team.",
    links: [
      {
        title: "Client workspaces",
        description: "Isolate data, share dashboards.",
      },
      { title: "White-label reports", description: "Your logo on every export." },
    ],
  },
  {
    value: "enterprise",
    title: "Enterprise",
    tagline: "Security and scale.",
    heading: "Built for large teams",
    body: "SSO, audit logs, and regional data residency on every plan.",
    links: [
      { title: "Security", description: "SOC 2, SSO, and audit logs." },
      { title: "Contact sales", description: "Custom plans and onboarding." },
    ],
  },
  {
    value: "developers",
    title: "Developers",
    tagline: "API first, SDKs included.",
    heading: "Instrument an app in an afternoon",
    body: "Typed SDKs for web, mobile, and server, plus a plain HTTP API.",
    links: [
      { title: "API reference", description: "Every endpoint, with examples." },
      { title: "SDKs", description: "Web, iOS, Android, and Node." },
    ],
  },
];

function PanelLink({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <NavigationMenuLink>
      {title}
      <span style={exampleDescription}>{description}</span>
    </NavigationMenuLink>
  );
}

export const Route = createFileRoute("/components/navigation-menu")({
  head: () => ({ meta: [{ title: "Navigation menu · Bones" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Navigation menu" />
      <p className="lead">
        Site navigation with rich dropdowns, wrapping the Base UI
        Navigation Menu. One shared popup morphs between the open item's
        content instead of popping a new one per item, and it's built for
        links: app actions belong in the{" "}
        <Link to="/components/menu">Menu</Link>.
      </p>
      <h2>Playground</h2>
      <p>
        Every control maps to a prop. Hover between the items and watch
        the popup resize; the Code tab always shows the markup for exactly
        what you've configured.
      </p>
      <NavigationMenuPlayground />
      <h2>Nested submenus</h2>
      <p>
        Open Product, then hover Integrations: a row with a chevron opens a
        second panel beside the first. That's a{" "}
        <code>NavigationMenuRoot</code> nested inside a{" "}
        <code>NavigationMenuContent</code>; its trigger reads as a row, and
        its content opens in a flyout with <code>side="inline-end"</code>.
      </p>
      <Showcase
        code={`<NavigationMenuContent>
  <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
  <NavigationMenuLink href="/automations">Automations</NavigationMenuLink>
  {/* a nested menu, opening beside the panel */}
  <NavigationMenuRoot side="inline-end" align="start">
    <NavigationMenuList style={{ display: "block" }}>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Integrations</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/integrations/slack">Slack</NavigationMenuLink>
          <NavigationMenuLink href="/integrations/github">GitHub</NavigationMenuLink>
          <NavigationMenuLink href="/integrations/webhooks">Webhooks</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</NavigationMenuContent>`}
        note={
          <>
            The nested list needs <code>display: block</code> so the row
            fills the panel column, and the flyout gets its own{" "}
            <code>side</code> and <code>align</code>: without them it would
            open below the row like a top-level item.
          </>
        }
      >
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.25rem",
                    width: "27rem",
                  }}
                >
                  <PanelLink
                    title="Analytics"
                    description="Dashboards, funnels, and retention."
                  />
                  <PanelLink
                    title="Automations"
                    description="Trigger actions from any event."
                  />
                  <PanelLink
                    title="Security"
                    description="SSO, audit logs, and data residency."
                  />
                  <NavigationMenuRoot side="inline-end" align="start">
                    <NavigationMenuList style={{ display: "block" }}>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <span>
                            Integrations
                            <span style={exampleDescription}>
                              Connect the tools you already use.
                            </span>
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "17rem",
                            }}
                          >
                            <PanelLink
                              title="Slack"
                              description="Alerts and daily digests in any channel."
                            />
                            <PanelLink
                              title="GitHub"
                              description="Link every deploy to what changed."
                            />
                            <PanelLink
                              title="Webhooks"
                              description="Push events to your own systems."
                            />
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenuRoot>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuRoot>
      </Showcase>
      <h2>Nested inline submenus</h2>
      <p>
        Open Solutions: a list of audiences sits on the left and the chosen
        one's details on the right, swapping in place as you move down the
        list, with no second popup. That's a nested root with{" "}
        <code>inline</code> plus a <code>NavigationMenuViewport</code>{" "}
        beside its list and a <code>defaultValue</code>, so the selected
        item's content renders there instead of a flyout.
      </p>
      <Showcase
        code={`<NavigationMenuContent>
  <NavigationMenuRoot
    inline
    orientation="vertical"
    defaultValue="startups"
    style={{ display: "flex", gap: "0.75rem" }}
  >
    <NavigationMenuList style={{ flexDirection: "column", alignItems: "stretch" }}>
      <NavigationMenuItem value="startups">
        <NavigationMenuTrigger>Startups</NavigationMenuTrigger>
        <NavigationMenuContent>{/* heading, blurb, links */}</NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="agencies">
        <NavigationMenuTrigger>Agencies</NavigationMenuTrigger>
        <NavigationMenuContent>{/* heading, blurb, links */}</NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport style={{ width: "17rem" }} />
  </NavigationMenuRoot>
</NavigationMenuContent>`}
        note={
          <>
            <code>orientation="vertical"</code> makes the up and down arrows
            walk the list, and <code>defaultValue</code> keeps the viewport
            from opening empty. Without a default, the right column is
            blank until the first hover.
          </>
        }
      >
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuRoot
                  inline
                  orientation="vertical"
                  defaultValue="startups"
                  style={{ display: "flex", gap: "0.75rem" }}
                >
                  <NavigationMenuList
                    style={{
                      flexDirection: "column",
                      alignItems: "stretch",
                      width: "12rem",
                    }}
                  >
                    {audiences.map((audience) => (
                      <NavigationMenuItem
                        key={audience.value}
                        value={audience.value}
                      >
                        <NavigationMenuTrigger>
                          <span>
                            {audience.title}
                            <span style={exampleDescription}>
                              {audience.tagline}
                            </span>
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div style={{ width: "18rem" }}>
                            {/* Same inset as the link rows, so the
                                heading and body text share their left
                                edge and vertical rhythm. */}
                            <div style={{ padding: "0.5rem 0.75rem" }}>
                              <strong style={{ fontSize: "0.875rem" }}>
                                {audience.heading}
                              </strong>
                              <p
                                style={{
                                  margin: "0.25rem 0 0",
                                  fontSize: "0.8125rem",
                                  color: "var(--ub-text-secondary)",
                                }}
                              >
                                {audience.body}
                              </p>
                            </div>
                            {audience.links.map((link) => (
                              <PanelLink
                                key={link.title}
                                title={link.title}
                                description={link.description}
                              />
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                  <NavigationMenuViewport style={{ width: "19.5rem" }} />
                </NavigationMenuRoot>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuRoot>
      </Showcase>
      <h2>States</h2>
      <p>
        Closed and open are live, so hover or click a trigger. While open,
        the trigger carries <code>data-popup-open</code> (the chevron flips
        on it) and the incoming content carries{" "}
        <code>data-activation-direction</code>, left or right depending on
        which neighbor was open before; an item that is only a link has no
        open state at all.
      </p>
      <Showcase
        code={`<NavigationMenuList>
  {/* a trigger item: opens content, carries data-popup-open while open */}
  <NavigationMenuItem>
    <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="/docs/quick-start">Quick start</NavigationMenuLink>
      <NavigationMenuLink href="/docs/api">API reference</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
  {/* a link item: no popup, no open state */}
  <NavigationMenuItem>
    <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
  </NavigationMenuItem>
</NavigationMenuList>`}
      >
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "13rem",
                  }}
                >
                  <PanelLink
                    title="Quick start"
                    description="Install and send your first event."
                  />
                  <PanelLink
                    title="API reference"
                    description="Every endpoint, with examples."
                  />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuRoot>
      </Showcase>
      <h2>Styling states</h2>
      <p>
        Triggers carry <code>data-popup-open</code> (the built-in chevron
        flips on it); the popup's size animates to the measured{" "}
        <code>--popup-width</code>/<code>--popup-height</code>, and content
        slides by <code>data-activation-direction</code>:
      </p>
      <CodeBlock
        lang="css"
        code={`.ub-navigation-menu-popup {
  transition-duration: var(--ub-duration-slow);
}`}
      />
      <h2>Props</h2>
      <p>
        The root bundles the popup machinery, so the parts you write are
        the list and its items. The essentials:
      </p>
      <PropsTable
        rows={[
          {
            name: "NavigationMenuRoot.delay",
            type: "number",
            defaultValue: "50",
            description: "Milliseconds before opening on hover (closeDelay mirrors it).",
          },
          {
            name: "NavigationMenuRoot.orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
            description: "Vertical stacks the list and swaps the arrow keys.",
          },
          {
            name: "NavigationMenuRoot.side",
            type: "PositionerSide",
            description: "Which side of the trigger the popup opens on; nested menus usually want inline-end. Also align.",
          },
          {
            name: "NavigationMenuRoot.sideOffset",
            type: "number",
            defaultValue: "8",
            description: "Gap between the trigger and the popup, in pixels.",
          },
          {
            name: "NavigationMenuRoot.inline",
            type: "boolean",
            defaultValue: "false",
            description: "Renders children without the bundled popup; pair with a NavigationMenuViewport for same-panel submenus.",
          },
          {
            name: "NavigationMenuTrigger.children",
            type: "ReactNode",
            description: "The item's label; the chevron renders automatically.",
          },
          {
            name: "NavigationMenuLink.href",
            type: "string",
            description: "A real anchor; render={<Link />} plugs in a router.",
          },
        ]}
      />
      <AgentInstructions
        instructions={`NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport, from @usebones/react.
- Structure: NavigationMenuRoot wraps NavigationMenuList of NavigationMenuItems. An item holds a NavigationMenuTrigger (label as children; chevron automatic) + NavigationMenuContent, or just a NavigationMenuLink for a plain link.
- The popup machinery is bundled in the root; one shared popup morphs between the open item's content.
- Nested submenus: put another NavigationMenuRoot inside a NavigationMenuContent (side="inline-end" opens the flyout beside the panel). Same-panel submenus: nested root with inline plus a NavigationMenuViewport next to its list and a defaultValue.
- Links are real anchors: pass href, or render={<Link to="..." />} for a router. Fill content with NavigationMenuLinks in your own layout.
- For links only; app command surfaces use Menu.
- Restyle in CSS via .ub-navigation-menu-trigger, .ub-navigation-menu-link, .ub-navigation-menu-popup, [data-popup-open], [data-activation-direction]. Size morph runs on --popup-width/--popup-height; keep those transitions. Tokens only.`}
      />
    </>
  );
}
