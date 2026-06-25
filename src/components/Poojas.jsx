import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

const homams = [
    { title: 'ഗണപതി ഹോമം', desc: 'ശുഭകാര്യങ്ങൾക്ക് മുൻപായി തടസ്സങ്ങൾ നീക്കാനും ഐശ്വര്യം കൊണ്ടുവരാനും.', icon: '🪔' },
    { title: 'സുദർശന ഹോമം', desc: 'ദുഷ്ട ശക്തികളിൽ നിന്നും മഹാ രോഗങ്ങളിൽ നിന്നും സംരക്ഷണം നൽകുന്നു.', icon: '✨' },
    { title: 'ആയുഷ്യ ഹോമം', desc: 'ദീർഘായുസ്സിനും ആരോഗ്യത്തിനുമായി, പ്രത്യേകിച്ച് ജന്മനക്ഷത്രങ്ങളിൽ നടത്തുന്നു.', icon: '🌿' },
    { title: 'മൃത്യുഞ്ജയ ഹോമം', desc: 'അകാല മൃത്യുവിനെ ജയിക്കാൻ ഭഗവാൻ ശിവന് സമർപ്പിക്കുന്ന അതിശക്തമായ കർമ്മം.', icon: '🔱' },
];

const poojas = [
    { title: 'ഭഗവതി പൂജ', desc: 'സംരക്ഷണത്തിനും ഐശ്വര്യത്തിനും ആത്മീയ അനുഗ്രഹത്തിനുമായി ദേവിയെ പ്രാർത്ഥിക്കുന്നു.', icon: '🌸' },
    { title: 'നവഗ്രഹ പൂജ', desc: 'ഗ്രഹദോഷങ്ങൾ അകറ്റാനും അനുകൂല ഫലങ്ങൾ നൽകാനും സഹായിക്കുന്നു.', icon: '🌞' },
    { title: 'ലക്ഷ്മി കുബേര പൂജ', desc: 'കുടുംബത്തിൽ സാമ്പത്തിക സമൃദ്ധിയും സ്ഥിരതയും കൊണ്ടുവരാൻ.', icon: '🪙' },
    { title: 'സത്യനാരായണ പൂജ', desc: 'സമാധാനത്തിനും ഐക്യത്തിനും വേണ്ടി നന്ദി പ്രകാശിപ്പിച്ച് അനുഗ്രഹം തേടുന്നു.', icon: '📖' },
];

function TiltCard({ children, style }) {
    const cardRef = useRef(null);
    const onMouseMove = (e) => {
        const card = cardRef.current; if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, scale: 1.02, z: 20, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
        card.style.setProperty('--tilt-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--tilt-y', `${(y + 0.5) * 100}%`);
    };
    const onMouseLeave = () => gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, scale: 1, z: 0, duration: 0.6, ease: 'elastic.out(1,0.5)', transformPerspective: 900 });
    return (
        <div ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, borderRadius: 'inherit', background: 'radial-gradient(circle at var(--tilt-x,50%) var(--tilt-y,50%), var(--gold-subtle) 0%, transparent 60%)' }} />
            {children}
        </div>
    );
}

export default function Poojas() {
    const titleRef = useTextReveal();
    const sectionRef = useRef(null);
    const cardRefs   = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    { clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)', opacity: 0 },
                    { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)', opacity: 1, duration: 0.9, ease: 'power3.out', delay: (i % 3) * 0.12,
                      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' } }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="poojas" ref={sectionRef} style={{ position: 'relative', padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--parchment)', overflow: 'hidden', width: '100%' }}>
            {/* Parchment texture */}
            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-border-hi), transparent)' }} />

            {/* Warm gold ambient */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(181,149,86,0.07) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '14px' }}>✦ കർമ്മങ്ങളിലൂടെയുള്ള ഭക്തി ✦</span>
                    <h2 ref={titleRef} className="section-title text-brown-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '10px', marginBottom: '24px' }}>
                        പവിത്രമായ കർമ്മങ്ങൾ
                    </h2>
                    <div className="temple-divider reveal-up"><span className="temple-ornament">✦</span></div>
                </div>

                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(16px, 3vw, 28px)' }}>
                    {[...homams, ...poojas].map((item, i) => (
                        <TiltCard key={i} style={{
                            padding: '38px 32px', display: 'flex', flexDirection: 'column',
                            position: 'relative', overflow: 'hidden',
                            background: 'var(--cream)',
                            border: '1px solid rgba(181,149,86,0.28)',
                            boxShadow: '0 10px 40px rgba(21,12,7,0.07)',
                        }}>
                            <div ref={el => cardRefs.current[i] = el} style={{ position: 'absolute', inset: 0 }} />

                            {/* Gold corner ornaments */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '1.5px solid var(--gold-border-hi)', borderLeft: '1.5px solid var(--gold-border-hi)' }} />
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', borderTop: '1.5px solid var(--gold-border-hi)', borderRight: '1.5px solid var(--gold-border-hi)' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', borderBottom: '1.5px solid var(--gold-border-hi)', borderLeft: '1.5px solid var(--gold-border-hi)' }} />
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '1.5px solid var(--gold-border-hi)', borderRight: '1.5px solid var(--gold-border-hi)' }} />

                            {/* Subtle warm glow at top */}
                            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '50px', background: 'radial-gradient(ellipse, rgba(181,149,86,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
                                <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 6px rgba(181,149,86,0.4))' }}>{item.icon}</div>
                            </div>

                            <h3 style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '12px', position: 'relative', zIndex: 2 }}>{item.title}</h3>
                            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: '12px' }} />
                            <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-mid)', marginBottom: '18px', flex: 1, position: 'relative', zIndex: 2 }}>{item.desc}</p>

                            <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="btn-outline-brass"
                                style={{ marginTop: 'auto', width: '100%', position: 'relative', zIndex: 2 }}>
                                🙏 പൂജ ബുക്ക് ചെയ്യുക
                            </a>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
