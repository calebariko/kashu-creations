import React, { useEffect, useState } from "react";
import kashulogo from "../images/kashulogo.jpg";
import { whatsappLink } from "../lib/whatsapp";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const SERVICE_LINKS = [
  "Apparel Printing",
  "Custom Branding",
  "Packaging",
  "Signage",
  "Pricing",
];

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  {
    label: "Contact",
    href: whatsappLink("Hi, I'd like to get in touch with Kashu Creations."),
    external: true,
  },
];

const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "19 August 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: "Kashu Creations may collect information necessary to provide its services, including: client name; phone/WhatsApp number; email address; business or organization name; delivery or collection details; design files, logos, photographs, and artwork supplied by the client; and order and payment information.",
      },
      {
        heading: "How We Use Client Information",
        body: "Client information may be used to: process and manage orders; prepare quotations and invoices; communicate about projects; arrange delivery or collection; process payments; provide customer support; maintain business records; and improve our services.",
      },
      {
        heading: "Protection of Client Information",
        body: "Kashu Creations will take reasonable steps to protect client information from unauthorized access, misuse, loss, or disclosure.",
      },
      {
        heading: "Sharing of Information",
        body: "Client information will not be sold or unnecessarily shared with third parties. Information may only be shared where reasonably necessary to complete an order, such as with a trusted printing, delivery, or production partner, or where required by law.",
      },
      {
        heading: "Client Designs & Intellectual Property",
        body: "Client-provided logos, photographs, artwork, and business materials remain the client's property unless otherwise agreed. Kashu Creations will use such materials only for purposes connected to the requested service. Original artwork created specifically for a client belongs to the client upon full payment, unless otherwise agreed.",
      },
      {
        heading: "Marketing Consent",
        body: "Kashu Creations may use photographs of completed products for marketing and portfolio purposes. Clients who do not want their completed work displayed publicly may request that it remain private.",
      },
      {
        heading: "Data Retention",
        body: "Kashu Creations may retain relevant client and order information for reasonable business, accounting, customer-service, and record-keeping purposes.",
      },
      {
        heading: "Privacy Requests",
        body: "Clients may contact Kashu Creations regarding their personal information, including requests to correct inaccurate information or ask questions about how their information is used.",
      },
      {
        heading: "Contact for Privacy Matters",
        body: "Kashu Creations — Dagoretti South, Nairobi, Kenya. Email: kashucreations254@gmail.com. Phone: +254 702 011 192.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "19 August 2026",
    sections: [
      {
        heading: "Quotations & Pricing",
        body: "All quotations are based on the client's requested design, quantity, material, printing method, and level of customization. Prices may change if the client changes the design, quantity, garment, or scope of work after a quotation has been issued. A quotation is valid for the period stated by Kashu Creations. If no period is stated, pricing may be subject to change based on material and supplier costs.",
      },
      {
        heading: "Design Approval",
        body: "The client is responsible for reviewing and approving spelling, names, numbers, colours, sizes, placement, and other design details before production. Production will begin after the client approves the final design. Kashu Creations will not be responsible for errors that were approved by the client before production.",
      },
      {
        heading: "Client-Supplied Items",
        body: "Where a client provides their own t-shirts, jerseys, reflectors, overalls, caps, bags, or other items, the client confirms that the items are suitable for the requested branding method. Kashu Creations will take reasonable care when working on client-supplied items but cannot guarantee against pre-existing weaknesses, defects, stains, damage, or material incompatibility. The client should provide clean and suitable items for branding.",
      },
      {
        heading: "Materials & Outsourced Services",
        body: "Kashu Creations may source materials or outsource specific services such as DTF, UV printing, embroidery, or other specialized production when necessary. Outsourced work remains subject to the supplier's production timelines and availability. Kashu Creations remains responsible for coordinating the work and maintaining reasonable quality standards.",
      },
      {
        heading: "Payment",
        body: "A 50% deposit is required before production begins unless otherwise agreed in writing. The remaining balance is payable upon completion and before collection or delivery. Production may be paused if the agreed payment has not been received. Deposits may be non-refundable once materials have been purchased or production has started.",
      },
      {
        heading: "Cancellations & Changes",
        body: "Changes requested after production has started may attract additional charges. If a client cancels after materials have been purchased or production has begun, the client may be responsible for costs already incurred. Major design changes may be treated as a new design request and quoted separately.",
      },
      {
        heading: "Quality & Colour Variations",
        body: "Minor differences in colour, print appearance, or positioning may occur due to the material, garment colour, printing method, screen settings, or production process. Kashu Creations will make reasonable efforts to maintain the approved design and expected quality.",
      },
      {
        heading: "Collection & Delivery",
        body: "Completed orders should be collected or delivered within the agreed timeframe. Delivery charges, where applicable, are separate unless included in the quotation. Kashu Creations is not responsible for delays caused by circumstances outside its reasonable control, including supplier delays, power interruptions, transport issues, or other unforeseen circumstances.",
      },
      {
        heading: "Customer Complaints & Corrections",
        body: "Any issue with an order should be reported as soon as reasonably possible after collection or delivery. Where an error is caused by Kashu Creations, the company will assess the issue and, where appropriate, offer a reasonable correction or reprint. Damage caused after delivery, improper washing, ironing, handling, or use is not considered a production defect.",
      },
      {
        heading: "Portfolio & Marketing",
        body: "Kashu Creations may photograph or showcase completed work for its portfolio, website, social media, and marketing purposes unless the client requests confidentiality before or at the time of the order.",
      },
    ],
  },
  returns: {
    title: "Returns Policy",
    lastUpdated: "19 August 2026",
    sections: [
      {
        heading: "Cancellations & Changes",
        body: "Changes requested after production has started may attract additional charges. If a client cancels after materials have been purchased or production has begun, the client may be responsible for costs already incurred. Major design changes may be treated as a new design request and quoted separately.",
      },
      {
        heading: "Customer Complaints & Corrections",
        body: "Any issue with an order should be reported as soon as reasonably possible after collection or delivery. Where an error is caused by Kashu Creations, the company will assess the issue and, where appropriate, offer a reasonable correction or reprint. Damage caused after delivery, improper washing, ironing, handling, or use is not considered a production defect.",
      },
    ],
  },
};

function LegalModal({ contentKey, onClose }) {

  useBodyScrollLock(!!contentKey) // ← NEW: locks only while a modal is actually open
  
  useEffect(() => {
    // document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      // document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!contentKey) return null;
  const content = LEGAL_CONTENT[contentKey];

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          opacity: 0.65,
          zIndex: 90,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 91,
          width: "90%",
          maxWidth: "640px",
          maxHeight: "80vh",
          background: "hsl(220 18% 8%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          <span className="font-display font-bold text-base">{content.title}</span>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-2xl text-muted-foreground hover:text-foreground transition-colors duration-200"
            style={{ lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "1.5rem", overflowY: "auto" }}>
          <p className="text-xs text-muted-foreground mb-4">
            Last updated: {content.lastUpdated}
          </p>
          {content.sections.map((s) => (
            <div key={s.heading} style={{ marginBottom: "1.25rem" }}>
              <h4 className="text-sm font-display font-semibold mb-1">{s.heading}</h4>
              <p className="text-xs text-muted-foreground" style={{ lineHeight: 1.7 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Footer() {
  const [openModal, setOpenModal] = useState(null); // 'privacy' | 'terms' | 'returns' | null

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem 2.5rem",
        position: "relative",
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
              height: "6rem",
            }}
          />
          <p className="text-xs text-muted-foreground mt-3">
            Creative branding that makes you unforgettable.
          </p>
        </div>

        {/* Services — anchors kept in markup but intentionally inert (no href) */}
        <div>
          <h3 className="text-sm font-display font-semibold mb-3">Services</h3>
          <ul className="space-y-2">
            {SERVICE_LINKS.map((link) => (
              <li key={link}>
                <a className="text-xs text-muted-foreground">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company — real anchors, Contact goes to WhatsApp */}
        <div>
          <h3 className="text-sm font-display font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal — opens a modal with placeholder content */}
        <div>
          <h3 className="text-sm font-display font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            {[
              { label: "Privacy", key: "privacy" },
              { label: "Terms", key: "terms" },
              { label: "Returns", key: "returns" },
            ].map((link) => (
              <li key={link.key}>
                <button
                  type="button"
                  onClick={() => setOpenModal(link.key)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
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
          {[
            { label: "Privacy", key: "privacy" },
            { label: "Terms", key: "terms" },
          ].map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => setOpenModal(link.key)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <LegalModal contentKey={openModal} onClose={() => setOpenModal(null)} />
    </footer>
  );
}

export default React.memo(Footer);
