import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: '30+', label: 'Years of Practice' },
    { number: '1000+', label: 'Rituals Performed' },
    { number: '12+', label: 'Vedic Disciplines' },
    { number: '5+', label: 'Sacred Lineages' },
];

export default function About() {
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current,
                { yPercent: -15 },
                {
                    yPercent: 15, ease: 'none',
                    scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" style={{ position: 'relative', padding: '120px 0', background: '#140502', overflow: 'hidden' }}>
            <div ref={bgRef} style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/portrait.png)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.1, willChange: 'transform' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '16px', letterSpacing: '0.5em' }}>✦ The Custodian of Tradition ✦</span>
                    <h2 className="reveal-up section-title text-gold-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginTop: '10px', marginBottom: '24px' }}>
                        Jayarajan Namboothiri
                    </h2>
                    <div className="devotional-divider reveal-up"><span className="om-ornament"></span></div>
                </div>

                {/* Stats strip */}
                <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(212,175,55,0.12)', marginBottom: '80px', border: '1px solid rgba(212,175,55,0.12)' }}>
                    {stats.map((s) => (
                        <div key={s.label} style={{ textAlign: 'center', padding: '28px 20px', background: 'rgba(14,3,1,0.85)' }}>
                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#ff9933', textShadow: '0 0 20px rgba(255,100,0,0.4)', lineHeight: 1 }}>{s.number}</p>
                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.72rem', letterSpacing: '0.2em', color: 'rgba(253,245,230,0.5)', marginTop: '8px', textTransform: 'uppercase' }}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '64px', alignItems: 'start' }}>
                    {/* Portrait */}
                    <div className="reveal-left">
                        <div style={{ position: 'relative', border: '1px solid rgba(255,153,51,0.25)', boxShadow: '0 8px 60px rgba(139,0,0,0.4)' }}>
                            <img src="/portrait.png" alt="Jayarajan Namboothiri" style={{ width: '100%', objectFit: 'cover', objectPosition: 'top', maxHeight: '580px', display: 'block' }} />
                            {[[12, null, 12, null], [12, null, null, 12], [null, 12, 12, null], [null, 12, null, 12]].map(([t, b, l, r], i) => (
                                <div key={i} style={{ position: 'absolute', top: t !== null ? `${t}px` : 'auto', bottom: b !== null ? `${b}px` : 'auto', left: l !== null ? `${l}px` : 'auto', right: r !== null ? `${r}px` : 'auto', width: '28px', height: '28px', borderTop: t !== null && (l !== null || r !== null) ? '1.5px solid #ff9933' : 'none', borderLeft: l !== null ? '1.5px solid #ff9933' : 'none', borderRight: r !== null ? '1.5px solid #ff9933' : 'none', borderBottom: b !== null ? '1.5px solid #ff9933' : 'none' }} />
                            ))}
                        </div>

                        <div style={{ padding: '24px', marginTop: '16px', textAlign: 'center', background: 'rgba(22,7,3,0.9)', border: '1px solid rgba(212,175,55,0.12)' }}>
                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#d4af37', marginBottom: '8px', textShadow: '0 0 10px rgba(255,153,51,0.5)' }}>
                                "യത്ര വിദ്യാ തത്ര ദേവാഃ"
                            </p>
                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.67rem', letterSpacing: '0.25em', color: 'rgba(253,245,230,0.6)', textTransform: 'uppercase' }}>
                                Where wisdom dwells, the divine resides
                            </p>
                        </div>
                    </div>

                    {/* Text */}
                    <div style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '36px' }}>
                        {[
                            {
                                title: 'Sacred Lineage (Parambara)',
                                body: 'Born into the ancient and revered Kottivattam Namboothiri family of Calicut, Jayarajan Namboothiri is the living embodiment of a tradition spanning more than a millennium. His lineage traces to revered Vedic scholars who were entrusted with the most sacred temple rituals across northern Kerala — a trust that has never been broken.'
                            },
                            {
                                title: 'Spiritual Journey',
                                body: 'From his earliest years, Jayarajan Namboothiri underwent rigorous training in Vedic disciplines — mastering intricate recitations (svara), ritual procedures (kriya), and deep meditative practices (dhyana) that form the bedrock of authentic Brahminic tradition. He completed advanced Vedic studies under esteemed scholars in Thrissur and at the sacred precincts of Guruvayur.'
                            },
                            {
                                title: 'A Life of Devoted Service',
                                body: 'For over three decades, Namboothiriji has dedicated his life to performing sacred rituals for thousands of families across Kerala, Karnataka, and Tamil Nadu. He is renowned for his uncompromising adherence to the original Vedic texts, his mastery of the Trikala Sandhyavandanam, and his ability to guide even the most complex rituals with precision, grace, and profound spiritual presence.'
                            },
                        ].map((item, i) => (
                            <div key={i} className="reveal-up">
                                <h3 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '1.05rem', color: '#d4af37', marginBottom: '14px' }}>{item.title}</h3>
                                <p className="section-subtitle" style={{ fontSize: '0.98rem', lineHeight: 1.85 }}>{item.body}</p>
                                {i < 2 && <div className="divider-gold" style={{ marginTop: '28px' }} />}
                            </div>
                        ))}

                        <div className="reveal-up">
                            <h3 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '1.1rem', color: '#d4af37', marginBottom: '20px', letterSpacing: '0.1em' }}>Ritual Expertise</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {['Ganapathi Homam', 'Sudarshana Homam', 'Bhagavathy Pooja', 'Navagraha Pooja', 'Satyanarayana Katha', 'Ayushya Homam', 'Mrityunjaya Homam', 'Lakshmi Kubera Pooja'].map((r) => (
                                    <div key={r} style={{ padding: '10px 16px', fontSize: '0.82rem', fontFamily: "'Noto Serif Malayalam', serif", color: 'rgba(253,245,230,0.85)', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(22,7,3,0.85)', border: '1px solid rgba(212,175,55,0.1)' }}>
                                        <span style={{ color: '#ff9933', fontSize: '1rem' }}>✦</span>{r}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
