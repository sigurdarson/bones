import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Skills" };

export default function Page() {
  return (
    <>
      <PageHeader title="Skills" />
      <p className="lead">
        Bones is built for coding agents as much as for people. Skills are the
        written-down procedures that make an agent productive in a codebase
        that uses it.
      </p>
      <h2>What ships today</h2>
      <p>
        The repo carries its conventions in <code>CLAUDE.md</code> and two
        skills in <code>.claude/skills</code>:
      </p>
      <ul>
        <li>
          <strong>new-component</strong>: how to add a primitive correctly.
          Check Base UI first, wrap instead of reimplementing, token-driven
          CSS, data-attribute variants, register everywhere, changelog entry.
        </li>
        <li>
          <strong>release</strong>: lockstep versioning, bump recommendations,
          changelog cutting, and the publish handover.
        </li>
      </ul>
      <p>
        An agent working in the repo picks these up automatically. The point:
        conventions live where agents actually read them, not in a wiki
        nobody opens.
      </p>
      <h2>For your codebase</h2>
      <p>
        The library is written so agents succeed without special setup:
        exported and JSDoc'd prop interfaces, predictable file layout, class
        names that match component names, and states as data attributes. Add{" "}
        <a href="/llms.txt">llms.txt</a> to your agent's context for a compact
        summary:
      </p>
      <CodeBlock lang="sh" code={`curl -s https://usebones.com/llms.txt`} />
      <h2>Planned</h2>
      <p>
        Installable skills alongside the packages, so an agent in your repo
        knows Bones conventions the moment you add the dependency: how to
        theme, which tokens to reach for, and how to compose components
        without reading the whole docs site.
      </p>
    </>
  );
}
