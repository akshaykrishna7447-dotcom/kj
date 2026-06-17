import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => { document.body.style.overflow = ''; onComplete(); }
            });
            tl
                .to('.pl-glow-outer', { opacity: 0.6, scale: 1.5, duration: 2.5, ease: 'sine.inOut' }, 0)
                .to('.pl-glow-inner', { opacity: 0.9, scale: 1.3, duration: 2,   ease: 'sine.inOut' }, 0.3)
                .fromTo('.pl-ring',   { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' }, 0.2)
                .to('.pl-title',      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.8)
                .to('.pl-sub',        { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' }, 1.1)
                .to('.pl-verse',      { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' }, 1.3)
                .to('.pl-bar-fill',   { scaleX: 1, duration: 2.2, ease: 'power3.inOut' }, 1.0)
                .to({}, { duration: 0.5 })
                .to(['.pl-title', '.pl-sub', '.pl-verse', '.pl-ring', '.pl-bar', '.pl-glow-outer', '.pl-glow-inner'],
                    { opacity: 0, y: -30, duration: 0.7, ease: 'expo.in' })
                .to(containerRef.current, { yPercent: -100, duration: 1.4, ease: 'expo.inOut' }, '-=0.2');
        }, containerRef);

        return () => { document.body.style.overflow = ''; ctx.revert(); };
    }, [onComplete]);

    return (
        <div ref={containerRef} style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: '#2A1206',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Outer warm brown glow */}
            <div className="pl-glow-outer" style={{
                position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,146,26,0.1) 0%, transparent 70%)',
                opacity: 0, transform: 'scale(0.5)', pointerEvents: 'none',
            }} />
            {/* Inner gold glow */}
            <div className="pl-glow-inner" style={{
                position: 'absolute', width: '280px', height: '280px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,201,106,0.22) 0%, transparent 70%)',
                opacity: 0, transform: 'scale(0.5)', pointerEvents: 'none',
            }} />

            {/* Spinning ornament ring */}
            <div className="pl-ring" style={{
                width: '110px', height: '110px', borderRadius: '50%',
                border: '1px solid rgba(201,146,26,0.45)',
                boxShadow: '0 0 30px rgba(201,146,26,0.2), inset 0 0 20px rgba(201,146,26,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', marginBottom: '28px', opacity: 0,
                animation: 'spin-slow 14s linear infinite',
            }}>
                <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: '1px solid rgba(201,146,26,0.2)' }} />
                <span style={{ fontSize: '2.2rem', filter: 'drop-shadow(0 0 10px rgba(201,146,26,0.9))', lineHeight: 1 }}>🪔</span>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute', width: '1px', height: '7px',
                        background: 'rgba(201,146,26,0.5)',
                        top: '5px', left: '50%', transformOrigin: '0 50px',
                        transform: `rotate(${i * 45}deg)`,
                    }} />
                ))}
            </div>

            {/* Text */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <div className="pl-title" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                    <h2 style={{
                        fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700,
                        fontSize: '1.5rem', letterSpacing: '0.42em',
                        background: 'linear-gradient(135deg, #F0D98A, #C9921A, #E2CCA8)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text', marginBottom: '5px',
                    }}>കൊട്ടിവട്ടം</h2>
                    <p style={{
                        fontFamily: "'Manrope', sans-serif", fontWeight: 500,
                        fontSize: '0.6rem', letterSpacing: '0.58em',
                        color: 'rgba(201,146,26,0.7)', textTransform: 'uppercase',
                    }}>ഇല്ലം</p>
                </div>

                <div className="pl-sub" style={{ opacity: 0, transform: 'translateY(14px)', marginTop: '18px' }}>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.72rem', letterSpacing: '0.28em', color: 'rgba(196,149,106,0.85)', textTransform: 'uppercase' }}>
                        ✦ പവിത്രമായ അഗ്നി ഉണരുന്നു ✦
                    </p>
                </div>

                <div className="pl-verse" style={{ opacity: 0, transform: 'translateY(12px)', marginTop: '16px' }}>
                    <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(242,235,220,0.4)', letterSpacing: '0.04em' }}>
                        പാരമ്പര്യത്തിന്റെ പുനർജന്മം • അനശ്വരമായ ജ്ഞാനം
                    </p>
                </div>
            </div>

            {/* Bar */}
            <div className="pl-bar" style={{
                width: '150px', height: '1px',
                background: 'rgba(201,146,26,0.15)', marginTop: '42px', overflow: 'hidden',
            }}>
                <div className="pl-bar-fill" style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, #E8C96A, #C9921A, transparent)',
                    transform: 'scaleX(0)', transformOrigin: 'left',
                }} />
            </div>
        </div>
    );
}
