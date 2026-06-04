
import { useEffect, useRef, useState, useCallback } from 'react'

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging) updatePosition(e.clientX) }
    const onUp = () => setDragging(false)
    const onTouch = (e: TouchEvent) => { if (dragging) updatePosition(e.touches[0].clientX) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, updatePosition])

  return (
    <section id="before-after" className="py-24 md:py-32 bg-brand-linen border-b border-brand-stone">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="overline-label mb-3 text-brand-green">Before-After Gallery</span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-charcoal mb-6 leading-tight">
            Restoring Property to Perfection
          </h2>
          <div className="w-12 h-[2px] bg-brand-green mx-auto mb-6" />
          <p className="font-sans text-brand-ink text-base md:text-lg font-light leading-relaxed mb-4">
            If you are a victim of a fire or other disaster, restoration can't wait. Drag the handle below to reveal our reconstruction craftsmanship — from devastating loss back to a fully restored, premium custom home.
          </p>
          <a 
            href="tel:3604561015"
            className="inline-flex items-center gap-1.5 text-brand-green hover:text-brand-charcoal font-sans font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Schedule a Call Now &nbsp;→
          </a>
        </div>

        {/* Slider Container with strict 0px border radius and border */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto aspect-video overflow-hidden cursor-ew-resize select-none border border-brand-stone shadow-[0_12px_40px_rgba(63,65,67,0.04)]"
          style={{ borderRadius: 0 }} // Strict 0px border radius
          onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX) }}
          onTouchStart={(e) => { setDragging(true); updatePosition(e.touches[0].clientX) }}
        >
          {/* After image */}
          <img
            src="/photo/heritage-slider-after.png"
            alt="After Restoration"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before image (clipped) */}
          <img
            src="/photo/heritage-slider-before.png"
            alt="Before Restoration"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />

          {/* Handle line with zero border radius */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-brand-green z-10"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            {/* Handle button - strict square, zero border radius */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-brand-charcoal text-brand-linen flex items-center justify-center shadow-lg border border-brand-stone hover:bg-brand-green hover:text-brand-linen transition-colors duration-200"
              style={{ borderRadius: 0 }} // Strict 0px border radius
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
          </div>

          {/* Labels - zero border radius */}
          <div 
            className="absolute bottom-4 left-4 z-20 bg-brand-charcoal text-brand-linen font-sans text-[10px] tracking-widest uppercase px-3 py-1.5"
            style={{ borderRadius: 0 }}
          >
            Before Damage
          </div>
          <div 
            className="absolute bottom-4 right-4 z-20 bg-brand-charcoal text-brand-linen font-sans text-[10px] tracking-widest uppercase px-3 py-1.5"
            style={{ borderRadius: 0 }}
          >
            Restored
          </div>
        </div>
      </div>
    </section>
  )
}
