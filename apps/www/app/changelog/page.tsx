import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import * as React from "react";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Changelog" };

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
  entries: string[];
}

/* CHANGELOG.md has a fixed shape (see the release skill), so a tiny parser
   beats a markdown dependency: h2 sections with wrapped list items. */
function parseChangelog(raw: string): { intro: string; sections: Section[] } {
  const lines = raw.split("\n");
  const sections: Section[] = [];
  const introParts: string[] = [];
  let current: Section | null = null;

  for (const line of lines) {
    if (line.startsWith("# ")) continue;
    if (line.startsWith("## ")) {
      current = { heading: line.slice(3).trim(), entries: [] };
      sections.push(current);
    } else if (line.startsWith("- ")) {
      current?.entries.push(line.slice(2).trim());
    } else if (line.startsWith("  ") && current && current.entries.length > 0) {
      current.entries[current.entries.length - 1] += " " + line.trim();
    } else if (!current && line.trim() !== "") {
      introParts.push(line.trim());
    }
  }

  return { intro: introParts.join(" "), sections };
}

export default function Page() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "..", "..", "CHANGELOG.md"),
    "utf8",
  );
  const { intro, sections } = parseChangelog(raw);

  return (
    <>
      <PageHeader title="Changelog" />
      <p className="lead">{inline(intro)}</p>
      {sections.map((section) =>
        section.entries.length === 0 ? null : (
          <React.Fragment key={section.heading}>
            <h2>{section.heading}</h2>
            <ul>
              {section.entries.map((entry, i) => (
                <li key={i}>{inline(entry)}</li>
              ))}
            </ul>
          </React.Fragment>
        ),
      )}
    </>
  );
}
