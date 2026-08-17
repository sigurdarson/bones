const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const scaleNames = [
  "gray",
  "red",
  "orange",
  "green",
  "teal",
  "blue",
  "violet",
  "fuchsia",
  "rose",
];

export function ColorScales() {
  return (
    <div className="color-scales">
      {scaleNames.map((name) => (
        <div key={name} className="color-scale-row">
          <span className="color-scale-name">{name}</span>
          <div className="color-scale">
            {steps.map((step) => (
              <div key={step} className="color-step">
                <div
                  className="color-chip"
                  style={{ background: `var(--ub-${name}-${step})` }}
                  title={`--ub-${name}-${step}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="color-scale-row">
        <span className="color-scale-name" aria-hidden />
        <div className="color-scale color-scale-labels">
          {steps.map((step) => (
            <div key={step} className="color-step">
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const semanticTokens = [
  { name: "--ub-bg", note: "page background" },
  { name: "--ub-bg-subtle", note: "wells, code blocks" },
  { name: "--ub-bg-muted", note: "hovers, inline code" },
  { name: "--ub-surface", note: "cards, panels" },
  { name: "--ub-text-primary", note: "headings, body" },
  { name: "--ub-text-secondary", note: "supporting text" },
  { name: "--ub-text-tertiary", note: "hints, captions" },
  { name: "--ub-border", note: "hairlines" },
  { name: "--ub-border-strong", note: "inputs, scrollbars" },
  { name: "--ub-accent", note: "primary actions" },
  { name: "--ub-ring", note: "focus rings" },
  { name: "--ub-danger", note: "destructive actions" },
  { name: "--ub-success", note: "positive feedback" },
  { name: "--ub-warning", note: "caution" },
  { name: "--ub-info", note: "informational" },
];

export function SemanticSwatches() {
  return (
    <div className="semantic-swatches">
      {semanticTokens.map((token) => (
        <div key={token.name} className="semantic-swatch">
          <div className="color-chip" style={{ background: `var(${token.name})` }} />
          <code>{token.name}</code>
          <span>{token.note}</span>
        </div>
      ))}
    </div>
  );
}
