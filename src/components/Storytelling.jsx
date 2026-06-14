import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
    { img: '/homam.png', quote: '"From generations, the sacred fire continues..."', sub: 'The flames of devotion never extinguish — they pass from hand to hand, heart to heart.', label: 'The Sacred Fire', align: 'left' },
    { img: '/lamps.png', quote: '"In the glow of a thousand lamps, divinity is present."', sub: 'Every oil lamp lit is an act of surrender — a prayer made visible to the divine.', label: 'The Oil Lamps', align: 'right' },
    { img: '/pooja.png', quote: '"The ritual is not merely performed. It is lived."', sub: 'Each mantra chanted is a vibration that ripples through the fabric of the cosmos.', label: 'The Ritual', align: 'left' },
];

export default function Storytelling() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%',
                    scrub: 1.2,
                    pin: true,
                }
            });

            // ── Initial setup ──
            gsap.set('.story-bg-1, .story-bg-2', { opacity: 0 });
            gsap.set('.story-bg-1 .parallax-img, .story-bg-2 .parallax-img', { scale: 1.18 });
            gsap.set('.story-bg-0 .parallax-img', { scale: 1.05 });
            gsap.set('.story-text-1, .story-text-2', { opacity: 0, y: 60 });
            gsap.set('.story-clip-1, .story-clip-2', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' });

            // ── SCENE 0 → SCENE 1 ──
            tl
                // bg0 image zooms out slowly
                .to('.story-bg-0 .parallax-img', { scale: 1.12, ease: 'none', duration: 1 }, 0)
                // text0 slides up and fades
                .to('.story-text-0 .story-quote', { opacity: 0, y: -40, duration: 0.8, ease: 'none' }, 0)
                .to('.story-text-0 .story-sub', { opacity: 0, y: -20, duration: 0.6, ease: 'none' }, 0.1)

                // clip-path wipe reveals scene 1 image from bottom
                .to('.story-clip-1', { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 1, ease: 'none' }, 0.6)
                .to('.story-bg-1 .parallax-img', { scale: 1.04, ease: 'none', duration: 2 }, 0.6)
                // text1 slides up
                .to('.story-text-1', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.1)

                // PAUSE
                .to({}, { duration: 1.2 })

                // ── SCENE 1 → SCENE 2 ──
                .to('.story-text-1', { opacity: 0, y: -50, duration: 0.8, ease: 'none' }, 2.5)
                .to('.story-bg-1 .parallax-img', { scale: 1.12, ease: 'none', duration: 1 }, 2.5)

                .to('.story-clip-2', { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 1, ease: 'none' }, 3.1)
                .to('.story-bg-2 .parallax-img', { scale: 1.04, ease: 'none', duration: 2 }, 3.1)
                .to('.story-text-2', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 3.6)

                // PAUSE
                .to({}, { duration: 1.2 });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0201' }}>

            {/* Header */}
            <div style={{ position: 'absolute', top: '8vh', left: '0', width: '100vw', textAlign: 'center', zIndex: 50, pointerEvents: 'none' }}>
                <span className="section-eyebrow" style={{ marginBottom: '12px', letterSpacing: '0.5em', textShadow: '0 4px 10px rgba(0,0,0,0.9)' }}>✦ A Cinematic Journey ✦</span>
                <h2 className="section-title text-gold-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: '6px' }}>
                    The Living Tradition
                </h2>
            </div>

            {/* Stacked scenes */}
            <div style={{ position: 'absolute', inset: 0 }}>
                {scenes.map((scene, i) => (
                    <div
                        key={`scene-${i}`}
                        className={`story-bg-${i} story-clip-${i}`}
                        style={{
                            position: 'absolute', inset: 0, zIndex: i + 1,
                            willChange: 'opacity, transform, clip-path',
                            clipPath: i === 0 ? 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)' : undefined,
                        }}
                    >
                        {/* Parallax bg image */}
                        <div className="parallax-img" style={{
                            position: 'absolute', inset: '-8%',
                            backgroundImage: `url(${scene.img})`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            willChange: 'transform',
                        }} />

                        {/* Color grade overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(10,2,1,0.3) 0%, rgba(10,2,1,0.1) 40%, rgba(10,2,1,0.6) 100%)` }} />
                        <div style={{ position: 'absolute', inset: 0, background: scene.align === 'left' ? 'linear-gradient(100deg, rgba(10,2,1,0.85) 0%, rgba(10,2,1,0.3) 55%, transparent 100%)' : 'linear-gradient(260deg, rgba(10,2,1,0.85) 0%, rgba(10,2,1,0.3) 55%, transparent 100%)' }} />

                        {/* Text */}
                        <div className={`story-text-${i}`} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', width: '100%', marginTop: '10vh' }}>
                                <div style={{ maxWidth: '560px', marginLeft: scene.align === 'right' ? 'auto' : '0', textAlign: scene.align === 'right' ? 'right' : 'left' }}>

                                    <span className="section-eyebrow" style={{ marginBottom: '20px', letterSpacing: '0.45em', color: '#ff9933' }}>{scene.label}</span>

                                    {/* Large quote — split into separate els for individual animation */}
                                    <blockquote className="story-quote" style={{ fontFamily: "'Noto Serif Malayalam', serif", fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.2vw, 3.2rem)', color: '#fdf5e6', lineHeight: 1.25, marginBottom: '24px', marginTop: '14px', textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
                                        {scene.quote}
                                    </blockquote>

                                    <div className="divider-gold" style={{ width: '80px', marginBottom: '20px', marginLeft: scene.align === 'right' ? 'auto' : '0', opacity: 0.7 }} />

                                    <p className="story-sub section-subtitle" style={{ fontSize: '1.1rem', maxWidth: '420px', marginLeft: scene.align === 'right' ? 'auto' : '0', lineHeight: 1.7, color: 'rgba(253,245,230,0.8)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                        {scene.sub}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Scene counter */}
                        <div style={{ position: 'absolute', bottom: '40px', right: '48px', zIndex: 5, fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(212,175,55,0.4)' }}>
                            {String(i + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
