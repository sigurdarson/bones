import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";
import { bonesSkill } from "@/lib/bones-skill";

export const metadata: Metadata = { title: "Skills" };

export default function Page() {
  return (
    <>
      <PageHeader title="Skills" />
      <p className="lead">
        Bones is built for coding agents as much as for people. A skill is a
        written-down procedure an agent picks up automatically; this one
        teaches yours how to build with Bones.
      </p>
      <h2>Install the skill</h2>
      <p>
        One file into your repo and any agent working there knows the
        composition patterns, the token layer, and the theming rules without
        reading the docs site:
      </p>
      <CodeBlock
        lang="sh"
        code={`curl -s https://usebones.com/skills/bones.md \\
  -o .claude/skills/bones/SKILL.md --create-dirs`}
      />
      <p>What it contains:</p>
      <CodeBlock lang="md" code={bonesSkill.trim()} />
      <h2>Lighter options</h2>
      <p>
        <a href="/llms.txt">llms.txt</a> is a compact API summary of the whole
        library for an agent's context, and every component page ends with
        agent instructions for exactly that component. The library itself is
        written to be agent-friendly either way: exported and JSDoc'd props,
        predictable file layout, class names matching component names, and
        states as data attributes.
      </p>
    </>
  );
}
