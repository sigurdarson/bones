import { LibraryControls } from "./library-controls";

/**
 * Playground controls for component pages, positioned into the right rail
 * by CSS (.controls-rail) and sticky while scrolling. Two panels: the
 * library-wide settings on top (rendered automatically so every component
 * page carries them), then the component-specific controls passed in as
 * children.
 */
export function Controls({ children }: { children: React.ReactNode }) {
  return (
    <div className="controls-rail">
      <div className="controls-stack">
        <aside className="controls" aria-label="Library settings">
          <div className="controls-title">Library</div>
          <LibraryControls />
        </aside>
        <aside className="controls" aria-label="Playground controls">
          <div className="controls-title">Controls</div>
          {children}
        </aside>
      </div>
    </div>
  );
}

export function ControlsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="controls-section">
      <div className="controls-section-title">{title}</div>
      {children}
    </div>
  );
}

/* Inline row: label left, a small control (like a Switch) right. */
export function ControlRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="control-row">
      <span>{label}</span>
      {children}
    </label>
  );
}

/* Stacked field: label above a full-width control (like segmented tabs). */
export function ControlField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="control-field">
      <span>{label}</span>
      {children}
    </div>
  );
}
