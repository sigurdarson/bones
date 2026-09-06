import * as React from "react";

/* Highlighting happens in the browser: shiki loads lazily in a separate
   chunk, and until it resolves (or if it fails) the plain string renders
   in the same chrome. Both themes are emitted; CSS picks the active one
   (see the .code-block rules in globals.css). */
export function useHighlighted(code: string, lang = "tsx"): string | null {
  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    import("shiki")
      .then(({ codeToHtml }) =>
        codeToHtml(code, {
          lang,
          themes: { light: "github-light", dark: "min-dark" },
          defaultColor: false,
        }),
      )
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return html;
}
