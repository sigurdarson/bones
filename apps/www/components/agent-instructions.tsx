import { CodeBlock } from "./code-block";

/**
 * The last section of every component page: a terse, paste-ready context
 * block for coding agents. llms.txt carries the whole-library version.
 */
export function AgentInstructions({ instructions }: { instructions: string }) {
  return (
    <>
      <h2>Agent instructions</h2>
      <p>
        Working with a coding agent? Paste this into its context, or point
        it at <a href="/llms.txt">llms.txt</a> for the whole library.
      </p>
      <CodeBlock lang="markdown" code={instructions} />
    </>
  );
}
