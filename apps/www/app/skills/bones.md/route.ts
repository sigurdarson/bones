import { bonesSkill } from "@/lib/bones-skill";

export const dynamic = "force-static";

/* The installable Bones skill, served raw so a curl can drop it straight
   into a repo's .claude/skills directory. */
export function GET() {
  return new Response(bonesSkill, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
