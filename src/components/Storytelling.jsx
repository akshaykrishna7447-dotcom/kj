import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
    {
        img: '/homam.png',
        label: 'പവിത്ര അഗ്നി',
        align: 'left',
        quote: '"ഭക്തിയുടെ അനശ്വരമായ അഗ്നി കെടാതെ എരിയുന്നു..."',
        sub: 'വരും തലമുറകൾക്കായി ധർമ്മത്തിന്റെ പാത തെളിക്കുന്നു.'
    },
    {
        img: '/lamps.png',
        label: 'നിലവിളക്കുകൾ',
        align: 'right',
        quote: '"തലമുറകളിലൂടെ നമ്മൾ ആ പവിത്രമായ മന്ത്രങ്ങൾ കാത്തുസൂക്ഷിക്കുന്നു..."',
        sub: 'പ്രപഞ്ചത്തിന്റെ താളം തെറ്റാതെ നിലനിൽക്കുന്നു എന്ന് ഉറപ്പുവരുത്തുന്നു.'
    },
    {
        img: '/pooja.png',
        label: 'പൂജാകർമ്മം',
        align: 'left',
        quote: '"ഓരോ മന്ത്രോച്ചാരണത്തിലും പ്രപഞ്ചം പ്രതിധ്വനിക്കുന്നു..."',
        sub: 'മനുഷ്യാത്മാവിനെ ഈശ്വരനുമായി ബന്ധിപ്പിക്കുന്നു.'
    },
];

export default function Storytelling() {
    const sectionRef = useRef(null);

    // Individual refs per scene
    const bgRefs   = useRef([]);   // wrapper div (clip-path target)
    const imgRefs  = useRef([]);   // parallax-img div (scale target)
    const textRefs = useRef([]);   // text overlay div
    const quoteRefs= useRef([]);   // blockquote
    const subRefs  = useRef([]);   // sub paragraph

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── INITIAL STATES ──────────────────────────────────────────────
            // Scene 0: fully visible, image slightly zoomed in as starting point
            gsap.set(imgRefs.current[0],  { scale: 1.08 });
            gsap.set(textRefs.current[0], { opacity: 1, y: 0 });

            // Scenes 1 & 2: hidden below via clip-path, image pre-zoomed
            [1, 2].forEach(i => {
                gsap.set(bgRefs.current[i],   {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                });
                gsap.set(imgRefs.current[i],  { scale: 1.22 });
                gsap.set(textRefs.current[i], { opacity: 0, y: 50 });
            });

            // ── MASTER SCRUB TIMELINE ─────────────────────────────────────
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=350%',       // 3.5× viewport height of scroll
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.5,          // buttery scrub lag
                    anticipatePin: 1,
                },
            });

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // SEGMENT 0→1  (timeline positions 0 – 1.6)
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            // Scene 0 image: slow Ken-Burns zoom while we watch it
            tl.to(imgRefs.current[0], {
                scale: 1.22, ease: 'none', duration: 0.9,
            }, 0);

            // Scene 0 text fades up and out as scroll starts
            tl.to(quoteRefs.current[0], {
                opacity: 0, y: -50, ease: 'none', duration: 0.55,
            }, 0);
            tl.to(subRefs.current[0], {
                opacity: 0, y: -30, ease: 'none', duration: 0.45,
            }, 0.05);

            // Scene 1 wipes up from bottom (clip-path reveal)
            tl.to(bgRefs.current[1], {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'none', duration: 0.9,
            }, 0.55);

            // Scene 1 image zooms back in from big → normal as it enters
            tl.to(imgRefs.current[1], {
                scale: 1.06, ease: 'none', duration: 1.6,
            }, 0.55);

            // Scene 1 text slides in
            tl.to(textRefs.current[1], {
                opacity: 1, y: 0, ease: 'power2.out', duration: 0.5,
            }, 1.1);

            // ── HOLD SCENE 1 (pause in timeline) ──
            tl.to({}, { duration: 0.4 }, 1.6);

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // SEGMENT 1→2  (timeline positions 2.0 – 3.6)
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            // Scene 1 text exits
            tl.to(textRefs.current[1], {
                opacity: 0, y: -50, ease: 'none', duration: 0.5,
            }, 2.0);

            // Scene 1 image continues its Ken-Burns drift
            tl.to(imgRefs.current[1], {
                scale: 1.22, ease: 'none', duration: 0.8,
            }, 2.0);

            // Scene 2 wipes up
            tl.to(bgRefs.current[2], {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'none', duration: 0.9,
            }, 2.5);

            // Scene 2 image zooms back in
            tl.to(imgRefs.current[2], {
                scale: 1.06, ease: 'none', duration: 1.6,
            }, 2.5);

            // Scene 2 text slides in
            tl.to(textRefs.current[2], {
                opacity: 1, y: 0, ease: 'power2.out', duration: 0.5,
            }, 3.0);

            // ── HOLD SCENE 2 ──
            tl.to({}, { duration: 0.4 }, 3.6);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background: '#1E0A03',
            }}
        >
            {/* Fixed Header — stays on top across all scenes */}
            <div style={{
                position: 'absolute', top: '7vh', left: 0, width: '100%',
                textAlign: 'center', zIndex: 50, pointerEvents: 'none',
            }}>
                <span className="section-eyebrow" style={{ letterSpacing: '0.4em', marginBottom: '10px' }}>
                    ✦ ഒരു ദൃശ്യയാത്ര ✦
                </span>
                <h2 className="section-title text-gold-gradient" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', marginTop: '6px' }}>
                    ജീവിക്കുന്ന പാരമ്പര്യം
                </h2>
                <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A017, transparent)', margin: '14px auto 0' }} />
            </div>

            {/* Scene stack — all scenes layered, clip-path reveals them */}
            <div style={{ position: 'absolute', inset: 0 }}>
                {scenes.map((scene, i) => (
                    <div
                        key={i}
                        ref={el => bgRefs.current[i] = el}
                        style={{
                            position: 'absolute', inset: 0,
                            zIndex: i + 1,
                            // Scene 0 starts fully open; others start clipped
                            clipPath: i === 0
                                ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                            willChange: 'clip-path',
                        }}
                    >
                        {/* Parallax / Ken-Burns image */}
                        <div
                            ref={el => imgRefs.current[i] = el}
                            style={{
                                position: 'absolute',
                                inset: '-12%',   // extra bleed for scale room
                                backgroundImage: `url(${scene.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                willChange: 'transform',
                                transformOrigin: 'center center',
                                // start zoomed in; GSAP sets exact value in useEffect
                                transform: 'scale(1.08)',
                            }}
                        />

                        {/* Dark cinematic overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(180deg, rgba(42,18,6,0.5) 0%, rgba(42,18,6,0.18) 40%, rgba(42,18,6,0.78) 100%)',
                        }} />

                        {/* Side gradient for text legibility */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: scene.align === 'left'
                                ? 'linear-gradient(105deg, rgba(42,18,6,0.92) 0%, rgba(42,18,6,0.48) 52%, transparent 100%)'
                                : 'linear-gradient(255deg, rgba(42,18,6,0.92) 0%, rgba(42,18,6,0.48) 52%, transparent 100%)',
                        }} />

                        {/* Saffron flame glow at bottom */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                            background: 'linear-gradient(0deg, rgba(204,85,0,0.14) 0%, transparent 100%)',
                        }} />

                        {/* Text Content */}
                        <div
                            ref={el => textRefs.current[i] = el}
                            style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', alignItems: 'center',
                                paddingTop: '18vh',
                                // Scenes 1+ start hidden (set in useEffect)
                                opacity: i === 0 ? 1 : 0,
                                transform: i === 0 ? 'translateY(0)' : 'translateY(50px)',
                            }}
                        >
                            <div style={{
                                maxWidth: '1280px', margin: '0 auto',
                                padding: '0 5vw', width: '100%',
                            }}>
                                <div style={{
                                    maxWidth: '580px',
                                    marginLeft: scene.align === 'right' ? 'auto' : '0',
                                    textAlign: scene.align === 'right' ? 'right' : 'left',
                                }}>
                                    {/* Scene label */}
                                    <span style={{
                                        fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                                        fontSize: '0.68rem', letterSpacing: '0.35em',
                                        textTransform: 'uppercase', color: '#D4A017',
                                        display: 'block', marginBottom: '18px',
                                        filter: 'drop-shadow(0 0 8px rgba(212,160,23,0.5))',
                                    }}>{scene.label}</span>

                                    {/* Quote */}
                                    <blockquote
                                        ref={el => quoteRefs.current[i] = el}
                                        style={{
                                            fontFamily: "'Noto Serif Malayalam', serif",
                                            fontStyle: 'italic',
                                            fontSize: 'clamp(1.8rem, 3.2vw, 3.2rem)',
                                            color: '#F5EDD8', lineHeight: 1.25,
                                            marginBottom: '24px', marginTop: '0',
                                            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                                        }}
                                    >{scene.quote}</blockquote>

                                    {/* Gold line */}
                                    <div style={{
                                        width: '70px', height: '1px',
                                        background: 'linear-gradient(90deg, #D4A017, transparent)',
                                        marginBottom: '20px',
                                        marginLeft: scene.align === 'right' ? 'auto' : '0',
                                    }} />

                                    {/* Sub text */}
                                    <p
                                        ref={el => subRefs.current[i] = el}
                                        style={{
                                            fontFamily: "'Manrope', sans-serif", fontSize: '1.05rem',
                                            maxWidth: '420px', lineHeight: 1.75,
                                            color: 'rgba(253,244,227,0.8)',
                                            marginLeft: scene.align === 'right' ? 'auto' : '0',
                                        }}
                                    >{scene.sub}</p>
                                </div>
                            </div>
                        </div>

                        {/* Scene counter */}
                        <div style={{
                            position: 'absolute', bottom: '36px', right: '44px', zIndex: 5,
                            fontFamily: "'Manrope', sans-serif", fontWeight: 500,
                            fontSize: '0.68rem', letterSpacing: '0.25em',
                            color: 'rgba(212,160,23,0.35)',
                        }}>
                            {String(i + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
