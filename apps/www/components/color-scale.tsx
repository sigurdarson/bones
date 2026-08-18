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
