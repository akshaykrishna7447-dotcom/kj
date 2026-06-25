import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const sparksRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Blinking cursor
            gsap.to('.pl-cursor', { opacity: 0, duration: 0.4, repeat: -1, yoyo: true, ease: 'none' });

            // Generate spiritual sparks (Homam embers)
            if (sparksRef.current) {
                for (let i = 0; i < 30; i++) {
                    const spark = document.createElement('div');
                    spark.style.position = 'absolute';
                    spark.style.width = Math.random() * 3 + 1 + 'px';
                    spark.style.height = spark.style.width;
                    spark.style.borderRadius = '50%';
                    spark.style.background = Math.random() > 0.5 ? '#E8C96A' : '#C9921A';
                    spark.style.boxShadow = '0 0 8px rgba(232,201,106,0.8)';
                    spark.style.bottom = '-10px';
                    spark.style.left = Math.random() * 100 + '%';
                    spark.style.opacity = 0;
                    sparksRef.current.appendChild(spark);

                    gsap.to(spark, {
                        y: -window.innerHeight - 100,
                        x: `+=${(Math.random() - 0.5) * 100}`,
                        opacity: Math.random() * 0.6 + 0.2,
                        duration: Math.random() * 3 + 3,
                        ease: 'power1.out',
                        repeat: -1,
                        delay: Math.random() * 3,
                    });
                }
            }

            const tl = gsap.timeline({
                onComplete: () => { document.body.style.overflow = ''; onComplete(); }
            });

            tl
                .to('.pl-glow-ambient', { opacity: 0.8, scale: 1.2, duration: 2.5, ease: 'sine.inOut' }, 0)
                // Typing effect using clipPath inset from right
                .to('.pl-text-reveal', { clipPath: 'inset(0 0% 0 0)', duration: 2.5, ease: 'power1.inOut' }, 0.5)
                // Move cursor along with the text reveal
                .fromTo('.pl-cursor', { left: '0%' }, { left: '100%', duration: 2.5, ease: 'power1.inOut' }, 0.5)
                
                .to('.pl-bar-fill', { scaleX: 1, duration: 2.5, ease: 'power3.inOut' }, 0.5)
                
                .to({}, { duration: 0.6 }) // Hold briefly

                // Exit
                .to(['.pl-title-container', '.pl-bar', '.pl-glow-ambient', sparksRef.current],
                    { opacity: 0, y: -30, duration: 0.8, ease: 'expo.in' })
                .to(containerRef.current, { yPercent: -100, duration: 1.2, ease: 'expo.inOut' }, '-=0.3');
        }, containerRef);

        return () => { document.body.style.overflow = ''; ctx.revert(); };
    }, [onComplete]);

    return (
        <div ref={containerRef} style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            background: '#1A0F09',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Ambient warm background glow */}
            <div className="pl-glow-ambient" style={{
                position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,146,26,0.1) 0%, transparent 70%)',
                opacity: 0, transform: 'scale(0.5)', pointerEvents: 'none',
            }} />

            {/* Spiritual Sparks Container */}
            <div ref={sparksRef} style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5
            }} />

            {/* Title with Typing Reveal */}
            <div className="pl-title-container" style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>
                {/* Hidden text to establish container size */}
                <h2 style={{
                    fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 400,
                    fontSize: '3.5rem', letterSpacing: '0.02em',
                    color: 'transparent', marginBottom: '0', lineHeight: 1.2,
                    userSelect: 'none'
                }}>കൊറ്റിവട്ടത്ത് ഇല്ലം</h2>

                {/* Visible animated text */}
                <h2 className="pl-text-reveal" style={{
                    position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap',
                    fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 400,
                    fontSize: '3.5rem', letterSpacing: '0.02em',
                    background: 'linear-gradient(135deg, #F0D98A, #C9921A, #E2CCA8)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', marginBottom: '0', lineHeight: 1.2,
                    clipPath: 'inset(0 100% 0 0)' // Start fully clipped from right
                }}>കൊറ്റിവട്ടത്ത് ഇല്ലം</h2>

                {/* Blinking Cursor */}
                <div style={{ position: 'absolute', top: '10%', bottom: '10%', left: '0%', width: '100%', pointerEvents: 'none' }}>
                    <div className="pl-cursor" style={{ position: 'absolute', top: 0, left: '0%', height: '100%', width: '4px', background: '#E8C96A', boxShadow: '0 0 10px rgba(232,201,106,0.8)', borderRadius: '2px' }} />
                </div>
            </div>

            {/* Minimal Progress Bar */}
            <div className="pl-bar" style={{
                width: '240px', height: '1px',
                background: 'rgba(201,146,26,0.1)', marginTop: '50px', overflow: 'hidden',
                borderRadius: '2px', position: 'relative', zIndex: 10
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
