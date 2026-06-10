export default function StyleguidePage() {
  const tokens = [
    { label: "--pad-outer", value: "32px" },
    { label: "--nav-pad", value: "32px" },
    { label: "--row-pad-x", value: "15px" },
    { label: "--row-pad-y", value: "10px" },
    { label: "--row-gap", value: "25px" },
    { label: "--divider-h", value: "80px" },
    { label: "--block-pad", value: "20px" },
    { label: "--block-pad-x", value: "18px" },
  ];
  const typeTokens = [
    { label: "--fs-hero", desc: "75px / 55px mobile" },
    { label: "--fs-nav", desc: "25px / 18px mobile" },
    { label: "--fs-row", desc: "75px / 45px tablet / 18px mobile" },
    { label: "--fs-block-lg", desc: "75px / 45px tablet / 20px mobile" },
    { label: "--fs-block-sm", desc: "25px / 16px mobile" },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "ui-monospace, monospace",
        background: "var(--paper)",
        color: "var(--ink)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Token reference — A1-10</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Colours</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                background: "var(--ink)",
                border: "1px solid #ccc",
              }}
            />
            <code style={{ fontSize: "0.75rem" }}>--ink #000</code>
          </div>
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                background: "var(--paper)",
                border: "1px solid #ccc",
              }}
            />
            <code style={{ fontSize: "0.75rem" }}>--paper #fff</code>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Typography scale</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingRight: "2rem", paddingBottom: "0.5rem" }}>Token</th>
              <th style={{ textAlign: "left", paddingRight: "2rem", paddingBottom: "0.5rem" }}>Sizes</th>
              <th style={{ textAlign: "left", paddingBottom: "0.5rem" }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {typeTokens.map(({ label, desc }) => (
              <tr key={label}>
                <td style={{ paddingRight: "2rem", paddingBottom: "1rem" }}>
                  <code>{label}</code>
                </td>
                <td style={{ paddingRight: "2rem", paddingBottom: "1rem", opacity: 0.6, fontSize: "0.75rem" }}>
                  {desc}
                </td>
                <td style={{ paddingBottom: "1rem" }}>
                  <span style={{ fontSize: `var(${label})`, lineHeight: 1 }}>Aa</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Spacing tokens</h2>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingRight: "2rem", paddingBottom: "0.5rem" }}>Token</th>
              <th style={{ textAlign: "left", paddingBottom: "0.5rem" }}>Default</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(({ label, value }) => (
              <tr key={label}>
                <td style={{ paddingRight: "2rem", paddingBottom: "0.25rem" }}>
                  <code>{label}</code>
                </td>
                <td style={{ paddingBottom: "0.25rem" }}>
                  <code>{value}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p style={{ opacity: 0.6, fontSize: "0.875rem" }}>
        <a href="/">← Frame preview (home)</a>
        {" · "}
        Retire this route when Storybook is set up.
      </p>
    </div>
  );
}
