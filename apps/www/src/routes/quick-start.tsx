import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeBlock } from "@/components/code-block";
import { InstallTabs } from "@/components/install-tabs";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/quick-start")({
  head: () => ({
    meta: [
      { title: "Quick start · Bones" },
      { name: "description", content: "Install the Bones packages, import the styles once, and use your first components." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Quick start" />
      <p className="lead">
        Two packages: tokens (plain CSS) and components (React 19 or newer).
        Add the icon adapter, <code>@usebones/icons</code>, if you need icons.
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
        The component stylesheet includes box sizing for Bones parts, so
        an app-wide CSS reset is optional.
      </p>
      <p>
        Keep the <code>.css</code> on the end. TypeScript 7 rejects imports
        that exist only for their side effects unless the extension is
        spelled out.
      </p>
      <h2>Use components</h2>
      <CodeBlock
        code={`import { Button, Switch } from "@usebones/react";

export function Example() {
  return (
    <>
      <Button variant="secondary">Save draft</Button>
      <Switch defaultChecked aria-label="Enable notifications" />
    </>
  );
}`}
      />
      <h2>Server components</h2>
      <p>
        Interactive components are client components (they carry the
        directive themselves), so they drop straight into server-rendered
        apps: import the styles in the server root layout, and keep{" "}
        <code>ToastProvider</code> and other providers inside a client
        boundary.
      </p>
      <h2>Dark mode and radius</h2>
      <p>
        Both are attributes on <code>&lt;html&gt;</code> (or any subtree), no
        JavaScript required:
      </p>
      <CodeBlock lang="html" code={`<html data-theme="dark" data-radius="pill">`} />
      <h2>Using Tailwind v4?</h2>
      <p>
        Import <code>@usebones/tokens/tailwind.css</code> instead of{" "}
        <code>index.css</code>. Same tokens, plus utilities like{" "}
        <code>bg-ub-accent</code> and <code>ease-ub-spring</code>. The file uses{" "}
        <code>@theme inline</code>, so it needs v4; on v3, import{" "}
        <code>index.css</code> and reference the tokens directly. Tailwind is
        supported, never required.
      </p>
      <h2>Next</h2>
      <p>
        Make it yours in <Link to="/theming">Theming</Link>, read how the two
        sizes work in <Link to="/sizes">Sizes</Link>, or start with the{" "}
        <Link to="/components/button">Button</Link>.
      </p>
    </>
  );
}
