export default function DocsPage() {
  return (
    <main style={{ maxWidth: "40rem", margin: "0 auto", padding: "6rem 1.5rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>Docs</h1>
      <p style={{ color: "var(--ub-text-secondary)", lineHeight: 1.6 }}>
        Documentation lives here. The plan: MDX-driven pages with live component
        previews and a persistent theme panel (mode, radius, icon set) so the
        docs double as a configurator.
      </p>
    </main>
  );
}
