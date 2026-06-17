import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: '30+',   label: 'വർഷങ്ങളുടെ പരിചയം' },
    { number: '1000+', label: 'നിർവ്വഹിച്ച കർമ്മങ്ങൾ' },
    { number: '12+',   label: 'വൈദിക ശാഖകൾ' },
    { number: '5+',    label: 'പവിത്ര പരമ്പര' },
];

export default function About() {
    const bgRef = useRef(null);
    const titleRef = useTextReveal();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current, { yPercent: -15 },
                { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true } });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" style={{ position: 'relative', padding: '120px 0', background: '#F4ECD8', overflow: 'hidden' }}>
            {/* Parallax watermark */}
            <div ref={bgRef} style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/portrait.png)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.04, willChange: 'transform', filter: 'sepia(60%) grayscale(40%)' }} />
            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(201,146,26,0.4), transparent)' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '14px' }}>✦ പാരമ്പര്യത്തിന്റെ കാവൽക്കാരൻ ✦</span>
                    <h2 ref={titleRef} className="section-title text-brown-gradient" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', marginTop: '10px', marginBottom: '24px' }}>
                        ജയരാജൻ നമ്പൂതിരി
                    </h2>
                    <div className="temple-divider reveal-up"><span className="temple-ornament">✦</span></div>
                </div>

                {/* Stats strip */}
                <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(201,146,26,0.15)', marginBottom: '80px', border: '1px solid rgba(201,146,26,0.2)' }}>
                    {stats.map((s, idx) => (
                        <div key={idx} style={{ textAlign: 'center', padding: '28px 20px', background: '#FDFAF4' }}>
                            <p style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#C9921A', lineHeight: 1, textShadow: '0 0 20px rgba(201,146,26,0.3)' }}>{s.number}</p>
                            <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em', color: '#7A4219', marginTop: '8px', textTransform: 'uppercase' }}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px,1fr))', gap: '64px', alignItems: 'start' }}>
                    {/* Portrait */}
                    <div className="reveal-left">
                        <div style={{ position: 'relative', border: '1px solid rgba(201,146,26,0.3)', boxShadow: '0 20px 60px rgba(42,18,6,0.12)' }}>
                            <img src="/portrait.png" alt="Jayarajan Namboothiri" style={{ width: '100%', objectFit: 'cover', objectPosition: 'top', maxHeight: '560px', display: 'block', filter: 'brightness(0.95) sepia(0.08)' }} />
                            {/* Corner ornaments */}
                            {[[12,null,12,null],[12,null,null,12],[null,12,12,null],[null,12,null,12]].map(([t,b,l,r],i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    top: t !== null ? `${t}px` : 'auto', bottom: b !== null ? `${b}px` : 'auto',
                                    left: l !== null ? `${l}px` : 'auto', right: r !== null ? `${r}px` : 'auto',
                                    width: '24px', height: '24px',
                                    borderTop:    t !== null && (l !== null || r !== null) ? '1.5px solid rgba(201,146,26,0.7)' : 'none',
                                    borderLeft:   l !== null ? '1.5px solid rgba(201,146,26,0.7)' : 'none',
                                    borderRight:  r !== null ? '1.5px solid rgba(201,146,26,0.7)' : 'none',
                                    borderBottom: b !== null ? '1.5px solid rgba(201,146,26,0.7)' : 'none',
                                }} />
                            ))}
                        </div>
                        <div style={{ padding: '22px', marginTop: '14px', textAlign: 'center', background: '#FDFAF4', border: '1px solid rgba(201,146,26,0.2)' }}>
                            <p style={{ fontFamily: "'Noto Serif Malayalam',serif", fontStyle: 'italic', fontSize: '1.15rem', color: '#C9921A', marginBottom: '6px' }}>
                                "യത്ര വിദ്യാ തത്ര ദേവാഃ"
                            </p>
                            <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(122,66,25,0.55)', textTransform: 'uppercase' }}>
                                എവിടെ ജ്ഞാനമുണ്ടോ അവിടെ ഈശ്വരൻ വസിക്കുന്നു
                            </p>
                        </div>
                    </div>

                    {/* Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                        <div className="reveal-up">
                            <h3 style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: '1.12rem', color: '#C9921A', marginBottom: '12px' }}>പവിത്ര പരമ്പര (Parambara)</h3>
                            <p className="section-subtitle" style={{ fontSize: '0.97rem', lineHeight: 1.85 }}>കോഴിക്കോട്ടെ പുരാതനവും ആദരണീയവുമായ കൊട്ടിവട്ടം നമ്പൂതിരി കുടുംബത്തിൽ ജനിച്ച അദ്ദേഹം ആയിരത്തിലധികം വർഷത്തെ പാരമ്പര്യത്തിന്റെ ജീവിക്കുന്ന മാതൃകയാണ്. ഉത്തര കേരളത്തിലെ ഏറ്റവും പ്രധാനപ്പെട്ട ക്ഷേത്ര കർമ്മങ്ങളുടെ ചുമതലയുള്ള പ്രസിദ്ധരായ പണ്ഡിതരുടെ പിൻമുറക്കാരനാണദ്ദേഹം.</p>
                            <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg,#C9921A,transparent)', marginTop: '28px' }} />
                        </div>
                        <div className="reveal-up">
                            <h3 style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: '1.12rem', color: '#C9921A', marginBottom: '12px' }}>ആത്മീയ യാത്ര</h3>
                            <p className="section-subtitle" style={{ fontSize: '0.97rem', lineHeight: 1.85 }}>ചെറുപ്പം മുതലേ കഠിനമായ വൈദിക പഠനങ്ങളിലൂടെയും വേദമന്ത്രോച്ചാരണങ്ങളിലൂടെയും ആചാരക്രമങ്ങളിലൂടെയുമാണ് ജയരാജൻ നമ്പൂതിരി വളർന്നുവന്നത്. തൃശ്ശൂരിലെയും ഗുരുവായൂരിലെയും പ്രഗത്ഭരായ പണ്ഡിതരുടെ കീഴിൽ അദ്ദേഹം ഉയർന്ന വൈദിക പഠനം പൂർത്തിയാക്കി.</p>
                            <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg,#C9921A,transparent)', marginTop: '28px' }} />
                        </div>
                        <div className="reveal-up">
                            <h3 style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: '1.12rem', color: '#C9921A', marginBottom: '12px' }}>ഭക്തിസാന്ദ്രമായ സേവന ജീവിതം</h3>
                            <p className="section-subtitle" style={{ fontSize: '0.97rem', lineHeight: 1.85 }}>മൂന്ന് പതിറ്റാണ്ടിലേറെയായി കേരളം, കർണാടക, തമിഴ്‌നാട് എന്നിവിടങ്ങളിലെ ആയിരക്കണക്കിന് കുടുംബങ്ങൾക്കായി അദ്ദേഹം പൂജാകർമ്മങ്ങൾ ചെയ്തുവരുന്നു. വൈദിക ഗ്രന്ഥങ്ങളോടുള്ള വിട്ടുവീഴ്ചയില്ലാത്ത കൂറിനും, എത്ര സങ്കീർണ്ണമായ കർമ്മങ്ങളും കൃത്യതയോടെയും ഭക്തിയോടെയും പൂർത്തിയാക്കുന്നതിലും അദ്ദേഹം പ്രശസ്തനാണ്.</p>
                        </div>

                        <div className="reveal-up">
                            <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.78rem', color: 'rgba(201,146,26,0.75)', marginBottom: '18px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>പൂജാകർമ്മങ്ങളിലെ വൈദഗ്ദ്ധ്യം</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {['Ganapathi Homam','Sudarshana Homam','Bhagavathy Pooja','Navagraha Pooja','Satyanarayana Katha','Ayushya Homam','Mrityunjaya Homam','Lakshmi Kubera Pooja'].map(r => (
                                    <div key={r} style={{ padding: '10px 14px', fontSize: '0.82rem', fontFamily: "'Manrope',sans-serif", fontWeight: 500, color: '#2A1206', display: 'flex', alignItems: 'center', gap: '10px', background: '#FDFAF4', border: '1px solid rgba(201,146,26,0.18)' }}>
                                        <span style={{ color: '#C9921A', fontSize: '0.8rem' }}>✦</span>{r}
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
