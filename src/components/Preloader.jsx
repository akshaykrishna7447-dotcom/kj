import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Before animating, ensure we are at the top of the page (fixes refresh midway)
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    onComplete();
                }
            });

            tl.to('.preloader-glow', { opacity: 0.6, scale: 1.5, duration: 3, ease: 'sine.inOut' })
                .to('.preloader-text-1', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=1.0')
                .to('.preloader-text-2', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=0.8')
                .to('.preloader-bar-fill', { scaleX: 1, duration: 2.5, ease: 'power3.inOut' }, '-=1.4')
                .to({}, { duration: 0.6 }) // hold for resonance
                .to(['.preloader-text-1', '.preloader-text-2', '.preloader-bar', '.preloader-glow'], { opacity: 0, y: -40, duration: 1, ease: 'expo.in' })
                .to(containerRef.current, { yPercent: -100, duration: 1.5, ease: 'expo.inOut' }, '-=0.3');

        }, containerRef);

        return () => {
            document.body.style.overflow = '';
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef}
            style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#050201', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
            {/* Expanding Divine Glow */}
            <div className="preloader-glow" style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,153,51,0.12) 0%, transparent 70%)', opacity: 0, transform: 'scale(0.5)', pointerEvents: 'none' }} />

            {/* Removed OM Symbol for Minimalist Aesthetic */}

            <div className="preloader-text-container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <div className="preloader-text-1" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                    <h2 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.4em', color: '#d4af37', marginBottom: '8px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>KOTTIVATTAM</h2>
                    <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.65rem', letterSpacing: '0.6em', color: 'rgba(255,153,51,0.8)', textTransform: 'uppercase', marginBottom: '16px' }}>Awakening the Divine</p>
                </div>
                <div className="preloader-text-2" style={{ opacity: 0, transform: 'translateY(15px)' }}>
                    <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(253,245,230,0.5)', letterSpacing: '0.1em' }}>Tradition Reborn • Wisdom Eternal</p>
                </div>
            </div>

            <div className="preloader-bar" style={{ width: '140px', height: '1px', background: 'rgba(255,153,51,0.2)', marginTop: '40px', overflow: 'hidden' }}>
                <div className="preloader-bar-fill" style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
            </div>
        </div>
    );
}
