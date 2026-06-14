import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const poojas = [
    { name: 'Ganapathi Homam', sanskrit: 'ഗണപതി ഹോമം', description: 'A sacred fire ritual invoking Lord Ganesha to remove obstacles and bestow divine blessings at the beginning of any endeavour.', benefits: ['Removal of obstacles', 'Success in new beginnings', 'Divine protection'], duration: '2–3 Hrs', icon: '🔥' },
    { name: 'Sudarshana Homam', sanskrit: 'സുദർശന ഹോമം', description: 'A powerful Vedic fire ritual dedicated to the divine discus of Lord Vishnu, performed for protection from negative energies.', benefits: ['Protection & safety', 'Destruction of negativity', 'Victory over adversaries'], duration: '3–4 Hrs', icon: '⚡' },
    { name: 'Bhagavathy Pooja', sanskrit: 'ഭഗവതി പൂജ', description: 'A devotional offering to the supreme Goddess in her fierce and benevolent form, invoked for strength, prosperity, and divine grace.', benefits: ['Prosperity & abundance', 'Strength & courage', 'Divine feminine grace'], duration: '2–3 Hrs', icon: '🌸' },
    { name: 'Navagraha Pooja', sanskrit: 'നവഗ്രഹ പൂജ', description: 'A comprehensive ritual propitiating all nine planetary deities to harmonize cosmic influences and bring peace and fortune.', benefits: ['Planetary harmony', 'Relief from doshas', 'Positive influence'], duration: '3–5 Hrs', icon: '⭐' },
    { name: 'Satyanarayana Katha', sanskrit: 'സത്യനാരായണ കഥ', description: 'A sacred reading and offering to Lord Vishnu performed on auspicious occasions for blessings and fulfilment of wishes.', benefits: ['Fulfilment of wishes', 'Family harmony', 'Divine grace'], duration: '1.5–2 Hrs', icon: '📿' },
    { name: 'Ayushya Homam', sanskrit: 'ആയുഷ്യ ഹോമം', description: 'An ancient fire ritual dedicated to the deity of longevity, performed to bless individuals with long life, health, and freedom from disease.', benefits: ['Longevity & vitality', 'Relief from illness', 'Holistic wellbeing'], duration: '2 Hrs', icon: '🌿' },
];

// 3D magnetic tilt
function TiltCard({ children, style }) {
    const cardRef = useRef(null);

    const onMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
            rotateY: x * 14,
            rotateX: -y * 14,
            scale: 1.03,
            z: 30,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
        });
        // Shine
        card.style.setProperty('--tilt-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--tilt-y', `${(y + 0.5) * 100}%`);
    };

    const onMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateY: 0, rotateX: 0, scale: 1, z: 0,
            duration: 0.6, ease: 'elastic.out(1, 0.5)',
            transformPerspective: 800,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
            {/* Shine layer */}
            <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 1,
                background: 'radial-gradient(circle at var(--tilt-x, 50%) var(--tilt-y, 50%), rgba(255,200,100,0.1) 0%, transparent 60%)',
                transition: 'opacity 0.3s',
            }} />
            {children}
        </div>
    );
}

export default function Poojas() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Clip-path wipe entrance for each card
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
                    {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: (i % 3) * 0.12,
                    }
                );
            });

            // Pulsing ambient glow
            gsap.to('.poojas-glow', {
                scale: 1.3, opacity: 0.09,
                duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="poojas" ref={sectionRef} style={{ position: 'relative', padding: '120px 0', background: '#0e0301', overflow: 'hidden' }}>
            {/* Ambient glow */}
            <div className="poojas-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(255,100,0,0.07) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

            {/* Texture lines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(212,175,55,0.03) 40px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '16px', letterSpacing: '0.5em' }}>✦ Devotion in Action ✦</span>
                    <h2 className="reveal-up section-title text-gold-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>Sacred Offerings</h2>
                    <p className="reveal-up section-subtitle" style={{ marginTop: '16px', maxWidth: '460px', margin: '16px auto 0' }}>
                        Ancient rituals performed with Vedic precision and deep devotion.
                    </p>
                    <div className="devotional-divider reveal-up" style={{ marginTop: '0' }}><span className="om-ornament"></span></div>
                </div>

                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
                    {poojas.map((pooja, i) => (
                        <TiltCard
                            key={pooja.name}
                            style={{
                                padding: '40px 32px', display: 'flex', flexDirection: 'column',
                                position: 'relative', overflow: 'hidden',
                                background: 'rgba(22, 7, 3, 0.92)',
                                border: '1px solid rgba(212,175,55,0.12)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                borderRadius: '2px',
                            }}
                        >
                            <div ref={el => cardRefs.current[i] = el} style={{ position: 'absolute', inset: 0 }} />

                            {/* Corner accent */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '1.5px solid rgba(212,175,55,0.4)', borderLeft: '1.5px solid rgba(212,175,55,0.4)' }} />
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '1.5px solid rgba(212,175,55,0.4)', borderRight: '1.5px solid rgba(212,175,55,0.4)' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
                                <div className="flame-icon" style={{ fontSize: '2.2rem' }}>{pooja.icon}</div>
                                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', color: 'rgba(255,153,51,0.6)', letterSpacing: '0.1em', background: 'rgba(255,153,51,0.08)', padding: '4px 10px', border: '1px solid rgba(255,153,51,0.15)' }}>{pooja.duration}</span>
                            </div>

                            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(212,175,55,0.55)', marginBottom: '6px', position: 'relative', zIndex: 2 }}>{pooja.sanskrit}</p>
                            <h3 style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '1.1rem', color: '#fdf5e6', marginBottom: '14px', textShadow: '0 0 20px rgba(255,153,51,0.2)', position: 'relative', zIndex: 2 }}>{pooja.name}</h3>
                            <div className="divider-gold" style={{ width: '50px', marginBottom: '14px' }} />
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.87rem', lineHeight: 1.8, color: 'rgba(253,245,230,0.65)', marginBottom: '20px', flex: 1, position: 'relative', zIndex: 2 }}>{pooja.description}</p>

                            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 2 }}>
                                {pooja.benefits.map((b) => (
                                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ff9933', flexShrink: 0, boxShadow: '0 0 8px #ff4500' }} />
                                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: 'rgba(253,245,230,0.6)' }}>{b}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href={`https://wa.me/919400000000?text=Namaskaram! I would like to book ${pooja.name} at Kottivattam Illam.`}
                                target="_blank" rel="noopener noreferrer"
                                className="btn-outline-gold"
                                style={{ marginTop: 'auto', width: '100%', position: 'relative', zIndex: 2 }}
                            >
                                Enquire & Book
                            </a>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
