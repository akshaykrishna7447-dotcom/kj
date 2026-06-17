import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagnetic } from '../hooks/useMagnetic';
gsap.registerPlugin(ScrollTrigger);

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left:  `${(i * 5.7 + 3) % 100}%`,
    top:   `${(i * 13.3 + 6) % 100}%`,
    size:  `${1.2 + (i % 3) * 0.8}px`,
    opacity: 0.3 + (i % 5) * 0.07,
    dur:  `${9 + (i % 7) * 2.5}s`,
    delay:`${(i % 9) * 1.3}s`,
    color: i % 2 === 0 ? '#B59556' : '#D6B56F',
}));

const MARQUEE = [
    'Authentic Heritage','✦','Vedic Tradition','✦',
    'Sacred Rituals','✦','Divine Grace','✦',
    'Kerala Architecture','✦','Spiritual Sanctuary','✦',
    'Authentic Heritage','✦','Vedic Tradition','✦',
];

export default function Hero({ isLoaded }) {
    const heroRef    = useRef(null);
    const bgRef      = useRef(null);
    const contentRef = useRef(null);
    const marqueeRef = useRef(null);
    const charsRef   = useRef([]);
    const subtitleRef= useRef(null);
    const bodyRef    = useRef(null);
    const ctaRef     = useRef(null);
    const dividerRef = useRef(null);
    const magneticBtn1 = useMagnetic({ strength: 0.3, radius: 100 });
    const magneticBtn2 = useMagnetic({ strength: 0.3, radius: 100 });

    useEffect(() => {
        if (!isLoaded) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo(charsRef.current,
                { yPercent: 110, opacity: 0, rotateX: -60, skewX: 8 },
                { yPercent: 0, opacity: 1, rotateX: 0, skewX: 0, duration: 1.1, stagger: 0.055, transformOrigin: 'bottom center' }
            )
            .fromTo(dividerRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }, '-=0.6'
            )
            .fromTo(bodyRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1 }, '-=0.5'
            )
            .fromTo(ctaRef.current,
                { opacity: 0, y: 16, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8 }, '-=0.6'
            );

            ScrollTrigger.create({ trigger: heroRef.current, start: 'top top', end: '+=100%', pin: true, pinSpacing: false });

            gsap.fromTo(bgRef.current, { yPercent: 0, scale: 1 },
                { yPercent: 18, scale: 1.22, ease: 'none', force3D: true,
                  scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '+=100%', scrub: 1 } });
            gsap.to(bgRef.current, { scale: '+=0.007', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true });
            gsap.fromTo(contentRef.current, { y: -15, opacity: 1 },
                { y: -130, opacity: 0, scale: 0.97, ease: 'none',
                  scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '+=80%', scrub: 1 } });
            gsap.to(marqueeRef.current, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
        }, heroRef);

        return () => ctx.revert();
    }, [isLoaded]);

    const letters = [...new Intl.Segmenter('ml', { granularity: 'grapheme' }).segment('കൊറ്റിവട്ടത്ത് ഇല്ലം')].map(x => x.segment);

    return (
        <section id="hero" ref={heroRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Background image */}
            <div ref={bgRef} style={{
                position: 'absolute', inset: -40,
                backgroundImage: 'url(/temple.png)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                transformOrigin: 'center center',
                willChange: 'transform', transform: 'translateZ(0)',
            }} />

            {/* Dark black grading overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.95) 100%)', zIndex: 2 }} />
            {/* Warm gold radial centre glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(181,149,86,0.12) 0%, transparent 70%)', zIndex: 2 }} />
            {/* Side vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(21,12,7,0.7) 0%, transparent 30%, transparent 70%, rgba(21,12,7,0.7) 100%)', zIndex: 2 }} />

            {/* Warm gold top lintel */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #B59556, #D6B56F, #B59556, transparent)', zIndex: 10 }} />

            {/* Hero content */}
            <div ref={contentRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1200px', width: '100%', padding: '0 32px', transform: 'translateY(-15px)' }}>

                <h1 style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'visible' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.02em', overflow: 'visible', paddingBottom: '0.2em' }}>
                        {letters.map((char, i) => (
                            <span key={i} ref={el => charsRef.current[i] = el} style={{
                                display: 'inline-block',
                                fontFamily: "'Nehana','Noto Serif Malayalam',serif",
                                fontWeight: 'normal',
                                fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                                lineHeight: 1.3,
                                paddingRight: '0.15em', marginRight: '-0.15em',
                                background: 'linear-gradient(180deg, #D6B56F 0%, #B59556 50%, #8C703C 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                filter: 'drop-shadow(0 4px 16px rgba(181,149,86,0.35))',
                                willChange: 'transform', transformStyle: 'preserve-3d', opacity: 0,
                            }}>{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                    </span>
                </h1>

                <div ref={dividerRef} style={{ maxWidth: '420px', margin: '34px auto', display: 'flex', alignItems: 'center', gap: '20px', transformOrigin: 'center' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(181,149,86,0.75))' }} />
                    <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 0 10px rgba(181,149,86,0.9))', animation: 'flicker 3s ease-in-out infinite' }}>🪔</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(181,149,86,0.75), transparent)' }} />
                </div>

                <div ref={dividerRef} className="temple-divider" style={{ opacity: 0, margin: '24px auto', width: '200px' }}>
                    <span className="temple-ornament">✦</span>
                </div>

                <p ref={bodyRef} className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px', color: '#FDF4E3', textShadow: '0 2px 12px rgba(0,0,0,0.9)', opacity: 0 }}>
                    കേരളത്തിന്റെ പ്രാചീന വൈദിക പൈതൃകം അചഞ്ചലമായ ഭക്തിയിലൂടെയും കാലാതീതമായ ആചാരങ്ങളിലൂടെയും കാത്തുസൂക്ഷിക്കുന്നു.
                </p>

                <div ref={ctaRef} style={{ display: 'flex', justifyContent: 'center', gap: '16px', opacity: 0 }}>
                    <div ref={magneticBtn1}>
                        <a href="#contact" className="btn-gold" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            🙏 വഴിപാട് അർപ്പിക്കുക
                        </a>
                    </div>
                    <div ref={magneticBtn2}>
                        <a href="#illam" className="btn-outline-gold-dark" onClick={e => { e.preventDefault(); document.querySelector('#illam')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            പൈതൃകം അറിയുക
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(181,149,86,0.65)', textTransform: 'uppercase' }}>Scroll</span>
                <div style={{ width: '1px', height: '46px', background: 'linear-gradient(180deg, rgba(181,149,86,0.7), transparent)', animation: 'float 2s ease-in-out infinite' }} />
            </div>

            {/* Marquee strip — warm parchment */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, overflow: 'hidden', borderTop: '1px solid rgba(181,149,86,0.25)', background: 'rgba(21,12,7,0.88)', padding: '10px 0' }}>
                <div ref={marqueeRef} style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', width: 'max-content' }}>
                    {[...MARQUEE, ...MARQUEE].map((item, i) => (
                        <span key={i} style={{
                            fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.67rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                            color: item === '✦' ? '#B59556' : 'rgba(243,233,210,0.55)',
                        }}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Warm gold particles */}
            {PARTICLES.map(p => (
                <div key={`p-${p.id}`} className="particle" style={{
                    left: p.left, top: p.top, width: p.size, height: p.size,
                    opacity: p.opacity, background: p.color,
                    boxShadow: `0 0 6px ${p.color}`,
                    animation: `float ${p.dur} linear infinite`,
                    animationDelay: p.delay, zIndex: 3,
                }} />
            ))}
        </section>
    );
}
