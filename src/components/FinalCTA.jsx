import { useTilt } from '../hooks/useTilt'
import TypewriterText from './TypewriterText'
import SplitReveal from './SplitReveal'

export default function FinalCTA() {
  const tiltRef = useTilt({ max: 3, glare: true, 'max-glare': 0.04 })

  return (
    <section style={{ padding: '7rem 1.5rem', textAlign: 'center' }}>
      <div
        ref={tiltRef}
        className="liquid-glass mx-auto"
        style={{
          maxWidth: '48rem',
          borderRadius: '1.5rem',
          padding: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <span className="text-xs uppercase tracking-widest text-primary" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          <TypewriterText>Get started today</TypewriterText>
        </span>
        <h2
          className="font-display font-extrabold"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-1.5px' }}
        >
          <SplitReveal>Let's create something extraordinary together.</SplitReveal>
        </h2>
        <button className="liquid-glass animate-glow-pulse rounded-full border border-primary/40 mt-8 transition-transform duration-200 hover:scale-105" style={{ padding: '1rem 2.5rem' }}>
          Start Your Order
        </button>
      </div>
    </section>
  )
}
