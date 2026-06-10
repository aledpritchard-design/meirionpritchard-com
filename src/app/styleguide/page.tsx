import Link from "next/link";

export default function StyleguidePage() {
  const colours = [
    { label: "--ink", value: "#000000", note: "lines, type, dark fill" },
    { label: "--paper", value: "#ffffff", note: "base background, row fill" },
    { label: "--hover-ink", value: "#b24d66", note: "hover/active text + divider" },
    { label: "--hover-red", value: "#eb5757", note: "hover text in image mode" },
    { label: "--dot-grey", value: "#ebebeb", note: "vacated sort-slot dot field" },
    { label: "--hover-fill", value: "rgba(255,255,255,0.9)", note: "hovered/active row (light)" },
    { label: "--hover-fill-dark", value: "rgba(0,0,0,0.9)", note: "hovered/active row (dark)" },
    { label: "--ramp-start", value: "#b24d66", note: "solid-mode hue ramp start (345°)" },
    { label: "--ramp-end", value: "#58d1e6", note: "solid-mode hue ramp end (189°)" },
  ];
  const spacing = [
    { label: "--pad-outer", value: "32px / 16px mobile" },
    { label: "--nav-pad", value: "32px" },
    { label: "--row-pad-x", value: "15px" },
    { label: "--row-pad-y", value: "10px / 6px mobile" },
    { label: "--row-gap", value: "25px / 12px mobile" },
    { label: "--divider-h", value: "80px / 60px tablet / 30px mobile" },
    { label: "--block-pad", value: "20px / 12px mobile" },
    { label: "--block-pad-x", value: "18px / 12px mobile" },
  ];
  const typeTokens = [
    { label: "--fs-hero", desc: "75px / 55px mobile" },
    { label: "--fs-nav", desc: "25px / 18px mobile" },
    { label: "--fs-row", desc: "75px / 45px tablet / 18px mobile" },
    { label: "--fs-block-lg", desc: "75px / 45px tablet / 20px mobile" },
    { label: "--fs-block-sm", desc: "25px / 16px mobile" },
  ];
  const motion = [
    { label: "--anim-dur", value: "600ms", note: "hover backdrop fades" },
    { label: "--panel-dur", value: "1200ms", note: "accordion open" },
    { label: "--panel-close-dur", value: "600ms", note: "accordion close (faster)" },
    { label: "--flip-dur", value: "600ms", note: "row reorder (FLIP)" },
    { label: "--fade-dur", value: "900ms", note: "scroll fade-in" },
    { label: "--anim-ease", value: "ease-out", note: "shared easing" },
  ];

  const th: React.CSSProperties = { textAlign: "left", paddingRight: "2rem", paddingBottom: "0.5rem" };
  const td: React.CSSProperties = { paddingRight: "2rem", paddingBottom: "0.5rem", verticalAlign: "top" };

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
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Token reference — A1-10</h1>
      <p style={{ opacity: 0.6, fontSize: "0.8rem", marginBottom: "2rem" }}>
        Sourced from <code>/reference/tokens.css</code>. Every token in the sheet.
      </p>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Colour</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
          {colours.map(({ label, value, note }) => (
            <div key={label} style={{ width: 140 }}>
              <div
                style={{
                  width: "100%",
                  height: 60,
                  background: `var(${label})`,
                  border: "1px solid #ccc",
                  backgroundImage:
                    "linear-gradient(45deg,#eee 25%,transparent 25%),linear-gradient(-45deg,#eee 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee 75%),linear-gradient(-45deg,transparent 75%,#eee 75%)",
                  backgroundSize: "12px 12px",
                  backgroundPosition: "0 0,0 6px,6px -6px,-6px 0",
                }}
              >
                <div style={{ width: "100%", height: "100%", background: `var(${label})` }} />
              </div>
              <code style={{ fontSize: "0.7rem", display: "block", marginTop: 4 }}>{label}</code>
              <code style={{ fontSize: "0.65rem", opacity: 0.6, display: "block" }}>{value}</code>
              <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>{note}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <code style={{ fontSize: "0.7rem", opacity: 0.6 }}>
            solid-mode ramp (--ramp-start → --ramp-end)
          </code>
          <div
            style={{
              height: 24,
              marginTop: 4,
              maxWidth: 480,
              border: "1px solid #ccc",
              background: "linear-gradient(90deg, var(--ramp-start), var(--ramp-end))",
            }}
          />
        </div>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Typography scale</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Sizes</th>
              <th style={{ ...th, paddingRight: 0 }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {typeTokens.map(({ label, desc }) => (
              <tr key={label}>
                <td style={td}><code>{label}</code></td>
                <td style={{ ...td, opacity: 0.6, fontSize: "0.75rem" }}>{desc}</td>
                <td style={{ ...td, paddingRight: 0, paddingBottom: "1rem" }}>
                  <span style={{ fontSize: `var(${label})`, lineHeight: 1 }}>Aa</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Spacing &amp; layout</h2>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={{ ...th, paddingRight: 0 }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {spacing.map(({ label, value }) => (
              <tr key={label}>
                <td style={td}><code>{label}</code></td>
                <td style={{ ...td, paddingRight: 0, opacity: 0.7 }}><code>{value}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Motion</h2>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Value</th>
              <th style={{ ...th, paddingRight: 0 }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {motion.map(({ label, value, note }) => (
              <tr key={label}>
                <td style={td}><code>{label}</code></td>
                <td style={{ ...td, opacity: 0.7 }}><code>{value}</code></td>
                <td style={{ ...td, paddingRight: 0, opacity: 0.5, fontSize: "0.75rem" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p style={{ opacity: 0.6, fontSize: "0.875rem" }}>
        <Link href="/">← Frame preview (home)</Link>
        {" · "}
        Retire this route when Storybook is set up.
      </p>
    </div>
  );
}
