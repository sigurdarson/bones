"use client";

import * as React from "react";
import { TabsList, TabsPanel, TabsRoot, TabsTab } from "@usebones/react";

/* Playground code changes with the controls, so highlighting happens in the
   browser. Shiki loads lazily in a separate chunk; until it resolves (or if
   it fails), the plain string renders in the same chrome. */
function useHighlighted(code: string): string | null {
  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    import("shiki")
      .then(({ codeToHtml }) =>
        codeToHtml(code, {
          lang: "tsx",
          themes: { light: "github-light", dark: "github-dark" },
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
  }, [code]);

  return html;
}

/**
 * Component showcase with a Preview/Code header. The body animates its
 * height to fit the active panel (a ResizeObserver feeds a height
 * transition on the motion tokens, so reduced motion stays respected).
 * Code arrives as a plain string, usually generated from playground state.
 */
export interface ShowcaseProps {
  code: string;
  /* Short context shown as a footer under the code in the Code tab. */
  note?: React.ReactNode;
  children: React.ReactNode;
}

export function Showcase({ code, note, children }: ShowcaseProps) {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const codeHtml = useHighlighted(code);

  React.useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    setHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="showcase">
      <TabsRoot defaultValue="preview" size="compact">
        <TabsList className="showcase-header">
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsList>
        <div className="showcase-body" style={{ height }}>
          <div ref={innerRef}>
            <TabsPanel value="preview" className="showcase-panel">
              <div className="showcase-preview">{children}</div>
            </TabsPanel>
            <TabsPanel value="code" className="showcase-panel">
              {codeHtml ? (
                <div
                  className="showcase-code"
                  dangerouslySetInnerHTML={{ __html: codeHtml }}
                />
              ) : (
                <div className="showcase-code">
                  <pre>
                    <code>{code}</code>
                  </pre>
                </div>
              )}
              {note ? <p className="showcase-footer">{note}</p> : null}
            </TabsPanel>
          </div>
        </div>
      </TabsRoot>
    </div>
  );
}
