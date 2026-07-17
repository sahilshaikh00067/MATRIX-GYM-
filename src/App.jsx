import { useState, useEffect, useRef } from 'react'

// ── Image URLs ──────────────────────────────────────────────────────────────
const IMGS = {
  hero1:    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=90',
  hero2:    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=90',
  hero3:    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=90',
  about:    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=90',
  about2:   'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=90',
  trainer1: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=90',
  trainer2: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=90',
  trainer3: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=90',
  trainer4: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=90',
  class1:   'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=700&q=90',
  class2:   'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=90',
  class3:   'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&q=90',
  class4:   'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=700&q=90',
  class5:   'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&q=90',
  class6:   'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=700&q=90',
  gallery1: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=90',
  gallery2: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=90',
  gallery3: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=90',
  gallery4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90',
  gallery5: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=90',
  gallery6: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800&q=90',
  gallery7: 'https://images.unsplash.com/photo-1638805981949-362afa59fe2e?w=800&q=90',
  gallery8: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=90',
  equip1:   'https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?w=700&q=90',
  equip2:   'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=700&q=90',
  cta:      'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=1920&q=90',
}

// ── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}

// ── Counter ─────────────────────────────────────────────────────────────────
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (!inView) return
    let val = 0
    const step = end / (duration / 16)
    const t = setInterval(() => {
      val += step
      if (val >= end) { setCount(end); clearInterval(t) }
      else setCount(Math.floor(val))
    }, 16)
    return () => clearInterval(t)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Custom Cursor ───────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = e => {
      if (dotRef.current) {
        dotRef.current.style.left  = e.clientX - 6 + 'px'
        dotRef.current.style.top   = e.clientY - 6 + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 18 + 'px'
        ringRef.current.style.top  = e.clientY - 18 + 'px'
      }
    }
    const over = () => dotRef.current?.classList.add('active')
    const out  = () => dotRef.current?.classList.remove('active')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,.hover-scale,.tilt-card').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-follower" ref={ringRef} />
    </>
  )
}

// ── Tilt Card ───────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const onMove = e => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)' }

  return (
    <div ref={ref} className={`tilt-card ${className}`}
      style={{ transition: 'transform 0.12s ease' }}
      onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  )
}

// ── Section Label ───────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div className="section-label">
      <div className="section-label-line" />
      <span className="section-label-text">{text}</span>
      <div className="section-label-line" />
    </div>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Home', 'About', 'Classes', 'Trainers', 'Pricing', 'Gallery', 'Contact']
  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-glass py-2' : 'py-5'}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => go('home')}>
            <div style={{ width: 38, height: 38, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--blue)', transform: 'rotate(45deg)', borderRadius: 4 }} />
              <span className="font-orbitron" style={{ fontWeight: 900, color: 'var(--blue)', fontSize: 13, position: 'relative', zIndex: 1 }}>M</span>
            </div>
            <div>
              <div className="font-bebas" style={{ fontSize: 22, color: '#fff', letterSpacing: '0.18em', lineHeight: 1 }}>MATRIX</div>
              <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--blue)', letterSpacing: '0.22em', lineHeight: 1 }}>GYM</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '2rem' }}>
            {links.map(l => (
              <button key={l} onClick={() => go(l)}
                className="font-rajdhani"
                style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--txt-muted)', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = 'var(--blue)'}
                onMouseLeave={e => e.target.style.color = 'var(--txt-muted)'}
              >{l}</button>
            ))}
          </div>

          <div className="hidden lg:flex">
            <button className="btn-outline btn-sm">Join Now</button>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', height: 2, borderRadius: 2,
                  background: i === 1 ? 'var(--blue)' : '#fff',
                  width: 24,
                  transformOrigin: 'center',
                  transition: 'all 0.3s ease',
                  transform: open
                    ? i === 0 ? 'rotate(45deg) translateY(7px)'
                    : i === 2 ? 'rotate(-45deg) translateY(-7px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '5rem', padding: '5rem 2rem 2rem' }}>
          {links.map((l, i) => (
            <button key={l} onClick={() => go(l)}
              className="font-bebas"
              style={{ fontSize: 28, color: 'var(--txt-muted)', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', animationDelay: `${i * 0.05}s` }}
              onMouseEnter={e => e.target.style.color = 'var(--blue)'}
              onMouseLeave={e => e.target.style.color = 'var(--txt-muted)'}
            >
              <span className="font-orbitron" style={{ fontSize: 11, color: 'var(--blue)', marginRight: 8 }}>{String(i+1).padStart(2,'0')}</span>
              {l}
            </button>
          ))}
          <button className="btn-primary" style={{ marginTop: '1rem' }}>JOIN NOW</button>
        </div>
      </div>

      {open && <div style={{ position: 'fixed', inset: 0, zIndex: 30 }} onClick={() => setOpen(false)} />}
    </>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0)
  const slides = [
    { img: IMGS.hero1, tag: 'Elite Training',   title: 'BREAK YOUR',  sub2: 'LIMITS',      sub: 'Premium facilities · Expert coaches · Proven results' },
    { img: IMGS.hero2, tag: 'Expert Coaching',  title: 'TRANSFORM',   sub2: 'YOUR BODY',   sub: 'State-of-the-art equipment · Personal training · 24/7 access' },
    { img: IMGS.hero3, tag: 'Premium Gym',      title: 'FORGE YOUR',  sub2: 'LEGACY',      sub: "Mumbai's most advanced fitness destination" },
  ]

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" style={{ position: 'relative', height: '100svh', minHeight: 560, overflow: 'hidden' }}>
      {slides.map((s, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, transition: 'opacity 1.1s ease', opacity: i === slide ? 1 : 0 }}>
          <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
          <div className="hero-bottom-fade" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%' }} />
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', zIndex: 10 }}>
        <div className="container">
          <div key={slide} className="animate-fadeLeft">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: 1, width: 40, background: 'var(--blue)', flexShrink: 0 }} />
              <span className="font-orbitron" style={{ color: 'var(--blue)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {slides[slide].tag}
              </span>
            </div>

            <h1 className="font-bebas hero-title glitch" data-text={slides[slide].title}
              style={{ color: '#fff', display: 'block', marginBottom: 4 }}>
              {slides[slide].title}
            </h1>
            <h1 className="font-bebas hero-title shimmer-text" style={{ display: 'block', marginBottom: '1.5rem' }}>
              {slides[slide].sub2}
            </h1>

            <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 'clamp(14px,2vw,18px)', letterSpacing: '0.12em', marginBottom: '2rem', maxWidth: 480 }}>
              {slides[slide].sub}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button className="btn-primary"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                START YOUR JOURNEY
              </button>
              <button className="btn-outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                EXPLORE MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i+1}`}
            style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
              width: i === slide ? 28 : 8,
              background: i === slide ? 'var(--blue)' : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2.5rem', right: '1.5rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} className="hide-xs">
        <span className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-dim)', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, var(--blue), transparent)' }} />
      </div>
    </section>
  )
}

// ── Ticker ──────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ['STRENGTH', 'ENDURANCE', 'POWER', 'SPEED', 'AGILITY', 'FLEXIBILITY', 'PERFORMANCE', 'EXCELLENCE']
  return (
    <div className="ticker-wrap" style={{ padding: '0.875rem 0', borderTop: '1px solid rgba(14,165,233,0.15)', borderBottom: '1px solid rgba(14,165,233,0.15)', background: 'rgba(14,165,233,0.04)' }}>
      <div className="ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-bebas" style={{ fontSize: 18, letterSpacing: '0.2em', margin: '0 2rem', color: 'var(--plat-muted)' }}>
            {item} <span style={{ color: 'var(--blue)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  const [ref, inView] = useInView()
  const stats = [
    { num: 15,   suffix: '+', label: 'Years Experience' },
    { num: 5000, suffix: '+', label: 'Members Strong' },
    { num: 50,   suffix: '+', label: 'Expert Trainers' },
    { num: 98,   suffix: '%', label: 'Success Rate' },
  ]

  return (
    <section ref={ref} className="grid-bg section-py">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className={`text-center transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="font-bebas text-glow-blue" style={{ fontSize: 'clamp(56px,8vw,88px)', lineHeight: 1, color: 'var(--blue)' }}>
                {inView ? <Counter end={s.num} suffix={s.suffix} /> : '0'}
              </div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView()
  const features = [
    { icon: '⚡', title: 'Premium Equipment', desc: 'Latest Technogym & Life Fitness gear maintained daily.' },
    { icon: '🏆', title: 'Championship Results', desc: '200+ regional and national competition wins by members.' },
    { icon: '🔬', title: 'Science-Based Training', desc: 'Programs by certified exercise physiologists.' },
    { icon: '🎯', title: 'Personalized Plans', desc: 'Custom programs built around your goals and body type.' },
  ]
  const bars = [['Cardio Zone', 90], ['Strength Training', 95], ['Nutrition Support', 85], ['Recovery Programs', 88]]

  return (
    <section id="about" ref={ref} className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="diagonal-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="container">
        <div className="about-grid">
          {/* Image column */}
          <div className={`transition-all duration-1000 ${inView ? 'animate-fadeLeft' : 'opacity-0'}`} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img src={IMGS.about} alt="About Matrix Gym" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, transparent 60%)' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -24, right: -16, width: 160, height: 160, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
              className="neon-border">
              <img src={IMGS.about2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="about-badge" style={{ top: -12, left: -12 }}>
              <div className="font-bebas" style={{ fontSize: 36, color: 'var(--blue)', lineHeight: 1 }}>15+</div>
              <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-muted)', letterSpacing: '0.15em' }}>YEARS OF EXCELLENCE</div>
            </div>
          </div>

          {/* Text column */}
          <div className={`transition-all duration-1000 delay-200 ${inView ? 'animate-fadeRight' : 'opacity-0'}`}>
            <SectionLabel text="About Us" />
            <h2 className="font-bebas section-title" style={{ color: '#fff', lineHeight: 0.95, marginBottom: '1.25rem' }}>
              WHERE LEGENDS<br />
              <span style={{ color: 'var(--blue)' }}>ARE MADE</span>
            </h2>
            <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 17, lineHeight: 1.7, marginBottom: '1.75rem' }}>
              Matrix Gym is Mumbai's premier fitness destination, built for those who demand more than ordinary. Since 2009, we've transformed thousands of bodies and mindsets with our elite training ecosystem.
            </p>

            <div style={{ marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bars.map(([label, val]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="font-rajdhani" style={{ color: 'var(--plat)', fontSize: 14, letterSpacing: '0.1em' }}>{label}</span>
                    <span className="font-rajdhani" style={{ color: 'var(--blue)', fontSize: 14 }}>{val}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: inView ? `${val}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="feature-grid">
              {features.map((f, i) => (
                <div key={i} className="card-base hover-scale" style={{ padding: '1rem' }}>
                  <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{f.icon}</span>
                  <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                  <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Classes ─────────────────────────────────────────────────────────────────
function Classes() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(null)
  const classes = [
    { img: IMGS.class1, name: 'POWERLIFTING', tag: 'Strength',   duration: '90 MIN', level: 'Advanced' },
    { img: IMGS.class2, name: 'HIIT EXTREME', tag: 'Cardio',     duration: '45 MIN', level: 'All Levels' },
    { img: IMGS.class3, name: 'CROSSFIT',     tag: 'Functional', duration: '60 MIN', level: 'Intermediate' },
    { img: IMGS.class4, name: 'BOXING PRO',   tag: 'Combat',     duration: '75 MIN', level: 'Beginner+' },
    { img: IMGS.class5, name: 'YOGA FUSION',  tag: 'Recovery',   duration: '60 MIN', level: 'All Levels' },
    { img: IMGS.class6, name: 'CYCLE BLAST',  tag: 'Cardio',     duration: '45 MIN', level: 'All Levels' },
  ]

  return (
    <section id="classes" ref={ref} className="section-py" style={{ background: 'var(--bg2)', position: 'relative' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Programs" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            OUR <span style={{ color: 'var(--blue)' }}>CLASSES</span>
          </h2>
          <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 17, marginTop: 12 }}>Elite programs for every fitness goal</p>
        </div>

        <div className="grid-3">
          {classes.map((c, i) => (
            <div key={i}
              className={`hover-scale transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 300, position: 'relative', cursor: 'pointer' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: active === i ? 'scale(1.1)' : 'scale(1)' }} />
              <div style={{
                position: 'absolute', inset: 0, transition: 'all 0.4s ease',
                background: active === i
                  ? 'linear-gradient(to top, rgba(14,165,233,0.75) 0%, rgba(0,0,0,0.6) 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 100%)',
              }} />
              <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="font-orbitron" style={{ fontSize: 10, padding: '3px 10px', borderRadius: 4, background: 'var(--blue)', color: '#fff', letterSpacing: '0.1em' }}>{c.tag}</span>
                  <span className="font-rajdhani" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>{c.level}</span>
                </div>
                <div>
                  <h3 className="font-bebas" style={{ fontSize: 28, color: '#fff', marginBottom: 6 }}>{c.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="font-rajdhani" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>⏱ {c.duration}</span>
                    <button className="btn-outline btn-sm" style={{ transition: 'all 0.3s', ...(active === i ? { background: '#fff', color: '#000', borderColor: '#fff' } : {}) }}>
                      BOOK CLASS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Video Section ───────────────────────────────────────────────────────────
function VideoSection() {
  const [ref, inView] = useInView()
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) videoRef.current.pause()
    else videoRef.current.play()
    setPlaying(!playing)
  }

  return (
    <section id="video" ref={ref} className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="diagonal-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Experience" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            FEEL THE <span style={{ color: 'var(--blue)' }}>POWER</span>
          </h2>
        </div>

        <div className={`neon-border transition-all duration-1000 ${inView ? 'animate-scaleIn' : 'opacity-0'}`}
          style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
          <video ref={videoRef} src="/gym.mp4" className="w-full h-full" style={{ objectFit: 'cover' }}
            loop playsInline poster={IMGS.hero2}
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
          {!playing && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)' }}>
              <button onClick={toggle} className="pulse-ring"
                style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--blue)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.25s ease', boxShadow: '0 0 40px rgba(14,165,233,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <span style={{ color: '#fff', fontSize: 26, marginLeft: 4 }}>▶</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {[
            ['🔥', 'High Intensity', 'Programs designed to maximize calorie burn'],
            ['💪', 'Expert Coaching', 'World-class trainers guiding every rep'],
            ['🏆', 'Real Results', 'Proven transformation system'],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="card-base" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Trainers ────────────────────────────────────────────────────────────────
function Trainers() {
  const [ref, inView] = useInView()
  const trainers = [
    { img: IMGS.trainer1, name: 'Alex Rodriguez', role: 'Head Strength Coach', exp: '12 Years', spec: 'Powerlifting & Hypertrophy', certs: 'NSCA-CSCS, NASM-CPT' },
    { img: IMGS.trainer2, name: 'Priya Sharma',   role: 'HIIT Specialist',     exp: '8 Years',  spec: 'Metabolic Conditioning',    certs: 'ACE-CPT, CrossFit L2' },
    { img: IMGS.trainer3, name: 'Marcus Chen',    role: 'Combat Coach',        exp: '15 Years', spec: 'Boxing & MMA Fitness',      certs: 'USA Boxing, NASM' },
    { img: IMGS.trainer4, name: 'Zara Khan',      role: 'Wellness Director',   exp: '10 Years', spec: 'Yoga & Recovery',           certs: 'E-RYT 500, NASM-CES' },
  ]

  return (
    <section id="trainers" ref={ref} className="section-py" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Team" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            ELITE <span style={{ color: 'var(--blue)' }}>TRAINERS</span>
          </h2>
        </div>

        <div className="grid-4">
          {trainers.map((t, i) => (
            <TiltCard key={i}
              className={`transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s`, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div className="flip-wrap" style={{ height: 300 }}>
                <div className="flip-inner">
                  <div className="flip-front">
                    <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,8,13,0.95) 0%, rgba(0,0,0,0.1) 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.25rem' }}>
                      <h3 className="font-bebas" style={{ fontSize: 22, color: '#fff' }}>{t.name}</h3>
                      <p className="font-rajdhani" style={{ color: 'var(--blue)', fontSize: 13, letterSpacing: '0.1em' }}>{t.role}</p>
                    </div>
                  </div>
                  <div className="flip-back">
                    <h3 className="font-bebas" style={{ fontSize: 18, color: 'var(--blue)', marginBottom: 16 }}>{t.name}</h3>
                    {[['EXPERIENCE', t.exp], ['SPECIALIZATION', t.spec], ['CERTIFICATIONS', t.certs]].map(([label, val]) => (
                      <div key={label} style={{ marginBottom: 12 }}>
                        <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-dim)', letterSpacing: '0.14em', marginBottom: 3 }}>{label}</div>
                        <div className="font-rajdhani" style={{ color: '#fff', fontSize: 14 }}>{val}</div>
                      </div>
                    ))}
                    <button className="btn-primary btn-sm" style={{ marginTop: 'auto', width: '100%' }}>BOOK SESSION</button>
                  </div>
                </div>
              </div>
              <div style={{ padding: '0.875rem 1rem', background: 'var(--bg4)', borderTop: '1px solid var(--border)' }}>
                <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700 }}>{t.name}</div>
                <div className="font-rajdhani" style={{ color: 'var(--blue)', fontSize: 13 }}>{t.role}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Schedule ────────────────────────────────────────────────────────────────
function Schedule() {
  const [ref, inView] = useInView()
  const [day, setDay] = useState(0)
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const schedule = {
    0: [{ time:'06:00', name:'Morning HIIT', trainer:'Priya Sharma', spots:3 }, { time:'08:00', name:'Powerlifting', trainer:'Alex Rodriguez', spots:5 }, { time:'11:00', name:'Yoga Fusion', trainer:'Zara Khan', spots:8 }, { time:'17:00', name:'CrossFit', trainer:'Alex Rodriguez', spots:2 }, { time:'19:00', name:'Boxing Pro', trainer:'Marcus Chen', spots:6 }],
    1: [{ time:'07:00', name:'Cycle Blast', trainer:'Priya Sharma', spots:4 }, { time:'09:00', name:'Strength 101', trainer:'Alex Rodriguez', spots:7 }, { time:'12:00', name:'Core Blast', trainer:'Zara Khan', spots:9 }, { time:'18:00', name:'HIIT Extreme', trainer:'Priya Sharma', spots:1 }],
    2: [{ time:'06:00', name:'CrossFit', trainer:'Alex Rodriguez', spots:5 }, { time:'10:00', name:'Boxing Pro', trainer:'Marcus Chen', spots:3 }, { time:'13:00', name:'Yoga Fusion', trainer:'Zara Khan', spots:10 }, { time:'17:00', name:'Powerlifting', trainer:'Alex Rodriguez', spots:4 }, { time:'20:00', name:'Evening HIIT', trainer:'Priya Sharma', spots:7 }],
    3: [{ time:'07:00', name:'Morning Power', trainer:'Alex Rodriguez', spots:6 }, { time:'11:00', name:'Cycle Blast', trainer:'Priya Sharma', spots:3 }, { time:'16:00', name:'Boxing Pro', trainer:'Marcus Chen', spots:5 }],
    4: [{ time:'06:00', name:'HIIT Extreme', trainer:'Priya Sharma', spots:2 }, { time:'09:00', name:'Yoga Fusion', trainer:'Zara Khan', spots:8 }, { time:'12:00', name:'Powerlifting', trainer:'Alex Rodriguez', spots:4 }, { time:'17:00', name:'CrossFit', trainer:'Alex Rodriguez', spots:6 }, { time:'19:00', name:'Cycle Blast', trainer:'Priya Sharma', spots:9 }],
    5: [{ time:'07:00', name:'Saturday Slam', trainer:'All Trainers', spots:12 }, { time:'10:00', name:'Yoga & Recovery', trainer:'Zara Khan', spots:15 }, { time:'14:00', name:'Boxing Workshop', trainer:'Marcus Chen', spots:8 }],
    6: [{ time:'08:00', name:'Sunday Reset', trainer:'Zara Khan', spots:20 }, { time:'11:00', name:'Active Recovery', trainer:'Priya Sharma', spots:15 }],
  }

  return (
    <section ref={ref} className="section-py grid-bg">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Schedule" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            CLASS <span style={{ color: 'var(--blue)' }}>TIMETABLE</span>
          </h2>
        </div>

        <div className="day-tabs" style={{ marginBottom: '1.75rem' }}>
          {days.map((d, i) => (
            <button key={i} className={`day-tab ${day === i ? 'active' : ''}`} onClick={() => setDay(i)}>{d}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {(schedule[day] || []).map((item, i) => (
            <div key={i} className="schedule-item"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1rem 1rem 0', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="font-orbitron" style={{ color: 'var(--blue)', fontSize: 13, minWidth: 50 }}>{item.time}</span>
                <div>
                  <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{item.name}</div>
                  <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13 }}>{item.trainer}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <span className="font-rajdhani" style={{ fontSize: 13, color: item.spots <= 3 ? '#f87171' : '#4ade80' }}>
                  {item.spots} spots left
                </span>
                <button className="btn-outline btn-sm">BOOK</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ─────────────────────────────────────────────────────────────────
function Pricing() {
  const [ref, inView] = useInView()
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: 'STARTER', nameColor: 'var(--txt-muted)',
      price: annual ? 1999 : 2499,
      features: ['Full Gym Access', 'Locker Room', '2 Group Classes/mo', 'Basic App Access', 'Nutrition Guide'],
      missing: ['Personal Training', 'Spa Access', 'Priority Booking'],
    },
    {
      name: 'ELITE', nameColor: 'var(--blue)', featured: true,
      price: annual ? 4499 : 5499,
      features: ['Full Gym Access', 'Locker Room', 'Unlimited Classes', 'Full App Access', 'Nutrition Coaching', '4 PT Sessions/mo', 'Priority Booking'],
      missing: ['Spa Access'],
    },
    {
      name: 'PLATINUM', nameColor: '#f0d080',
      price: annual ? 7999 : 9999,
      features: ['Full Gym Access', 'Premium Locker', 'Unlimited Classes', 'Full App Access', 'Custom Meal Plans', 'Unlimited PT Sessions', 'Priority Booking', 'Spa & Recovery Access', 'Guest Passes x4/mo'],
    },
  ]

  return (
    <section id="pricing" ref={ref} className="section-py" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Membership" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            CHOOSE YOUR <span style={{ color: 'var(--blue)' }}>PLAN</span>
          </h2>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem' }}>
            <span className="font-rajdhani" style={{ fontSize: 13, letterSpacing: '0.12em', color: !annual ? '#fff' : 'var(--txt-dim)' }}>MONTHLY</span>
            <button onClick={() => setAnnual(!annual)} aria-label="Toggle annual billing"
              style={{ width: 48, height: 26, borderRadius: 99, background: annual ? 'var(--blue)' : 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
              <span style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', left: annual ? 24 : 4 }} />
            </button>
            <span className="font-rajdhani" style={{ fontSize: 13, letterSpacing: '0.12em', color: annual ? '#fff' : 'var(--txt-dim)' }}>
              ANNUAL <span style={{ color: 'var(--blue)' }}>-20%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div key={i} className={`plan-card ${p.featured ? 'featured' : ''} transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s` }}>
              {p.featured && (
                <div className="font-orbitron" style={{ fontSize: 10, textAlign: 'center', padding: '5px 0', borderRadius: 4, background: 'var(--blue)', color: '#fff', letterSpacing: '0.12em', marginBottom: 20, marginTop: -4 }}>
                  MOST POPULAR
                </div>
              )}
              <div className="font-orbitron" style={{ fontSize: 12, color: p.nameColor, marginBottom: 8, letterSpacing: '0.12em' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                <span className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 18 }}>₹</span>
                <span className="font-bebas" style={{ fontSize: 'clamp(48px,6vw,64px)', color: p.nameColor, lineHeight: 1 }}>{p.price.toLocaleString()}</span>
              </div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 13, marginBottom: '1.75rem' }}>
                {annual ? '/mo billed annually' : '/month'}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: p.nameColor, flexShrink: 0 }}>✓</span>
                    <span className="font-rajdhani" style={{ color: 'var(--plat)', fontSize: 14 }}>{f}</span>
                  </div>
                ))}
                {(p.missing || []).map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.35 }}>
                    <span>✗</span>
                    <span className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 14, textDecoration: 'line-through' }}>{f}</span>
                  </div>
                ))}
              </div>

              <button className={p.featured ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', padding: '0.875rem' }}>
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(null)
  const images = [IMGS.gallery1, IMGS.gallery2, IMGS.gallery3, IMGS.gallery4, IMGS.gallery5, IMGS.gallery6, IMGS.gallery1, IMGS.gallery8, IMGS.equip1, IMGS.equip2, IMGS.class1, IMGS.class3]

  return (
    <section id="gallery" ref={ref} className="section-py grid-bg">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Gallery" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            INSIDE <span style={{ color: 'var(--blue)' }}>MATRIX</span>
          </h2>
        </div>

        <div className="gallery-grid">
          {images.map((img, i) => (
            <div key={i}
              className={`gallery-item transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => setActive(i)}>
              <img src={img} alt={`Gallery ${i+1}`} loading="lazy" />
              <div className="gallery-overlay">
                <span style={{ color: '#fff', fontSize: 32, fontWeight: 300 }}>+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setActive(null)}>
          <div className="animate-scaleIn" style={{ maxWidth: 900, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img src={images[active]} alt="" style={{ width: '100%', borderRadius: 'var(--radius-lg)', maxHeight: '80vh', objectFit: 'contain' }} />
            <button onClick={() => setActive(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            {[
              { side: 'left',  symbol: '‹', action: () => setActive((active - 1 + images.length) % images.length) },
              { side: 'right', symbol: '›', action: () => setActive((active + 1) % images.length) },
            ].map(({ side, symbol, action }) => (
              <button key={side} onClick={action}
                style={{ position: 'absolute', [side]: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(14,165,233,0.3)', border: '1px solid var(--border-blue)', color: '#fff', cursor: 'pointer', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {symbol}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ── Testimonials ────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, inView] = useInView()
  const [idx, setIdx] = useState(0)
  const testimonials = [
    { name: 'Rohit Verma',  role: 'Software Engineer',  text: "Matrix Gym completely transformed my physique in 6 months. The trainers are world-class and the equipment is unmatched in Mumbai. Best investment I've ever made.", avatar: 'RV' },
    { name: 'Ananya Patel', role: 'Marketing Manager',  text: 'From 82kg to 63kg in one year. The nutrition coaching combined with HIIT classes was exactly what I needed. Priya is an absolute rockstar trainer!', avatar: 'AP' },
    { name: 'Karan Singh',  role: 'Business Owner',     text: 'The Platinum membership is worth every rupee. Unlimited PT sessions and the spa access make recovery seamless. I feel 10 years younger.', avatar: 'KS' },
    { name: 'Meera Shah',   role: 'Doctor',             text: 'As a healthcare professional, I appreciate the scientific approach at Matrix. Programs are evidence-based and the staff is incredibly knowledgeable.', avatar: 'MS' },
    { name: 'Arjun Mehta',  role: 'Competitive Athlete', text: 'Won my first regional powerlifting competition after training at Matrix for just 8 months. Coach Alex is a genius. No other gym comes close.', avatar: 'AM' },
  ]

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} className="section-py" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Testimonials" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            SUCCESS <span style={{ color: 'var(--blue)' }}>STORIES</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div className="testimonial-card" style={{ padding: 'clamp(1.5rem,4vw,3rem)', textAlign: 'center', maxWidth: 720, margin: '0 auto 2rem', borderColor: 'rgba(14,165,233,0.25)' }}>
          <div className="font-bebas" style={{ fontSize: 56, color: 'var(--blue)', lineHeight: 0.8, marginBottom: 20 }}>"</div>
          <p className="font-rajdhani" style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--plat-dim)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
            {testimonials[idx].text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-orbitron" style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>{testimonials[idx].avatar}</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700 }}>{testimonials[idx].name}</div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13 }}>{testimonials[idx].role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 16 }}>
            {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#fbbf24', fontSize: 16 }}>{s}</span>)}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Testimonial ${i+1}`}
              style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s', background: i === idx ? 'var(--blue)' : 'rgba(255,255,255,0.18)', width: i === idx ? 24 : 8 }} />
          ))}
        </div>

        <div className="grid-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className={`testimonial-card transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                {'★★★★★'.split('').map((s, j) => <span key={j} style={{ color: '#fbbf24', fontSize: 13 }}>{s}</span>)}
              </div>
              <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: '1.25rem' }}>
                "{t.text.substring(0, 120)}…"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="font-orbitron" style={{ fontSize: 10, color: '#fff' }}>{t.avatar}</span>
                </div>
                <div>
                  <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <img src={IMGS.cta} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,8,13,0.88)' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.28 }} />
      <div className="diagonal-bg" style={{ position: 'absolute', inset: 0 }} />

      <div className={`container transition-all duration-1000 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ position: 'relative', textAlign: 'center' }}>
        <SectionLabel text="Limited Time" />
        <h2 className="font-bebas" style={{ lineHeight: 0.92, marginBottom: '1.25rem', fontSize: 'clamp(52px,9vw,110px)' }}>
          <span style={{ color: '#fff' }}>START YOUR</span><br />
          <span className="shimmer-text">TRANSFORMATION</span><br />
          <span style={{ color: '#fff' }}>TODAY</span>
        </h2>
        <p className="font-rajdhani" style={{ color: 'var(--plat-dim)', fontSize: 'clamp(15px,2vw,20px)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Join 5,000+ members who chose excellence.<br />
          First month 50% off — no contracts, no excuses.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button className="btn-primary" style={{ padding: '1rem 2.5rem' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            CLAIM YOUR OFFER NOW
          </button>
          <button className="btn-outline" style={{ padding: '1rem 2.5rem' }}
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            VIEW PLANS
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
          {['No Hidden Fees', 'Cancel Anytime', 'Free Trial Class', '24/7 Access'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--blue)', fontSize: 16 }}>✓</span>
              <span className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13, letterSpacing: '0.1em' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name:'', email:'', phone:'', goal:'', message:'' })
  const [sent, setSent] = useState(false)

  const submit = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  const info = [
    { icon: '📍', label: 'Address', val: 'G-Bloack Sarabha Nagar Road Ludhiara, Punjab, India 141001' },
    { icon: '📞', label: 'Phone',   val: '+919056888978, +919056065011 ' },
    { icon: '📧', label: 'Email',   val: 'info@mmamatrixgym.com' },
    { icon: '🕐', label: 'Hours',   val: 'Mon–Fri: 5AM–11PM | Sat–Sun: 6AM–9PM' },
  ]

  return (
    <section id="contact" ref={ref} className="section-py grid-bg">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Contact" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>
            GET IN <span style={{ color: 'var(--blue)' }}>TOUCH</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className={inView ? 'animate-fadeLeft' : 'opacity-0'}>
            <h3 className="font-bebas" style={{ fontSize: 28, color: '#fff', marginBottom: '1.75rem' }}>VISIT MATRIX GYM</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
              {info.map((item, i) => (
                <div key={i} className="card-base" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--blue)', letterSpacing: '0.16em', marginBottom: 4 }}>{item.label}</div>
                    <div className="font-rajdhani" style={{ color: 'var(--plat-dim)', fontSize: 15 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-dim)', letterSpacing: '0.16em', marginBottom: 12 }}>FOLLOW US</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Instagram', 'YouTube', 'Facebook', 'Twitter'].map(s => (
                  <button key={s} className="social-btn">{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div className={inView ? 'animate-fadeRight' : 'opacity-0'}>
            <div style={{ background: 'var(--bg4)', border: '1px solid rgba(14,165,233,0.18)', borderRadius: 'var(--radius-xl)', padding: 'clamp(1.25rem,4vw,2.25rem)' }}>
              <h3 className="font-bebas" style={{ fontSize: 24, color: '#fff', marginBottom: '1.5rem' }}>START YOUR FREE TRIAL</h3>
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <input className="input-field" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input className="input-field" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <input className="input-field" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ marginBottom: '1rem' }} />
              <select className="input-field" value={form.goal} onChange={e => setForm({...form, goal: e.target.value})} style={{ marginBottom: '1rem' }}>
                <option value="">Select Your Goal</option>
                {['Weight Loss','Muscle Building','Athletic Performance','General Fitness','Rehabilitation'].map(o => <option key={o}>{o}</option>)}
              </select>
              <textarea className="input-field" rows={4} placeholder="Tell us about yourself…" value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                style={{ resize: 'none', marginBottom: '1.25rem' }} />
              <button onClick={submit}
                style={{ width: '100%', padding: '0.9375rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'all 0.3s',
                  background: sent ? '#22c55e' : 'var(--blue)',
                  color: '#fff',
                  boxShadow: sent ? '0 8px 24px rgba(34,197,94,0.3)' : '0 8px 24px rgba(14,165,233,0.28)' }}>
                {sent ? '✓ MESSAGE SENT — WE\'LL CALL YOU SOON!' : 'CLAIM FREE TRIAL CLASS'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: 'Quick Links', links: ['Home','About','Classes','Trainers','Pricing','Gallery'] },
    { title: 'Programs',    links: ['Powerlifting','HIIT Training','CrossFit','Boxing Pro','Yoga Fusion','Cycle Blast'] },
    { title: 'Support',     links: ['FAQs','Membership Policy','Privacy Policy','Terms of Service','Contact Us'] },
  ]

  return (
    <footer style={{ background: '#050508', borderTop: '1px solid rgba(14,165,233,0.15)' }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--blue)', transform: 'rotate(45deg)', borderRadius: 3 }} />
                <span className="font-orbitron" style={{ fontWeight: 900, color: 'var(--blue)', fontSize: 12, position: 'relative' }}>M</span>
              </div>
              <div>
                <div className="font-bebas" style={{ fontSize: 20, color: '#fff', letterSpacing: '0.18em', lineHeight: 1 }}>MATRIX</div>
                <div className="font-orbitron" style={{ fontSize: 8, color: 'var(--blue)', letterSpacing: '0.2em' }}>GYM</div>
              </div>
            </div>
            <p className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 14, lineHeight: 1.65 }}>
              Mumbai's most elite fitness destination. Where ordinary people become extraordinary athletes.
            </p>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <h4 className="font-orbitron" style={{ fontSize: 9, color: 'var(--blue)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="font-rajdhani"
                      style={{ color: 'var(--txt-dim)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--blue)'}
                      onMouseLeave={e => e.target.style.color = 'var(--txt-dim)'}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <p className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 13 }}>© 2024 Matrix Gym. All rights reserved. Punjab, India.</p>
          <p className="font-orbitron" style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.16em' }}>BUILT FOR CHAMPIONS</p>
        </div>
      </div>
    </footer>
  )
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <About />
      <Classes />
      <VideoSection />
      <Trainers />
      <Schedule />
      <Pricing />
      <Gallery />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </>
  )
}