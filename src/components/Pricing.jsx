import { useTilt } from "../hooks/useTilt";
import { useInView } from "../hooks/useInView";
import GradientFlowText from "./GradientFlowText";
import SplitReveal from "./SplitReveal";
import { whatsappLink } from "../lib/whatsapp";

// Picks up ANY image file in src/images whose name matches a service slug
// below, regardless of extension (.jpg, .jpeg, .png, .webp, .avif all work).
// Drop a matching-named file in and it appears automatically - no code
// changes needed. See src/images/README.md for the exact filenames.
const imageModules = import.meta.glob(
  "../images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
);
const imageMap = {};
for (const path in imageModules) {
  const slug = path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "");
  imageMap[slug] = imageModules[path];
}

// Real services and prices as sent by the client - no invented tiers.
const SERVICES = [
  {
    slug: "name-only-back",
    name: "Name only - back",
    desc: "Simple back print, name only.",
    price: "KSh 100",
    rate: "per item",
  },
  {
    slug: "name-small-logo",
    name: "Name + small logo",
    desc: "Name paired with a small logo or detail.",
    price: "KSh 150–200",
    rate: "per item",
  },
  {
    slug: "front-logo-back-name",
    name: "Front logo + back name/detail",
    desc: "Two-point branding, front and back.",
    price: "KSh 200–250",
    rate: "per item",
  },
  {
    slug: "large-single-side",
    name: "Large single-side branding",
    desc: "Bigger, bolder branding on one side.",
    price: "KSh 300–350",
    rate: "per item",
  },
  {
    slug: "front-back-detailed",
    name: "Front + back / larger detailed branding",
    desc: "Full detailed branding, front and back.",
    price: "KSh 300–450",
    rate: "per item",
  },
  {
    slug: "jersey-name-number",
    name: "Jersey name + number",
    desc: "Sports jersey lettering and numbering.",
    price: "KSh 350",
    rate: "per item",
  },
];

function ServiceThumb({ slug, name }) {
  const src = imageMap[slug];

  if (src) {
    return (
      <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        aspectRatio: "4 / 3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "hsl(var(--muted))",
      }}
    >
      <span className="text-xs text-muted-foreground">Photo coming soon</span>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const tiltRef = useTilt({ max: 6 });
  const [inViewRef, inView] = useInView(0.2);

  return (
    <div
      ref={(node) => {
        tiltRef.current = node;
        inViewRef.current = node;
      }}
      className="liquid-glass rounded-2xl overflow-hidden flex flex-col"
      style={{
        opacity: inView ? undefined : 0,
        animation: inView
          ? `float-up 0.8s ease-out ${index * 0.1}s both`
          : "none",
      }}
    >
      <ServiceThumb slug={service.slug} name={service.name} />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-sm">{service.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 flex-1">
          {service.desc}
        </p>
        <div className="mt-4 font-display font-extrabold text-lg">
          <GradientFlowText>{service.price}</GradientFlowText>
          <p className="text-xs text-muted-foreground flex-1">{service.rate}</p>
        </div>
        <a
          href={whatsappLink(
            `Hi, I'd like to order: ${service.name} (${service.price}).`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full border border-primary/40 py-2 text-xs font-medium mt-4 transition-transform duration-200 hover:scale-105 text-center"
        >
          Order
        </a>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "6rem 1.5rem" }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="font-display font-extrabold"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          <SplitReveal>Quality prints, friendly prices</SplitReveal>
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
          Priced per design. No hidden fees, no surprises.
        </p>

        <div
          className="mt-14 grid gap-5 items-stretch text-left"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>

        {/* <button className="liquid-glass animate-glow-pulse rounded-full border border-primary/40 px-8 py-4 text-sm font-medium mt-12 transition-transform duration-200 hover:scale-105">
          Custom Order
        </button> */}
        <a
          href={whatsappLink(
            `Hi, I'd like to do a custom order.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass animate-glow-pulse rounded-full border border-primary/40 px-8 py-4 text-sm font-medium inline-block mt-10 md:mt-16 transition-transform duration-200 hover:scale-105"
        >
          Custom Order
        </a>
      </div>
    </section>
  );
}
