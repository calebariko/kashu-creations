import { useState, useEffect } from 'react'
import { useParallax } from '../hooks/useParallax'
import ParticleField from './ParticleField'
import ScrambleText from './ScrambleText'
import GlitchText from './GlitchText'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwlXH07IWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const COMPANIES = ['Veridian Apparel', 'Northline Studio', 'Fieldmark Co.', 'Oribel Goods', 'Rustlane']

export default function Hero() {
  const videoParallax = useParallax(0.15)
  const particleParallax = useParallax(0.2)
  const eyebrowParallax = useParallax(0.25)
  const h1Parallax = useParallax(0.35)
  const subtextParallax = useParallax(0.45)
  const ctaParallax = useParallax(0.55)
  const proofParallax = useParallax(0.65)

  const [videoFailed, setVideoFailed] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

    // Mount the Three.js particle field only after the hero's text/CTA
  // content has had a chance to paint, so the headline shows up first.

  useEffect(() => {
    const idle =
      window.requestIdleCallback ||
      ((cb) => setTimeout(cb, 300))
    const id = idle(() => setShowParticles(true))
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [])

  return (
    <section
      className="relative flex flex-col items-center text-center"
      style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 90, paddingLeft: '1.5rem', paddingRight: '1.5rem', overflow: 'hidden' }}
    >
      {/* Layer 1: video background */}
      <div ref={videoParallax} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {!videoFailed ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(0,210,255,0.10), transparent 60%), hsl(var(--background))',
            }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
      </div>

      {/* Layer 2: particle field */}
      <div ref={particleParallax} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {showParticles && <ParticleField />}
      </div>

      {/* Layer 3: content */}
      <div style={{ position: 'relative', zIndex: 2 }} className="flex flex-col items-center">
        <div ref={eyebrowParallax}>
          <span className="liquid-glass inline-block rounded-full px-4 py-2 text-xs uppercase tracking-widest text-primary">
            <ScrambleText triggerOnMount>Creative Branding That Makes You Unforgettable</ScrambleText>
          </span>
        </div>

        <div ref={h1Parallax} className="animate-fade-rise-delay mt-8">
          <h1
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 88px)',
              lineHeight: 0.92,
              letterSpacing: '-2.5px',
            }}
          >
            <GlitchText as="span" className="block">
              Build what the
            </GlitchText>
            <GlitchText
              as="span"
              className="block text-primary"
              style={{ textShadow: '0 0 30px rgba(0,210,255,0.35)' }}
            >
              world remembers.
            </GlitchText>
          </h1>
        </div>

        <div ref={subtextParallax} className="animate-fade-rise-delay-2 mt-6">
          <p
            className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Let us create something extraordinary together. We design and print custom
            branding for apparel and every material you can put a brand on — from
            first sketch to finished product.
          </p>
        </div>

        <div ref={ctaParallax} className="animate-fade-rise-delay-3 mt-10 flex items-center gap-6 flex-wrap justify-center">
          <button className="liquid-glass animate-glow-pulse rounded-full border border-primary/40 px-8 py-4 text-sm font-medium transition-transform duration-200 hover:scale-105">
            Start Your Order
          </button>
          <button className="text-muted-foreground text-sm hover:underline transition-colors duration-200">
            See how it works →
          </button>
        </div>

        <div ref={proofParallax} className="mt-16 flex flex-col items-center gap-4">
          <span className="text-xs text-muted-foreground">
            Trusted by brands and businesses across the region
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {COMPANIES.map((c) => (
              <span
                key={c}
                className="liquid-glass rounded-full px-4 py-2 text-xs text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
