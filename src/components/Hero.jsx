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
                { opacity: 0, filter: 'blur(10px)' },
                { opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.06, ease: 'power2.out' }
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

            // Remove pin completely for a seamless scroll into History
            // True parallax: move background image slightly slower than scroll
            gsap.fromTo(bgRef.current, { yPercent: 0, scale: 1.1 },
                { yPercent: 30, scale: 1.1, ease: 'none', force3D: true,
                  scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to(bgRef.current, { scale: '+=0.007', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true });
            gsap.fromTo(contentRef.current, { y: -15, opacity: 1 },
                { y: 100, opacity: 0, scale: 0.95, ease: 'none',
                  scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
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
                animation: 'subtle-pan 30s ease-in-out infinite',
                willChange: 'transform', transform: 'translateZ(0)',
            }} />

            {/* Dark cinematic overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(21,12,7,0.9) 0%, rgba(21,12,7,0.6) 40%, rgba(21,12,7,0.95) 100%)', zIndex: 2 }} />
            {/* Warm gold radial centre glow (God Rays effect) */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(181,149,86,0.25) 0%, rgba(181,149,86,0.05) 40%, transparent 70%)', zIndex: 2 }} />
            {/* Side vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(21,12,7,0.8) 0%, transparent 25%, transparent 75%, rgba(21,12,7,0.8) 100%)', zIndex: 2 }} />

            {/* Warm gold top lintel */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #B59556, #D6B56F, #B59556, transparent)', zIndex: 10 }} />

            {/* Hero content */}
            <div ref={contentRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1200px', width: '100%', padding: '0 32px', transform: 'translateY(30px)' }}>

                <h1 style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'visible' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.02em', overflow: 'visible', paddingBottom: '0.2em' }}>
                        {letters.map((char, i) => (
                            <span key={i} ref={el => charsRef.current[i] = el} style={{
                                display: 'inline-block',
                                fontFamily: "'Noto Serif Malayalam',serif",
                                fontWeight: 400,
                                fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                                lineHeight: 1.3,
                                background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF4E3 25%, #D6B56F 60%, #B59556 85%, #8C703C 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                filter: 'drop-shadow(0 8px 24px rgba(181,149,86,0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 45px rgba(0,0,0,0.85))',
                                willChange: 'opacity, filter', opacity: 0,
                            }}>{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                    </span>
                </h1>

                <div ref={dividerRef} style={{ maxWidth: '420px', margin: '10px auto 40px', display: 'flex', alignItems: 'center', gap: '20px', transformOrigin: 'center' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(181,149,86,0.9))' }} />
                    <span style={{ fontSize: '1.4rem', color: '#B59556', filter: 'drop-shadow(0 0 14px rgba(181,149,86,0.9))' }}>✦</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(181,149,86,0.9), transparent)' }} />
                </div>

                <div ref={bodyRef} style={{ opacity: 0, display: 'flex', justifyContent: 'center' }}>
                    <p className="hero-subtitle" style={{
                        maxWidth: '720px', margin: '0 auto 50px', color: '#FDF4E3',
                        fontFamily: "'Noto Serif Malayalam',serif",
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.8)',
                        lineHeight: 1.8, letterSpacing: '0.04em',
                        textAlign: 'center'
                    }}>
                        കേരളത്തിന്റെ പ്രാചീന വൈദിക പൈതൃകം അചഞ്ചലമായ ഭക്തിയിലൂടെയും കാലാതീതമായ ആചാരങ്ങളിലൂടെയും കാത്തുസൂക്ഷിക്കുന്നു.
                    </p>
                </div>

                <div ref={ctaRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', opacity: 0, flexWrap: 'wrap' }}>
                    <div ref={magneticBtn1}>
                        <a href="#contact" className="btn-gold" style={{ boxShadow: '0 0 24px rgba(181,149,86,0.3)', padding: '16px 36px', fontSize: '1.05rem' }} onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            🙏 വഴിപാട് അർപ്പിക്കുക
                        </a>
                    </div>
                    <div ref={magneticBtn2}>
                        <a href="#illam" className="btn-outline-brass" style={{ padding: '16px 36px', fontSize: '1.05rem', background: 'rgba(21,12,7,0.4)', backdropFilter: 'blur(4px)' }} onClick={e => { e.preventDefault(); document.querySelector('#illam')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            പൈതൃകം അറിയുക
                        </a>
                    </div>
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
