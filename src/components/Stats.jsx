import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import GradientFlowText from './GradientFlowText'
import SplitReveal from './SplitReveal'

// PLACEHOLDER STATS — replace with real numbers when available
const STATS = [
  { display: '1,000+', label: 'Orders completed', target: 100 },
  { display: '24hr', label: 'Average turnaround', target: 100 },
  { display: '100%', label: 'Client satisfaction', target: 100 },
  { display: '5+', label: 'Years in business', target: 100 },
]

function StatItem({ stat }) {
  const [inViewRef, inView] = useInView(0.3)
  const [, bounce] = useCountUp(stat.target, inView)

  return (
    <div ref={inViewRef} className="text-center">
      <div
        className={`font-display font-extrabold ${bounce ? 'animate-counter-bounce' : ''}`}
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-1.5px' }}
      >
        <GradientFlowText>{stat.display}</GradientFlowText>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section
      className="relative text-center"
      style={{
        padding: '5rem 1.5rem',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          <SplitReveal>Numbers that matter</SplitReveal>
        </h2>

        <style>{`
          .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem 2rem; }
          @media (min-width: 768px) {
            .stats-grid { grid-template-columns: repeat(4, 1fr); }
          }
        `}</style>
        <div className="stats-grid mt-14">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
