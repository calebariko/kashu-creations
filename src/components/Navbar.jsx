import React, { useEffect, useState } from "react";
import { whatsappLink } from "../lib/whatsapp";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const NAV_LINKS = ["Services", "Work", "Pricing", "Process", "About"];
const MOBILE_QUERY = "(max-width: 767px)";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track mobile vs desktop with matchMedia so the drawer is never even
  // mounted on desktop - nothing there to accidentally show.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // useEffect(() => {
  //   document.body.style.overflow = menuOpen ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [menuOpen]);

  useBodyScrollLock(menuOpen) // ← NEW: replaces the manual overflow useEffect below

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      className={`liquid-glass sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "border-b border-border" : ""
      }`}
      style={{
        background: scrolled ? undefined : "transparent",
        backdropFilter: scrolled ? undefined : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6 flex flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span
            className="font-display font-extrabold whitespace-nowrap"
            style={{ fontSize: "1.1rem" }}
          >
            Kashu Creations™
          </span>
          {/* Hidden at 768px and below, visible above that */}
          <span className="liquid-glass rounded-full px-3 py-1 text-xs text-primary hidden md:inline-block whitespace-nowrap">
            Custom Branding
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={whatsappLink(
              "Hi, I'd like to get in touch with Kashu Creations.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass animate-glow-pulse rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm border border-primary/40 text-foreground transition-transform duration-200 hover:scale-105 whitespace-nowrap inline-block"
          >
            Call Us
          </a>

          {isMobile && (
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center items-center gap-1.5 w-8 h-8 flex-shrink-0 transition-transform duration-100 hover:scale-105"
            >
              <span className="block w-5 h-0.5 bg-neutral-100 rounded-full" />
              <span className="block w-5 h-0.5 bg-neutral-100 rounded-full" />
              <span className="block w-5 h-0.5 bg-neutral-100 rounded-full" />
            </button>
          )}
        </div>
      </div>

      {isMobile && (
        <>
          {/* Backdrop - position set inline, cannot be overridden by any class */}
          <div
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#000",
              zIndex: 55,
              opacity: menuOpen ? 0.6 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition: "opacity 300ms ease",
            }}
          />

          {/* Drawer - position, top, right, height, transform all set inline
              on purpose: inline styles always win over any class, so this
              cannot be silently overridden by the liquid-glass class (which
              sets position: relative) the way it was before. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="liquid-glass flex flex-col"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: "78%",
              maxWidth: "320px",
              zIndex: 60,
              background: "hsl(220 18% 8%)",
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 300ms ease",
            }}
          >
            <div className="flex justify-between items-center px-6 py-6">
              <span className="font-display font-extrabold text-sm">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-2xl text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col px-6 gap-1 mt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-base text-foreground border-b border-white/5"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="px-6 mt-auto mb-8">
              <a
                onClick={() => setMenuOpen(false)}
                href={whatsappLink(
                  "Hi, I'd like to get in touch with Kashu Creations.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass animate-glow-pulse rounded-full block text-center w-full py-3 text-sm border border-primary/40 text-foreground"

              >
                Call Us
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default React.memo(Navbar);
