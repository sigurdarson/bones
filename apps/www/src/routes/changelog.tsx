import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import changelogRaw from "../../../../CHANGELOG.md?raw";

/* Renders inline `code` spans from changelog text. */
function inline(text: string): React.ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

interface Section {
  heading: string;
  /* Runs of list items; a blank line between items starts a new run. */
  groups: string[][];
  /* Plain paragraphs under the heading, kept in order before the lists. */
  notes: string[];
}

/* CHANGELOG.md has a fixed shape (h2 sections with wrapped list items), so
   a tiny parser beats a markdown dependency. Blank lines between items
   split a release into runs, indented sub-bullets fold into their parent,
   and stray prose lines under a heading render as paragraphs. */
function parseChangelog(raw: string): { intro: string; sections: Section[] } {
  const lines = raw.split("\n");
  const sections: Section[] = [];
  const introParts: string[] = [];
  let current: Section | null = null;
  let group: string[] | null = null;

  for (const line of lines) {
    if (line.startsWith("# ")) continue;
    if (line.startsWith("## ")) {
      current = { heading: line.slice(3).trim(), groups: [], notes: [] };
      sections.push(current);
      group = null;
    } else if (line.startsWith("- ")) {
      if (!current) continue;
      if (!group) {
        group = [];
        current.groups.push(group);
      }
      group.push(line.slice(2).trim());
    } else if (/^\s+- /.test(line) && group && group.length > 0) {
      group[group.length - 1] += "; " + line.replace(/^\s+- /, "").trim();
    } else if (line.startsWith("  ") && group && group.length > 0) {
      group[group.length - 1] += " " + line.trim();
    } else if (line.trim() === "") {
      group = null;
    } else if (!current) {
      introParts.push(line.trim());
    } else {
      current.notes.push(line.trim());
    }
  }

  return { intro: introParts.join(" "), sections };
}

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog · Bones" },
      { name: "description", content: "Every change to the Bones packages, release by release." },
    ],
  }),
  component: Page,
});

function Page() {
  const { intro, sections } = parseChangelog(changelogRaw);

  return (
    <>
      <PageHeader title="Changelog" />
      <p className="lead">{inline(intro)}</p>
      {sections.map((section) => (
        <React.Fragment key={section.heading}>
          <h2>{section.heading}</h2>
          {section.notes.map((note, i) => (
            <p key={i}>{inline(note)}</p>
          ))}
          {section.groups.length === 0 && section.notes.length === 0 ? (
            <p>Nothing yet.</p>
          ) : null}
          {section.groups.map((group, g) => (
            <ul key={g}>
              {group.map((entry, i) => (
                <li key={i}>{inline(entry)}</li>
              ))}
            </ul>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}
