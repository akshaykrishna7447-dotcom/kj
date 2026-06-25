import React from 'react';

const timelineData = [
    { id: 1, icon: '🕉️', year: '~800 CE', title: 'പ്രാചീന ഉത്ഭവം', desc: 'പന്ത്രണ്ടാം നൂറ്റാണ്ടിൽ സ്ഥാപിതമായ ഈ ഇല്ലം കേരളത്തിലെ വൈദിക ആചാരങ്ങളുടെ സംരക്ഷകരാണ്. ഇവിടെ തന്ത്ര വിദ്യകളും വേദമന്ത്രങ്ങളും തലമുറകളായി സൂക്ഷിക്കപ്പെടുന്നു.', img: '/temple.png' },
    { id: 2, icon: '📜', year: 'കഴിഞ്ഞ തലമുറകൾ', title: 'അഗ്നിയുടെ കാവൽക്കാർ', desc: 'തലമുറകളായി മുടങ്ങാത്ത ഹോമങ്ങളും പവിത്രമായ കർമ്മങ്ങളും ഈ ഇല്ലം കാത്തുസൂക്ഷിക്കുന്നു. ഓരോ മന്ത്രോച്ചാരണത്തിലും പൂർവ്വികരുടെ സാന്നിധ്യം ഇവിടെ നിറഞ്ഞുനിൽക്കുന്നു.', img: '/hero.png' },
    { id: 3, icon: '🏛️', year: 'പവിത്രമായ ചുമതല', title: 'പവിത്രമായ കടമ', desc: 'മലബാറിലെ പുരാതന രാജാക്കന്മാർ ഈ ദേശത്തിന്റെ ആത്മീയ ക്ഷേമം ഈ ഇല്ലത്തെയാണ് ഏൽപ്പിച്ചിരുന്നത്. ഈ നാടിന്റെ ഐശ്വര്യത്തിന് കാരണക്കാരായ ഇവർ ഇന്നും ഈ നാടിന്റെ നെടുംതൂണാണ്.', img: '/lamps.png' },
    { id: 4, icon: '🙏', year: 'ഇന്നത്തെ കാലം', title: 'ജീവിക്കുന്ന പാരമ്പര്യം', desc: 'ഇന്നും ഈ ഇല്ലം ആധികാരികമായ വൈദിക ജ്ഞാനത്തിന്റെയും ആചാരങ്ങളുടെയും പ്രകാശഗോപുരമായി നിലകൊള്ളുന്നു. കാലം മാറിയാലും ആചാരങ്ങൾക്ക് മങ്ങലേറ്റിട്ടില്ല.', img: '/pooja.png' },
];

export default function History() {
    return (
        <section id="illam" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--parchment)', width: '100%', padding: 'clamp(80px, 10vw, 140px) 0' }}>
            
            {/* Background Texture */}
            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-border-hi), transparent)', zIndex: 5 }} />

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)', position: 'relative', zIndex: 10 }}>
                <span className="section-eyebrow reveal-up" style={{ marginBottom: '14px' }}>✦ നമ്മുടെ പൈതൃകം ✦</span>
                <h2 className="section-title text-brown-gradient reveal-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginTop: '10px' }}>കൊറ്റിവട്ടം പൈതൃകം</h2>
                <div className="reveal-up" style={{ width: '80px', margin: '20px auto 0', height: '1.5px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            </div>

            {/* Timeline Container */}
            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', zIndex: 10 }}>
                
                {/* Central Gold Line */}
                <div className="timeline-line" style={{ position: 'absolute', top: 0, bottom: '-60px', left: '50%', width: '1px', background: 'linear-gradient(180deg, transparent, var(--gold-border-hi) 10%, var(--gold-border-hi) 90%, transparent)', transform: 'translateX(-50%)' }} />

                {timelineData.map((item, i) => {
                    const isEven = i % 2 === 0; // True means image on left, text on right.

                    return (
                        <div key={i} className="timeline-row" style={{ display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', alignItems: 'center', gap: '80px', marginBottom: i === timelineData.length - 1 ? 0 : '140px', position: 'relative' }}>
                            
                            {/* Central Node (Dot) */}
                            <div className="timeline-node reveal-scale" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', background: 'var(--cream)', border: '1px solid var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxShadow: '0 0 30px rgba(181,149,86,0.2)' }}>
                                <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                            </div>

                            {/* Image Side */}
                            <div className={isEven ? 'reveal-left' : 'reveal-right'} style={{ flex: 1, width: '100%' }}>
                                <div style={{ position: 'relative', padding: '12px', background: 'var(--cream)', border: '1px solid var(--gold-border)', boxShadow: '0 25px 60px rgba(21,12,7,0.08)' }}>
                                    <div style={{ position: 'absolute', inset: '-6px 6px 6px -6px', border: '1px solid var(--gold-border-hi)', zIndex: -1 }} />
                                    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', width: '100%' }}>
                                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)', filter: 'sepia(0.2) contrast(1.05)' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(21,12,7,0.6))' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className={isEven ? 'reveal-right' : 'reveal-left'} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isEven ? 'left' : 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexDirection: isEven ? 'row' : 'row-reverse' }}>
                                    <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>{item.year}</span>
                                    <span style={{ flex: 1, height: '1px', background: `linear-gradient(${isEven ? '90deg' : '270deg'}, var(--gold), transparent)` }} />
                                </div>
                                <h3 style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--brown-deep)', marginBottom: '24px', lineHeight: 1.2 }}>{item.title}</h3>
                                <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--brown-light)', maxWidth: '480px', marginLeft: isEven ? '0' : 'auto' }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
