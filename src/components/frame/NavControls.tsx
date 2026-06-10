/**
 * Persistent controls row beneath the hero, matching the prototype frame:
 * an (initially empty) sort-factor mount that the ordering nav fills (A1-22),
 * and the Mode / Image toggle cell (A1-21 hover modes).
 *
 * Frame scope (A1-10): static structure and layout only — no toggle, sort,
 * or drag behaviour. Class names mirror the prototype so the interaction
 * tickets can wire onto them.
 */
export function NavControls() {
  return (
    <>
      {/* sort factor cells — populated by the ordering nav (A1-22) */}
      <div className="sort-rows" />
      <div className="nav-row">
        <div className="nav-item">
          <span className="toggle">
            <span className="bullet mode-icon" />
            <span className="nav-label">Mode</span>
          </span>
          <span className="toggle">
            <span className="nav-label" style={{ textAlign: "right" }}>
              Image
            </span>
            <span className="bullet image-icon" />
          </span>
        </div>
      </div>
    </>
  );
}
