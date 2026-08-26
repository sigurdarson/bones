import { useHighlighted } from "@/lib/use-highlighted";

export interface CodeBlockProps {
  code: string;
  lang?: string;
}

/* Highlights in the browser through the shared lazy shiki hook; the plain
   string renders in the same chrome until colors arrive. */
export function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = useHighlighted(code.trim(), lang);

  if (html) {
    return (
      <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
  return (
    <div className="code-block">
      <pre>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
