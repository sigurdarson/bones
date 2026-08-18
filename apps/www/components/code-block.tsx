import { codeToHtml } from "shiki";

export interface CodeBlockProps {
  code: string;
  lang?: string;
}

/* Server component. Highlights once at build time, in both themes; the
   active theme is chosen by CSS (see .code-block rules in globals.css). */
export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  return <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />;
}
