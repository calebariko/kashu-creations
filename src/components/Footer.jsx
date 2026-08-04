import React from "react";
import kashulogo from "../images/kashulogo.jpg"

//const FOOTER_BRAND_IMG =
  //"https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=120&h=40&fit=crop";

const COLUMNS = [
  {
    title: "Services",
    links: [
      "Apparel Printing",
      "Custom Branding",
      "Packaging",
      "Signage",
      "Pricing",
    ],
  },
  {
    title: "Company",
    links: ["About", "Our Work", "Process", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Returns"],
  },
];

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem 2.5rem",
      }}
    >
      <div
        className="max-w-6xl mx-auto grid gap-8"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      >
        <div>
          <span className="font-display font-extrabold text-lg">
            Kashu Creations™
          </span>
          <img
            src={kashulogo}
            alt="kashu creations logo"
            loading="lazy"
            style={{
              mixBlendMode: "screen",
              opacity: 0.8,
              marginTop: "0.75rem",
              display: "block",
              height: "6rem"
            }}
          />
          <p className="text-xs text-muted-foreground mt-3">
            Creative branding that makes you unforgettable.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-display font-semibold mb-3">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          marginTop: "2.5rem",
        }}
      >
        <span className="text-xs text-muted-foreground">
          © 2026 Kashu Creations. All rights reserved.
        </span>
        <div className="flex gap-4">
          {["Privacy", "Terms"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
