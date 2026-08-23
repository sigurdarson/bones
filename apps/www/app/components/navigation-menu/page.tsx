import type { Metadata } from "next";
import Link from "next/link";
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
    value: "developers",
    title: "Developers",
    tagline: "Go from idea to UI faster.",
    heading: "Ship real screens sooner",
    body: "Import the tokens once and every part arrives styled, accessible, and ready to compose.",
    links: [
      {
        title: "Quick start",
        description: "Install and assemble your first screen.",
      },
      {
        title: "Components",
        description: "Every primitive with a live playground.",
      },
    ],
  },
  {
    value: "design-teams",
    title: "Design teams",
    tagline: "Keep patterns aligned across teams.",
    heading: "One source of visual truth",
    body: "Semantic tokens keep color, radius, and motion consistent everywhere; change them once to retheme.",
    links: [
      { title: "Theming", description: "Tokens, attributes, and accents." },
      { title: "Sizes", description: "Two sizes, no drift." },
    ],
  },
  {
    value: "agents",
    title: "Agents",
    tagline: "Let coding agents ship UI.",
    heading: "Readable by machines on purpose",
    body: "Zero-guesswork conventions, agent instructions on every page, and llms.txt for context.",
    links: [
      { title: "Skills", description: "Teach your agent the workflow." },
      {
        title: "llms.txt",
        description: "The library, summarized for tools.",
      },
    ],
  },
  {
    value: "startups",
    title: "Startups",
    tagline: "Ship polished basics while things change.",
    heading: "Defaults you can outgrow",
    body: "Start with the stock look, then retheme with tokens when the brand lands; nothing to rewrite.",
    links: [
      { title: "Quick start", description: "Zero to a working page." },
      { title: "Changelog", description: "What's new in each release." },
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

export const metadata: Metadata = { title: "Navigation menu" };

export default function Page() {
  return (
    <>
      <PageHeader title="Navigation menu" />
      <p className="lead">
        Site navigation with rich dropdowns, wrapping the Base UI
        Navigation Menu. One shared popup morphs between the open item's
        content instead of popping a new one per item. For app actions,
        reach for the <Link href="/components/menu">Menu</Link>; this one
        is for links.
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
        A <code>NavigationMenuRoot</code> nested inside a{" "}
        <code>NavigationMenuContent</code> makes a multi-level menu: its
        trigger reads as a row, and its content opens in a flyout beside
        the panel (<code>side="inline-end"</code>).
      </p>
      <Showcase
        code={`<NavigationMenuContent>
  <NavigationMenuLink href="/quick-start">Quick start</NavigationMenuLink>
  <NavigationMenuLink href="/accessibility">Accessibility</NavigationMenuLink>
  {/* a nested menu, opening beside the panel */}
  <NavigationMenuRoot side="inline-end" align="start">
    <NavigationMenuList style={{ display: "block" }}>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Handbook</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/motion">Motion</NavigationMenuLink>
          <NavigationMenuLink href="/sizes">Sizes</NavigationMenuLink>
          <NavigationMenuLink href="/skills">Skills</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</NavigationMenuContent>`}
      >
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
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
                    title="Quick start"
                    description="Install and assemble your first component."
                  />
                  <PanelLink
                    title="Accessibility"
                    description="How every part stays keyboard operable."
                  />
                  <PanelLink
                    title="Changelog"
                    description="See what's new in the latest releases."
                  />
                  <NavigationMenuRoot side="inline-end" align="start">
                    <NavigationMenuList style={{ display: "block" }}>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <span>
                            Handbook
                            <span style={exampleDescription}>
                              How to use bones effectively.
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
                              title="Styling"
                              description="Plain CSS and semantic tokens; restyle anything without forking."
                            />
                            <PanelLink
                              title="Motion"
                              description="Duration and easing tokens; reduced motion comes free."
                            />
                            <PanelLink
                              title="Composition"
                              description="Swap any part for your own component with render."
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
        For second-level navigation that should stay in the same panel,
        give the nested root <code>inline</code> and render a{" "}
        <code>NavigationMenuViewport</code> beside its list with a{" "}
        <code>defaultValue</code>: the selected item's content shows there
        instead of a flyout.
      </p>
      <Showcase
        code={`<NavigationMenuContent>
  <NavigationMenuRoot
    inline
    orientation="vertical"
    defaultValue="theming"
    style={{ display: "flex", gap: "0.5rem" }}
  >
    <NavigationMenuList style={{ flexDirection: "column", alignItems: "stretch" }}>
      <NavigationMenuItem value="primitives">
        <NavigationMenuTrigger>Primitives</NavigationMenuTrigger>
        <NavigationMenuContent>{/* panel content */}</NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="theming">
        <NavigationMenuTrigger>Theming</NavigationMenuTrigger>
        <NavigationMenuContent>{/* panel content */}</NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport style={{ width: "17rem" }} />
  </NavigationMenuRoot>
</NavigationMenuContent>`}
      >
        <NavigationMenuRoot>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuRoot
                  inline
                  orientation="vertical"
                  defaultValue="developers"
                  style={{ display: "flex", gap: "0.5rem" }}
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
                            <strong style={{ fontSize: "0.875rem" }}>
                              {audience.heading}
                            </strong>
                            <p
                              style={{
                                margin: "0.25rem 0 0.5rem",
                                fontSize: "0.8125rem",
                                color: "var(--ub-text-secondary)",
                              }}
                            >
                              {audience.body}
                            </p>
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
- Links are real anchors: pass href, or render={<Link href="..." />} for a router. Fill content with NavigationMenuLinks in your own layout.
- For links only; app command surfaces use Menu.
- Restyle in CSS via .ub-navigation-menu-trigger, .ub-navigation-menu-link, .ub-navigation-menu-popup, [data-popup-open], [data-activation-direction]. Size morph runs on --popup-width/--popup-height; keep those transitions. Tokens only.`}
      />
    </>
  );
}
