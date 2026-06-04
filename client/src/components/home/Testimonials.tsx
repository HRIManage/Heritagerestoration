
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    stars: 5,
    text: 'Heritage Restoration made an incredibly stressful experience manageable. They were on-site within hours of our house fire, handled all the insurance communication, and rebuilt our home better than before.',
    name: 'Rebecca M.',
    location: 'Lacey, WA',
    label: 'Fire Restoration',
  },
  {
    stars: 5,
    text: 'After a pipe burst flooded our basement, Heritage had drying equipment running the same day. Their 3D documentation made our insurance claim seamless. Cannot recommend them highly enough.',
    name: 'James & Carol T.',
    location: 'Olympia, WA',
    label: 'Water Damage',
  },
  {
    stars: 5,
    text: 'The storm took out half our roof. Heritage had it tarped and secure within 4 hours — on a Sunday night. Their professionalism and speed gave us real peace of mind.',
    name: 'Derek P.',
    location: 'Chehalis, WA',
    label: 'Storm Damage',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="section-pad" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="page-container">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
          <p className="overline-label" style={{ marginBottom: '0.75rem' }}>Client Stories</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.15 }}>
            Trusted by Our Community
          </h2>
          <span className="green-divider" style={{ margin: '1.25rem auto 0' }} />
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{
                background: '#ffffff',
                padding: '2.25rem',
                border: '1px solid #e8e8e8',
                display: 'flex',
                flexDirection: 'column',
                opacity: 0,
                transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#7fd526'
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#e8e8e8'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Stars */}
              <div style={{ color: '#7fd526', fontSize: '1rem', marginBottom: '1.25rem', letterSpacing: 2 }}>
                {'★'.repeat(t.stars)}
              </div>

              {/* Quote */}
              <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontStyle: 'italic', color: '#333333', lineHeight: 1.75, flex: 1, marginBottom: '1.5rem' }}>
                "{t.text}"
              </blockquote>

              {/* Divider */}
              <div style={{ width: 32, height: 2, backgroundColor: '#7fd526', marginBottom: '1.25rem', borderRadius: 1 }} />

              {/* Author */}
              <div>
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a', display: 'block' }}>{t.name}</span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#999999' }}>{t.location} · {t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
