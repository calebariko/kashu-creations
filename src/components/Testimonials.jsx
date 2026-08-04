import { useTilt } from '../hooks/useTilt'
import { useInView } from '../hooks/useInView'
import SplitReveal from './SplitReveal'
import dantez from '../images/dantez.jpg'
import sesmoh from '../images/sesmoh.jpg'
import shinecollab from '../images/shinecollab.jpg'


// PLACEHOLDER TESTIMONIALS — swap in real client quotes when available
const TESTIMONIALS = [
  {
    quote:
      'Kashu Creations turned our team merch into something people actually fight over. The quality speaks for itself.',
    name: 'Shine Collab',
    role: 'Members · Shine Collab',
    //avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    avatar: shinecollab
  },
  {
    quote:
      'From concept to delivery, communication was clear and the turnaround was faster than I expected.',
    name: 'Dantez',
    role: 'Business Man',
    //avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    avatar: dantez
  },
  {
    quote:
      'They understood our brand better than we could explain it. Every piece felt intentional.',
    name: 'Moses Oketch',
    role: 'Founder · Sesmoh Times',
    //avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
    avatar: sesmoh
  },
]

function TestimonialCard({ t, index }) {
  const tiltRef = useTilt({ max: 5, 'max-glare': 0.05 })
  const [inViewRef, inView] = useInView(0.2)

  return (
    <div
      ref={(node) => {
        tiltRef.current = node
        inViewRef.current = node
      }}
      className="liquid-glass rounded-2xl p-7 flex flex-col"
      style={{
        opacity: inView ? undefined : 0,
        animation: inView ? `float-up 0.8s ease-out ${index * 0.15}s both` : 'none',
      }}
    >
      <span
        className="font-display font-extrabold text-primary"
        style={{ fontSize: '4rem', opacity: 0.3, lineHeight: 1 }}
      >
        "
      </span>
      <p className="italic text-sm flex-1" style={{ lineHeight: 1.7, marginTop: '-0.5rem' }}>
        {t.quote}
      </p>
      <div className="flex items-center gap-3 mt-6">
        <img
          src={t.avatar}
          alt=""
          loading="lazy"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-display font-semibold" style={{ fontSize: '0.875rem' }}>
            {t.name}
          </p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ background: 'rgba(220,220,220,0.02)', padding: '5rem 1.5rem' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          <SplitReveal>What our clients are saying</SplitReveal>
        </h2>

        <div
          className="mt-14 grid gap-5 text-left"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name + i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
