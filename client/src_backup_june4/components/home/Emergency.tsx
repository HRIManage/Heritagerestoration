export default function Emergency() {
  return (
    <section style={{ backgroundColor: "#ffffff", padding: "5.5rem 0" }}>
      <div className="page-container">
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p className="overline-label" style={{ marginBottom: "0.75rem" }}>
            Strategic Safety Alliance
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem,4vw,2.8rem)",
              fontWeight: 600,
              color: "#1a1a1a",
              lineHeight: 1.15,
              marginBottom: 0,
            }}
          >
            Partnered with 1-800-BOARD-UP for
            <br />
            <span style={{ color: "#7fd526" }}>Instant Property Security</span>
          </h2>
          <span
            className="green-divider"
            style={{ margin: "1.25rem auto 1.75rem" }}
          />
          <p
            style={{
              fontFamily: "Jost, sans-serif",
              color: "#555555",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Securing your building within the first few hours is the most
            critical step to prevent looting, secondary weather damage, and
            building code violations. We coordinate directly with 1-800-BOARD-UP
            of Southwest Washington.
          </p>

          {/* Advisory box */}
          <div
            style={{
              border: "1px solid rgba(127,213,38,0.35)",
              backgroundColor: "rgba(127,213,38,0.06)",
              padding: "1.5rem 2rem",
              marginBottom: "2.5rem",
              textAlign: "left",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              maxWidth: 640,
              margin: "0 auto 2.5rem",
            }}
          >
            <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: 2 }}>
              🛡️
            </span>
            <div>
              <p
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  fontSize: "0.9rem",
                  marginBottom: "0.35rem",
                }}
              >
                Strategic Guidance
              </p>
              <p
                style={{
                  fontFamily: "Jost, sans-serif",
                  color: "#666666",
                  fontSize: "0.85rem",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                Consult our safety coordinators{" "}
                <em
                  style={{
                    fontStyle: "normal",
                    color: "#333333",
                    fontWeight: 600,
                  }}
                >
                  before
                </em>{" "}
                authorizing secondary contractors — this prevents claim disputes
                and ensures building code compliance.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <a
              href="https://1-800boardup.com/store/1-800-boardup-of-southwest-washington/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#7fd526",
                color: "#1a1a1a",
                fontFamily: "Jost, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.04em",
                padding: "13px 24px",
                borderRadius: 4,
                textDecoration: "none",
                transition: "background 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#5fa81b";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#7fd526";
                (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
              }}
            >
              Request Property Security (1-800-BOARD-UP)
            </a>
            <a
              href="tel:3604561015"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "2px solid #7fd526",
                color: "#1a1a1a",
                fontFamily: "Jost, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: "0.04em",
                padding: "11px 24px",
                borderRadius: 4,
                textDecoration: "none",
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "#7fd526";
                el.style.color = "#1a1a1a";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.color = "#1a1a1a";
              }}
            >
              Call Heritage: (360) 456-1015
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
