import { useTilt } from '../hooks/useTilt'
import { useInView } from '../hooks/useInView'
import ScrambleText from './ScrambleText'
import SplitReveal from './SplitReveal'

const FEATURE_BG =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80'

const ICONS = {
  print: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="7" />
    </svg>
  ),
  shirt: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 3l3 3-3 3H8L5 6l3-3M8 3l4 3 4-3M8 6v15h8V6" />
    </svg>
  ),
  clock: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  spark: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  ),
  layers: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  tag: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.6 12.6L13.4 19.8a2 2 0 0 1-2.8 0L3 12.2V4h8.2l9.4 8.6z" />
      <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
}

const FEATURES = [
  {
    icon: 'shirt',
    title: 'Custom Apparel Printing',
    desc: 'From single t-shirts to full team kits, we print on garments of every size, fabric, and cut.',
  },
  {
    icon: 'layers',
    title: 'Any Material, Any Surface',
    desc: 'Apparel, signage, packaging, promo items — if it can carry a brand, we can print it.',
  },
  {
    icon: 'spark',
    title: 'Creative Branding',
    desc: 'Logo, palette, and identity work that makes your brand unforgettable, not just visible.',
  },
  {
    icon: 'print',
    title: 'High Quality Printing',
    desc: 'Sharp detail, rich color, and finishes built to last wash after wash, wear after wear.',
  },
  {
    icon: 'clock',
    title: 'Fast Turnarounds',
    desc: 'Friendly pricing and quick delivery — quality prints without the long wait.',
  },
  {
    icon: 'tag',
    title: 'Custom Printing & Branding',
    desc: 'Full-service design-to-delivery, tailored to your vision from the first sketch.',
  },
]

function FeatureCard({ feature, index }) {
  const tiltRef = useTilt({ max: 8, glare: true, 'max-glare': 0.08 })
  const [inViewRef, inView] = useInView(0.2)

  return (
    <div
      ref={(node) => {
        tiltRef.current = node
        inViewRef.current = node
      }}
      className="liquid-glass rounded-2xl p-7 border border-transparent hover:border-primary/20 transition-colors duration-200"
      style={{
        opacity: inView ? undefined : 0,
        animation: inView ? `float-up 0.8s ease-out ${index * 0.1}s both` : 'none',
      }}
    >
      <div className="text-primary mb-5">{ICONS[feature.icon]}</div>
      <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
        {feature.desc}
      </p>
    </div>
  )
}

export default function Features() {
  return (
    <section
      id="services"
      className="relative"
      style={{
        background: 'rgba(9,11,15,0.8)',
        backdropFilter: 'blur(4px)',
        padding: '6rem 1.5rem',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${FEATURE_BG})`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-primary">
          <ScrambleText>Services</ScrambleText>
        </span>
        <h2 className="font-display font-extrabold mt-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          <SplitReveal>Everything your brand needs to stand out</SplitReveal>
        </h2>

        <div
          className="mt-14 grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
