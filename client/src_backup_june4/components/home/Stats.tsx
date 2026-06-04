
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 20,   suffix: '+',  label: 'Years in Business' },
  { value: 2400, suffix: '+',  label: 'Properties Restored' },
  { value: 98,   suffix: '%',  label: 'Client Satisfaction' },
  { value: 24,   suffix: '/7', label: 'Emergency Response' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const valueRefs  = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      valueRefs.current.forEach((el, i) => {
        if (!el) return
        const target = stats[i].value
        
        ScrollTrigger.create({
          trigger: el, 
          start: 'top 92%', 
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target, 
              duration: 1.8, 
              ease: 'power2.out',
              onUpdate: () => { 
                if (el) el.textContent = Math.round(obj.val).toLocaleString() 
              },
            })
            const parent = el?.parentElement?.parentElement
            if (parent) {
              gsap.fromTo(parent,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' }
              )
            }
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="bg-brand-linen py-16 md:py-24 border-b border-brand-stone"
    >
      <div className="page-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 divide-x divide-brand-stone">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className="text-center px-4" 
              style={{ opacity: 0 }}
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  ref={(el) => { valueRefs.current[i] = el }}
                  className="font-serif text-4xl md:text-6xl font-medium text-brand-green leading-none"
                >
                  0
                </span>
                <span className="font-serif text-xl md:text-2xl font-medium text-brand-green leading-none">
                  {stat.suffix}
                </span>
              </div>
              
              <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-brand-charcoal/70 font-semibold max-w-[180px] mx-auto leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
