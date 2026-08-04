import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import ScrambleText from './ScrambleText'
import SplitReveal from './SplitReveal'

const STEP_ICONS = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=48&h=48&fit=crop',
]

const STEPS = [
  {
    title: 'Share your vision',
    desc: 'Tell us what you need branded — apparel, packaging, signage — and what you\'re going for.',
  },
  {
    title: 'We design it',
    desc: 'Our team turns your vision into concepts, ready for your review and revisions.',
  },
  {
    title: 'We print & produce',
    desc: 'High quality printing on the material of your choice, checked for detail and finish.',
  },
  {
    title: 'You receive & shine',
    desc: 'Fast turnaround delivery, so your brand shows up looking unforgettable, on time.',
  },
]

function StepRow({ step, index }) {
  const [ref, inView] = useInView(0.3)
  return (
    <div
      ref={ref}
      className="flex gap-6 py-8"
      style={{
        borderTop: index > 0 ? '1px dashed hsl(220,14%,18%)' : 'none',
        opacity: inView ? undefined : 0,
        animation: inView ? `slide-in-left 0.7s ease-out ${index * 0.15}s both` : 'none',
      }}
    >
      <div className="flex flex-col items-center gap-3" style={{ width: 80, flexShrink: 0 }}>
        <span
          className="font-display font-extrabold text-primary"
          style={{ fontSize: '3.5rem', opacity: 0.2, lineHeight: 1 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <img
          src={STEP_ICONS[index]}
          alt=""
          loading="lazy"
          width={48}
          height={48}
          className="rounded-lg"
          style={{ filter: 'grayscale(1) opacity(0.6)' }}
        />
      </div>
      <div>
        <h3 className="font-display font-bold" style={{ fontSize: '1.2rem' }}>
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2" style={{ lineHeight: 1.65 }}>
          {step.desc}
        </p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="process" style={{ padding: '6rem 1.5rem' }}>
      <div className="max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-primary">
          <ScrambleText>Workflow</ScrambleText>
        </span>
        <h2 className="font-display font-extrabold mt-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          <SplitReveal>From vision to finished product, fast</SplitReveal>
        </h2>

        <div className="mt-10">
          {STEPS.map((s, i) => (
            <StepRow key={s.title} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
