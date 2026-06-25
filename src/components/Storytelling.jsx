import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
    {
        img: '/homam.png',
        label: 'പവിത്ര അഗ്നി',
        quote: '"ഭക്തിയുടെ അനശ്വരമായ അഗ്നി കെടാതെ എരിയുന്നു..."',
        sub: 'വരും തലമുറകൾക്കായി ധർമ്മത്തിന്റെ പാത തെളിക്കുന്നു.'
    },
    {
        img: '/lamps.png',
        label: 'നിലവിളക്കുകൾ',
        quote: '"തലമുറകളിലൂടെ നമ്മൾ ആ പവിത്രമായ മന്ത്രങ്ങൾ കാത്തുസൂക്ഷിക്കുന്നു..."',
        sub: 'പ്രപഞ്ചത്തിന്റെ താളം തെറ്റാതെ നിലനിൽക്കുന്നു എന്ന് ഉറപ്പുവരുത്തുന്നു.'
    },
    {
        img: '/pooja.png',
        label: 'പൂജാകർമ്മം',
        quote: '"ഓരോ മന്ത്രോച്ചാരണത്തിലും പ്രപഞ്ചം പ്രതിധ്വനിക്കുന്നു..."',
        sub: 'മനുഷ്യാത്മാവിനെ ഈശ്വരനുമായി ബന്ധിപ്പിക്കുന്നു.'
    },
];

export default function Storytelling() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    
    // Arrays for GSAP targets
    const imgRefs = useRef([]);
    const textRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial setup
            // Images start slightly zoomed and translated down for parallax
            gsap.set(imgRefs.current, { opacity: 0, yPercent: 15, scale: 1.08 });
            gsap.set(textRefs.current, { opacity: 0, y: 40 });
            
            // Show first scene
            gsap.set(imgRefs.current[0], { opacity: 1 });
            gsap.set(textRefs.current[0], { opacity: 1, y: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=350%', // extra scroll room for parallax
                    pin: true,
                    scrub: 1.5, // smoother scrub
                }
            });

            // --- Scene 0 ---
            // Parallax motion (spans longer than the fade out)
            tl.to(imgRefs.current[0], { yPercent: -15, scale: 1, duration: 2, ease: 'none' }, 0);
            tl.to(textRefs.current[0], { opacity: 0, y: -40, duration: 0.8 }, 0.5);
            tl.to(imgRefs.current[0], { opacity: 0, duration: 1 }, 0.8);

            // --- Scene 1 ---
            tl.to(imgRefs.current[1], { opacity: 1, duration: 1 }, 0.8);
            // Parallax motion for scene 1 starts as it fades in
            tl.to(imgRefs.current[1], { yPercent: -15, scale: 1, duration: 2.5, ease: 'none' }, 0.8);
            tl.to(textRefs.current[1], { opacity: 1, y: 0, duration: 0.8 }, 1.3);
            
            // Scene 1 fades out
            tl.to(textRefs.current[1], { opacity: 0, y: -40, duration: 0.8 }, 2.8);
            tl.to(imgRefs.current[1], { opacity: 0, duration: 1 }, 3.1);

            // --- Scene 2 ---
            tl.to(imgRefs.current[2], { opacity: 1, duration: 1 }, 3.1);
            // Parallax motion for scene 2
            tl.to(imgRefs.current[2], { yPercent: -15, scale: 1, duration: 2, ease: 'none' }, 3.1);
            tl.to(textRefs.current[2], { opacity: 1, y: 0, duration: 0.8 }, 3.6);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="storytelling-editorial"
            style={{
                position: 'relative',
                background: 'var(--cream)',
                overflow: 'hidden',
                width: '100%',
                height: '100vh', 
            }}
        >
            {/* Subtle Texture */}
            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

            {/* Main Layout Container */}
            <div
                ref={containerRef}
                className="storytelling-editorial-layout"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    zIndex: 10,
                }}
            >
                {/* Left Side: Typography */}
                <div className="editorial-left" style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', top: '80px', left: '80px' }} className="editorial-header">
                        <span style={{ 
                            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                            fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', 
                            color: 'var(--gold)', display: 'block', marginBottom: '8px' 
                        }}>
                            ✦ ഒരു ദൃശ്യയാത്ര ✦
                        </span>
                        <h2 className="text-brown-gradient" style={{ 
                            fontFamily: "'Noto Serif Malayalam', serif",
                            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', margin: 0,
                            lineHeight: 1.1
                        }}>
                            ജീവിക്കുന്ന<br/>പാരമ്പര്യം
                        </h2>
                    </div>

                    <div style={{ position: 'relative', height: '300px', width: '100%', maxWidth: '500px', marginTop: '60px' }}>
                        {scenes.map((scene, i) => (
                            <div
                                key={`text-${i}`}
                                ref={el => textRefs.current[i] = el}
                                style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    willChange: 'opacity, transform',
                                }}
                            >
                                <span style={{
                                    fontFamily: "'Manrope', sans-serif", fontWeight: 800,
                                    fontSize: '0.68rem', letterSpacing: '0.35em',
                                    textTransform: 'uppercase', color: '#B5863D',
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    marginBottom: '20px',
                                }}>
                                    <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>✦</span>
                                    {scene.label}
                                </span>
                                
                                <blockquote style={{
                                    fontFamily: "'Noto Serif Malayalam', serif",
                                    fontStyle: 'italic',
                                    fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                                    color: '#352216', lineHeight: 1.4,
                                    marginBottom: '20px', marginTop: '0',
                                }}>{scene.quote}</blockquote>

                                <div style={{
                                    width: '60px', height: '1.5px',
                                    background: '#C29F64',
                                    marginBottom: '20px',
                                }} />

                                <p style={{
                                    fontFamily: "'Manrope', sans-serif", fontSize: '1.05rem',
                                    lineHeight: 1.7, color: 'rgba(53,34,22,0.75)',
                                    margin: 0, fontWeight: 500
                                }}>{scene.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Imagery */}
                <div className="editorial-right" style={{
                    flex: '1.2',
                    padding: '40px',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px rgba(21,12,7,0.15)',
                    }}>
                        {scenes.map((scene, i) => (
                            <div
                                key={`img-${i}`}
                                ref={el => imgRefs.current[i] = el}
                                style={{
                                    position: 'absolute', 
                                    inset: '-15% 0 -15% 0', // Extended height for parallax
                                    backgroundImage: `url(${scene.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    willChange: 'opacity, transform',
                                }}
                            />
                        ))}
                        {/* Soft elegant vignette */}
                        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)', pointerEvents: 'none' }} />
                    </div>
                </div>
            </div>
            
            {/* Scroll progress line */}
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '1px', height: '60px',
                background: 'linear-gradient(180deg, var(--gold), transparent)',
                zIndex: 10
            }} />
        </section>
    );
}
