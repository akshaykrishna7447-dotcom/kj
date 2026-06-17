import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    { id: 1, icon: '🕉️', year: '~800 CE', title: 'പ്രാചീന ഉത്ഭവം', desc: 'പന്ത്രണ്ടാം നൂറ്റാണ്ടിൽ സ്ഥാപിതമായ ഈ ഇല്ലം കേരളത്തിലെ വൈദിക ആചാരങ്ങളുടെ സംരക്ഷകരാണ്.', img: '/temple.png' },
    { id: 2, icon: '📜', year: 'കഴിഞ്ഞ തലമുറകൾ', title: 'അഗ്നിയുടെ കാവൽക്കാർ', desc: 'തലമുറകളായി മുടങ്ങാത്ത ഹോമങ്ങളും പവിത്രമായ കർമ്മങ്ങളും ഈ ഇല്ലം കാത്തുസൂക്ഷിക്കുന്നു.', img: '/hero.png' },
    { id: 3, icon: '🏛️', year: 'പവിത്രമായ ചുമതല', title: 'പവിത്രമായ കടമ', desc: 'മലബാറിലെ പുരാതന രാജാക്കന്മാർ ഈ ദേശത്തിന്റെ ആത്മീയ ക്ഷേമം ഈ ഇല്ലത്തെയാണ് ഏൽപ്പിച്ചിരുന്നത്.', img: '/lamps.png' },
    { id: 4, icon: '🙏', year: 'ഇന്നത്തെ കാലം', title: 'ജീവിക്കുന്ന പാരമ്പര്യം', desc: 'ഇന്നും ഈ ഇല്ലം ആധികാരികമായ വൈദിക ജ്ഞാനത്തിന്റെയും ആചാരങ്ങളുടെയും പ്രകാശഗോപുരമായി നിലകൊള്ളുന്നു.', img: '/pooja.png' },
];

export default function History() {
    const sectionRef   = useRef(null);
    const containerRef = useRef(null);
    const imgRefs      = useRef([]);
    const textRefs     = useRef([]);
    const numberRefs   = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const getScrollAmount = () => -(containerRef.current.scrollWidth - window.innerWidth);
            const endScroll = () => `+=${containerRef.current.scrollWidth - window.innerWidth}`;
            const cardCount = timelineData.length;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current, start: 'top top', end: endScroll,
                    pin: true, scrub: 1.2, invalidateOnRefresh: true,
                    onUpdate: self => {
                        imgRefs.current.forEach((img, i) => {
                            if (!img) return;
                            const cp = self.progress * (cardCount - 1) - i;
                            const cl = Math.max(-1, Math.min(1, cp));
                            gsap.set(img, { xPercent: cl * -8, scale: 1.12 - Math.abs(cl) * 0.06 });
                        });
                        numberRefs.current.forEach((num, i) => {
                            if (!num) return;
                            const cp = self.progress * (cardCount - 1) - i;
                            const cl = Math.max(-1, Math.min(1, cp));
                            gsap.set(num, { xPercent: cl * 15, opacity: 0.06 + Math.max(0, 1 - Math.abs(cl)) * 0.05 });
                        });
                    }
                }
            });

            tl.to(containerRef.current, { x: getScrollAmount, ease: 'none', duration: cardCount - 1 }, 0);
            tl.to('.history-progress', { width: '100%', ease: 'none', duration: cardCount - 1 }, 0);

            textRefs.current.forEach((textEl, i) => {
                if (!textEl) return;
                const children = Array.from(textEl.children);
                const enterAt  = i / (cardCount - 1);
                gsap.fromTo(children, { opacity: 0, y: 40 }, {
                    opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: `top+=${enterAt * (containerRef.current?.scrollWidth - window.innerWidth || 2000)} top`,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="illam" ref={sectionRef} style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#F4ECD8', position: 'relative', display: 'flex', flexDirection: 'column' }}>

            {/* Warm parchment texture */}
            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
            {/* Gold top rule */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9921A, transparent)', zIndex: 5 }} />

            {/* Pinned title */}
            <div style={{ textAlign: 'center', paddingTop: '8vh', paddingBottom: '2vh', position: 'relative', zIndex: 10, flexShrink: 0 }}>
                <span className="section-eyebrow" style={{ marginBottom: '14px' }}>✦ നമ്മുടെ പൈതൃകം ✦</span>
                <h2 className="section-title text-brown-gradient" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>കൊട്ടിവട്ടം പൈതൃകം</h2>
                <div style={{ width: '100px', margin: '14px auto 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,146,26,0.6), transparent)' }} />
            </div>

            {/* Horizontal strip */}
            <div ref={containerRef} style={{ display: 'flex', width: `${timelineData.length * 100}vw`, flex: 1, alignItems: 'center', willChange: 'transform' }}>
                {timelineData.map((item, i) => (
                    <div key={i} style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', flexShrink: 0 }}>
                        <div className="history-card" style={{
                            display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1100px',
                            height: '62vh', minHeight: '400px', overflow: 'hidden',
                            border: '1px solid rgba(201,146,26,0.25)',
                            boxShadow: '0 20px 60px rgba(42,18,6,0.1)',
                            background: '#FDFAF4',
                            borderRadius: '4px'
                        }}>
                            {/* Image col */}
                            <div style={{ flex: '1.3', position: 'relative', overflow: 'hidden' }}>
                                <div ref={el => imgRefs.current[i] = el} style={{
                                    position: 'absolute', inset: '-10%',
                                    backgroundImage: `url(${item.img})`,
                                    backgroundSize: 'cover', backgroundPosition: 'center',
                                    willChange: 'transform', transform: 'scale(1.12)',
                                }} />
                                {/* Warm fade to card */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 35%, #FDFAF4 100%)' }} />
                                {/* Subtle gold tint at bottom */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(0deg, rgba(201,146,26,0.07) 0%, transparent 100%)' }} />
                                {/* Watermark number */}
                                <div ref={el => numberRefs.current[i] = el} style={{
                                    position: 'absolute', bottom: '12px', left: '20px',
                                    fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700,
                                    fontSize: 'clamp(5rem,10vw,9rem)',
                                    color: '#C9921A', opacity: 0.08, lineHeight: 1, userSelect: 'none',
                                }}>0{i + 1}</div>
                            </div>

                            {/* Text col */}
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px', position: 'relative', background: '#FDFAF4' }}>
                                {/* Top gold rule */}
                                <div style={{ position: 'absolute', top: 0, left: '28px', right: '28px', height: '1px', background: 'linear-gradient(90deg, rgba(201,146,26,0.4), transparent)' }} />

                                <div ref={el => textRefs.current[i] = el}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                        <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                                        <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.25em', color: '#7A4219', textTransform: 'uppercase' }}>{item.year}</span>
                                    </div>
                                    <h3 style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#2A1206', marginBottom: '16px', lineHeight: 1.15 }}>
                                        {item.title}
                                    </h3>
                                    <div style={{ width: '55px', height: '1px', background: 'linear-gradient(90deg, #C9921A, transparent)', marginBottom: '16px' }} />
                                    <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.97rem', lineHeight: 1.85, color: '#7A4219', maxWidth: '420px' }}>
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Card counter */}
                                <div style={{ position: 'absolute', bottom: '28px', right: '36px', fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(122,66,25,0.4)' }}>
                                    {String(i + 1).padStart(2, '0')} / {String(timelineData.length).padStart(2, '0')}
                                </div>
                                {/* Bottom gold rule */}
                                <div style={{ position: 'absolute', bottom: 0, left: '28px', right: '28px', height: '1px', background: 'linear-gradient(90deg, rgba(201,146,26,0.4), transparent)' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Horizontal progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(201,146,26,0.15)', zIndex: 20 }}>
                <div className="history-progress" style={{ height: '100%', background: 'linear-gradient(90deg, #C9921A, #E8C96A)', width: '0%', transition: 'none', boxShadow: '0 0 8px rgba(201,146,26,0.5)' }} />
            </div>
        </section>
    );
}
