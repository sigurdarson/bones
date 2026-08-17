import { TabsList, TabsPanel, TabsRoot, TabsTab } from "@usebones/react";
import { CodeBlock } from "./code-block";

const managers = [
  { name: "pnpm", verb: "add" },
  { name: "npm", verb: "install" },
  { name: "yarn", verb: "add" },
  { name: "bun", verb: "add" },
];

/* An install command with one tab per package manager. */
export function InstallTabs({ pkg }: { pkg: string }) {
  return (
    <TabsRoot defaultValue="pnpm" size="compact" className="install-tabs">
      <TabsList className="install-tabs-header">
        {managers.map((m) => (
          <TabsTab key={m.name} value={m.name}>
            {m.name}
          </TabsTab>
        ))}
      </TabsList>
      {managers.map((m) => (
        <TabsPanel key={m.name} value={m.name} className="install-tabs-panel">
          <CodeBlock lang="sh" code={`${m.name} ${m.verb} ${pkg}`} />
        </TabsPanel>
      ))}
    </TabsRoot>
  );
}
