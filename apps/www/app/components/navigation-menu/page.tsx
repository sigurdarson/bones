import type { Metadata } from "next";
import Link from "next/link";
import { AgentInstructions } from "@/components/agent-instructions";
import { CodeBlock } from "@/components/code-block";
import { NavigationMenuPlayground } from "@/components/navigation-menu-playground";
import { PageHeader } from "@/components/page-header";
import { PropsTable } from "@/components/props-table";

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
        instructions={`NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, from @usebones/react.
- Structure: NavigationMenuRoot wraps NavigationMenuList of NavigationMenuItems. An item holds a NavigationMenuTrigger (label as children; chevron automatic) + NavigationMenuContent, or just a NavigationMenuLink for a plain link.
- The popup machinery is bundled in the root; one shared popup morphs between the open item's content.
- Links are real anchors: pass href, or render={<Link href="..." />} for a router. Fill content with NavigationMenuLinks in your own layout.
- For links only; app command surfaces use Menu.
- Restyle in CSS via .ub-navigation-menu-trigger, .ub-navigation-menu-link, .ub-navigation-menu-popup, [data-popup-open], [data-activation-direction]. Size morph runs on --popup-width/--popup-height; keep those transitions. Tokens only.`}
      />
    </>
  );
}
