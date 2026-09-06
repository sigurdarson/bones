import { createFileRoute } from "@tanstack/react-router";
import { bonesSkill } from "@/lib/bones-skill";

/* The installable Bones skill, served raw so a curl can drop it straight
   into a repo's .claude/skills directory. */
export const Route = createFileRoute("/skills/bones.md")({
  server: {
    handlers: {
      GET: () =>
        new Response(bonesSkill, {
          headers: { "Content-Type": "text/markdown; charset=utf-8" },
        }),
    },
  },
});
