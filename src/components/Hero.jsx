import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DUST_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${(i * 7.3 + 3) % 100}%`,
    top: `${(i * 13.7 + 5) % 100}%`,
    width: `${1 + (i % 3) * 0.7}px`,
    height: `${1 + (i % 3) * 0.7}px`,
    opacity: 0.25 + (i % 5) * 0.06,
    animDuration: `${10 + (i % 6) * 2.5}s`,
    animDelay: `${(i % 8) * 1.1}s`,
}));

const SMOKE_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${(i * 11.3 + 2) % 100}%`,
    size: `${22 + (i % 4) * 8}px`,
    animDuration: `${6 + (i % 4) * 1}s`,
    animDelay: `${(i % 5) * 1.2}s`,
}));

// Marquee items for the bottom strip
const MARQUEE_ITEMS = [
    'Ganapathi Homam', '✦', 'Sudarshana Homam', '✦',
    'Bhagavathy Pooja', '✦', 'Navagraha Pooja', '✦',
    'Ayushya Homam', '✦', 'Satyanarayana Katha', '✦',
    'Ganapathi Homam', '✦', 'Sudarshana Homam', '✦',
    'Bhagavathy Pooja', '✦', 'Navagraha Pooja', '✦',
];

export default function Hero({ isLoaded }) {
    const heroRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);
    const marqueeRef = useRef(null);
    const charsRef = useRef([]);
    const subtitleRef = useRef(null);
    const bodyRef = useRef(null);
    const ctaRef = useRef(null);
    const dividerRef = useRef(null);

    useEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {
            // ── ENTRANCE: staggered char reveal ──────────────────────────
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo(charsRef.current,
                { yPercent: 110, opacity: 0, rotateX: -60, skewX: 8 },
                {
                    yPercent: 0, opacity: 1, rotateX: 0, skewX: 0,
                    duration: 1.1, stagger: 0.055,
                    transformOrigin: 'bottom center',
                }
            )
                .fromTo(subtitleRef.current,
                    { opacity: 0, letterSpacing: '3em', y: 10 },
                    { opacity: 1, letterSpacing: '1.2em', y: 0, duration: 1.2 },
                    '-=0.5'
                )
                .fromTo(dividerRef.current,
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.8, ease: 'expo.out' },
                    '-=0.6'
                )
                .fromTo(bodyRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1 },
                    '-=0.5'
                )
                .fromTo(ctaRef.current,
                    { opacity: 0, y: 16, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8 },
                    '-=0.6'
                );

            // ── SCROLL PIN ────────────────────────────────────────────────
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top top',
                end: '+=100%',
                pin: true,
                pinSpacing: false,
            });

            // ── BG PARALLAX ───────────────────────────────────────────────
            gsap.fromTo(bgRef.current,
                { yPercent: 0, scale: 1 },
                {
                    yPercent: 18,
                    scale: 1.22,
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=100%',
                        scrub: 1,
                    }
                }
            );

            // Subtle breathing
            gsap.to(bgRef.current, {
                scale: '+=0.007',
                duration: 8,
                repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true,
            });

            // ── GOD RAYS ──────────────────────────────────────────────────
            gsap.to('.god-ray', {
                opacity: (i) => 0.04 + (i % 5) * 0.03,
                duration: (i) => 3 + (i % 4),
                repeat: -1, yoyo: true, ease: 'sine.inOut',
                stagger: { amount: 1.5, from: 'random' },
            });
            gsap.to('.god-rays-container', {
                rotate: '0.4deg', duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true,
            });

            // ── CONTENT SCROLL-OUT ────────────────────────────────────────
            gsap.fromTo(contentRef.current,
                { y: -50, opacity: 1 },
                {
                    y: -130, opacity: 0, scale: 0.97, ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=80%',
                        scrub: 1,
                    }
                }
            );

            // ── MARQUEE ───────────────────────────────────────────────────
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                ease: 'none',
                duration: 22,
                repeat: -1,
            });

        }, heroRef);

        return () => ctx.revert();
    }, [isLoaded]);

    const letters = 'KOTTIVATTAM'.split('');

    return (
        <section id="hero" ref={heroRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Background */}
            <div ref={bgRef} style={{
                position: 'absolute', inset: -40,
                backgroundImage: 'url(/temple.png)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                transformOrigin: 'center center',
                willChange: 'transform', transform: 'translateZ(0)',
            }} />

            {/* God Rays */}
            <div className="god-rays-container" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transformOrigin: 'top center', zIndex: 1, filter: 'blur(30px)', willChange: 'transform' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`ray-${i}`} className="god-ray"
                        style={{
                            position: 'absolute', top: '-10%', left: `${10 + i * 14}%`,
                            width: '100px', height: '150%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,153,51,0.07), transparent)',
                            transform: `rotate(${20 + i * 4}deg)`, opacity: 0.1, willChange: 'opacity',
                        }}
                    />
                ))}
            </div>

            {/* Vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, rgba(20,5,2,0.55) 100%)', zIndex: 2 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,5,2,0.15) 0%, rgba(20,5,2,0.35) 80%, #140502 100%)', zIndex: 2 }} />

            {/* HERO CONTENT */}
            <div ref={contentRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1200px', width: '100%', padding: '0 32px', transform: 'translateY(-50px)' }}>

                {/* KOTTIVATTAM — char-split reveal */}
                <h1 style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'visible' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', gap: '0.02em', overflow: 'hidden', paddingBottom: '0.08em' }}>
                        {letters.map((char, i) => (
                            <span
                                key={i}
                                ref={el => charsRef.current[i] = el}
                                style={{
                                    display: 'inline-block',
                                    fontFamily: "'Nehana', 'Noto Serif Malayalam', serif",
                                    fontWeight: 'normal',
                                    fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                                    lineHeight: 0.95,
                                    letterSpacing: '0.04em',
                                    background: 'linear-gradient(135deg, #d4af37 0%, #d4af37 40%, #ff9933 70%, #fff6e0 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    textShadow: 'none',
                                    willChange: 'transform',
                                    transformStyle: 'preserve-3d',
                                    opacity: 0,
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </span>

                    <span ref={subtitleRef} style={{
                        fontFamily: "'Nehana', 'Noto Serif Malayalam', serif", fontWeight: 'normal',
                        fontSize: 'clamp(0.7rem, 2.5vw, 1.3rem)', letterSpacing: '1.2em',
                        textTransform: 'uppercase', color: 'rgba(212,175,55,0.9)',
                        marginTop: '12px', display: 'block', opacity: 0,
                        textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                    }}>
                        ILLAM
                    </span>
                </h1>

                <div ref={dividerRef} style={{ maxWidth: '400px', margin: '36px auto', display: 'flex', alignItems: 'center', gap: '20px', transformOrigin: 'center' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6))' }} />
                    <span style={{ color: '#d4af37', fontSize: '1.2rem', filter: 'drop-shadow(0 0 10px rgba(255,153,51,0.7))' }}>✦</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.6), transparent)' }} />
                </div>

                <p ref={bodyRef} style={{ margin: '0 auto 44px', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(253,245,230,0.85)', maxWidth: '600px', lineHeight: 1.9, fontFamily: "'Noto Serif Malayalam', serif", fontStyle: 'italic', opacity: 0 }}>
                    A timeless sanctuary of Vedic tradition and architectural majesty. Welcome to the living heritage of ancient Kerala.
                </p>

                <div ref={ctaRef} style={{ display: 'flex', justifyContent: 'center', gap: '16px', opacity: 0 }}>
                    <a href="#contact" className="btn-gold" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        Offer Worship
                    </a>
                    <a href="#illam" className="btn-outline-gold" onClick={(e) => { e.preventDefault(); document.querySelector('#illam')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        Explore Heritage
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(253,245,230,0.4)', textTransform: 'uppercase' }}>Scroll</span>
                <div style={{ width: '1px', height: '48px', background: 'linear-gradient(180deg, rgba(212,175,55,0.6), transparent)', animation: 'float 2s ease-in-out infinite' }} />
            </div>

            {/* Gold marquee strip at the bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, overflow: 'hidden', borderTop: '1px solid rgba(212,175,55,0.15)', background: 'rgba(20,5,2,0.6)', padding: '12px 0' }}>
                <div ref={marqueeRef} style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', width: 'max-content' }}>
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} style={{
                            fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.72rem', letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: item === '✦' ? '#ff9933' : 'rgba(212,175,55,0.65)',
                        }}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Dust particles */}
            {DUST_PARTICLES.map((p) => (
                <div key={`dust-${p.id}`} className="particle" style={{
                    left: p.left, top: p.top,
                    width: p.width, height: p.height, opacity: p.opacity,
                    animation: `float ${p.animDuration} linear infinite`,
                    animationDelay: p.animDelay, zIndex: 3, willChange: 'transform',
                }} />
            ))}
            {SMOKE_PARTICLES.map((p) => (
                <div key={`smoke-${p.id}`} className="smoke-particle" style={{
                    left: p.left, bottom: '-20px', width: p.size, height: p.size,
                    animationDuration: p.animDuration, animationDelay: p.animDelay, zIndex: 3,
                }} />
            ))}
        </section>
    );
}
