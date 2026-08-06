import ScrambleText from './ScrambleText'
import SplitReveal from './SplitReveal'

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 1.5rem' }}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-primary">
          <ScrambleText>About Us</ScrambleText>
        </span>

        <h2
          className="font-display font-extrabold mt-3"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          <SplitReveal>The people behind your brand</SplitReveal>
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground mt-6" style={{ lineHeight: 1.75 }}>
          Kashu Creations is a creative branding and customisation company
          specialising in apparel branding, vinyl and DTF printing, logo
          creation, and marketing merchandise. We're built around one goal:
          high quality, affordable, personalised branding — the kind people
          notice.
        </p>

        <p className="text-sm sm:text-base text-muted-foreground mt-4" style={{ lineHeight: 1.75 }}>
          We're based in Nairobi, and every order gets the same hands-on care
          whether you're down the street or across the world. If you can
          dream it, we can print it — even if you're calling in from Mars.
        </p>
      </div>
    </section>
  )
}
