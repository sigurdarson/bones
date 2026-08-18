import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { InstallTabs } from "@/components/install-tabs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Quick start" };

export default function Page() {
  return (
    <>
      <PageHeader title="Quick start" />
      <p className="lead">
        Two packages: tokens (plain CSS) and components (React). Add the icon
        adapter if you need icons.
      </p>
      <InstallTabs pkg="@usebones/react @usebones/tokens" />
      <h2>Import styles once</h2>
      <p>
        Tokens first, then component styles. In a Next.js app this goes in the
        root layout; anywhere else, your top-level entry file.
      </p>
      <CodeBlock
        code={`import "@usebones/tokens/index.css";
import "@usebones/react/styles.css";`}
      />
      <p>
        Use the explicit <code>.css</code> paths. TypeScript 7 rejects
        extensionless side-effect imports of CSS.
      </p>
      <h2>Use components</h2>
      <CodeBlock
        code={`import { Button, Switch } from "@usebones/react";

export function Example() {
  return (
    <>
      <Button variant="secondary">Hello</Button>
      <Switch defaultChecked />
    </>
  );
}`}
      />
      <h2>Dark mode and radius</h2>
      <p>
        Both are attributes on <code>&lt;html&gt;</code> (or any subtree), no
        JavaScript required:
      </p>
      <CodeBlock lang="html" code={`<html class="dark" data-radius="pill">`} />
      <h2>Using Tailwind?</h2>
      <p>
        Import <code>@usebones/tokens/tailwind.css</code> instead of{" "}
        <code>index.css</code>. Same tokens, plus utilities like{" "}
        <code>bg-ub-accent</code> and <code>ease-ub-spring</code>. Tailwind is
        supported, never required.
      </p>
    </>
  );
}
