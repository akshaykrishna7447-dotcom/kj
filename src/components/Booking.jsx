import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Phone, MapPin, Mail } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
    const sectionRef = useRef(null);
    const bgRef      = useRef(null);
    const orb1Ref    = useRef(null);
    const orb2Ref    = useRef(null);
    const magneticBtn = useMagnetic({ strength: 0.2, radius: 100 });
    const [poojaType, setPoojaType] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current, { yPercent: -15 },
                { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: true } });
            gsap.to(orb1Ref.current, { x: 60, y: -40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            gsap.to(orb2Ref.current, { x: -50, y: 35, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
            gsap.to('.booking-halo', { scale: 1.5, opacity: 0, duration: 2.5, repeat: -1, ease: 'power2.out' });
            gsap.fromTo('.ritual-btn', { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 75%' } });
            gsap.fromTo('.contact-row', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '#contact', start: 'top 70%' } });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleBook = (ritual = '') => {
        const selected = ritual || poojaType;
        const msg = selected
            ? `നമസ്കാരം 🙏 കൊട്ടിവട്ടം ഇല്ലത്ത് *${selected}* നടത്തുന്നതിനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.`
            : 'നമസ്കാരം 🙏 കൊട്ടിവട്ടം ഇല്ലത്ത് പൂജ നടത്തുന്നതിനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.';
        window.open(`https://wa.me/919400000000?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section id="contact" ref={sectionRef} style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', background: '#FDFAF4' }}>
            <div ref={bgRef} style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/lamps.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05, willChange: 'transform', filter: 'sepia(50%) brightness(0.8)' }} />
            <div ref={orb1Ref} style={{ position: 'absolute', top: '20%', left: '8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,146,26,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div ref={orb2Ref} style={{ position: 'absolute', bottom: '20%', right: '8%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(122,66,25,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(201,146,26,0.4), transparent)' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                        <div className="booking-halo" style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '1px solid rgba(201,146,26,0.5)', opacity: 0.8 }} />
                        <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 16px rgba(201,146,26,0.8))', animation: 'flicker 3s ease-in-out infinite', display: 'block' }}>🪔</span>
                    </div>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '14px', display: 'block' }}>✦ ഞങ്ങളെ ബന്ധപ്പെടുക ✦</span>
                    <h2 className="reveal-up section-title text-brown-gradient" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', marginTop: '10px', marginBottom: '24px' }}>പൂജകൾ ബുക്ക് ചെയ്യുക</h2>
                    <div className="temple-divider reveal-up"><span className="temple-ornament">✦</span></div>
                    <p className="reveal-up section-subtitle" style={{ maxWidth: '600px', margin: '24px auto 0', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        പൂജകൾ ബുക്ക് ചെയ്യാൻ വാട്ട്‌സ്ആപ്പ് വഴി ഞങ്ങളെ ബന്ധപ്പെടുക. വളരെ വേഗം തന്നെ ഞങ്ങൾ മറുപടി നൽകുന്നതാണ്.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px,1fr))', gap: '40px', alignItems: 'start' }}>
                    <div className="reveal-left" style={{ padding: '44px 40px', background: '#FDFAF4', border: '1px solid rgba(201,146,26,0.25)', boxShadow: '0 20px 60px rgba(42,18,6,0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '26px', height: '26px', borderTop: '1.5px solid rgba(201,146,26,0.6)', borderLeft: '1.5px solid rgba(201,146,26,0.6)' }} />
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderBottom: '1.5px solid rgba(201,146,26,0.6)', borderRight: '1.5px solid rgba(201,146,26,0.6)' }} />
                        <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.78rem', color: 'rgba(201,146,26,0.8)', marginBottom: '28px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>പൂജകൾ തിരഞ്ഞെടുക്കുക</h3>
                        
                        <select
                            value={poojaType} onChange={e => setPoojaType(e.target.value)}
                            style={{ width: '100%', marginBottom: '20px', padding: '16px', background: '#FDFAF4', border: '1px solid rgba(201,146,26,0.3)', borderRadius: '4px', fontSize: '0.95rem', color: '#2A1206', fontFamily: "'Manrope',sans-serif", outline: 'none', appearance: 'none' }}
                        >
                            <option value="">പൂജകൾ തിരഞ്ഞെടുക്കുക</option>
                            <option value="ഗണപതി ഹോമം">ഗണപതി ഹോമം</option>
                            <option value="സുദർശന ഹോമം">സുദർശന ഹോമം</option>
                            <option value="ഭഗവതി പൂജ">ഭഗവതി പൂജ</option>
                            <option value="നവഗ്രഹ പൂജ">നവഗ്രഹ പൂജ</option>
                            <option value="സത്യനാരായണ പൂജ">സത്യനാരായണ പൂജ</option>
                            <option value="ആയുഷ്യ ഹോമം">ആയുഷ്യ ഹോമം</option>
                            <option value="മൃത്യുഞ്ജയ ഹോമം">മൃത്യുഞ്ജയ ഹോമം</option>
                            <option value="ലക്ഷ്മി കുബേര പൂജ">ലക്ഷ്മി കുബേര പൂജ</option>
                            <option value="മറ്റ് പൂജകൾ">മറ്റ് പൂജകൾ</option>
                        </select>

                        <div ref={magneticBtn}>
                            <button onClick={() => handleBook()} className="btn-gold" style={{ width: '100%' }}>
                                <MessageCircle size={15} /> വാട്ട്‌സ്ആപ്പ് വഴി ബുക്ക് ചെയ്യുക
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        <div className="reveal-right" style={{ padding: '38px 34px', background: '#FDFAF4', border: '1px solid rgba(201,146,26,0.25)', boxShadow: '0 20px 60px rgba(42,18,6,0.08)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '26px', height: '26px', borderTop: '1.5px solid rgba(201,146,26,0.6)', borderLeft: '1.5px solid rgba(201,146,26,0.6)' }} />
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderBottom: '1.5px solid rgba(201,146,26,0.6)', borderRight: '1.5px solid rgba(201,146,26,0.6)' }} />
                            <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.78rem', color: 'rgba(201,146,26,0.8)', marginBottom: '30px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                {[
                                    { icon: <Phone size={17} />, label: 'ഫോൺ', value: '+91 94000 00000', href: 'tel:+919400000000' },
                                    { icon: <MessageCircle size={17} />, label: 'വാട്ട്‌സ്ആപ്പ്', value: 'മെസ്സേജ് അയക്കുക', href: 'https://wa.me/919400000000' },
                                    { icon: <MapPin size={17} />, label: 'സ്ഥലം', value: 'കൊട്ടിവട്ടം ഇല്ലം, കോഴിക്കോട്, കേരളം', href: '#' },
                                    { icon: <Mail size={17} />, label: 'ഇമെയിൽ', value: 'kottivattamillam@gmail.com', href: 'mailto:kottivattamillam@gmail.com' },
                                ].map(item => (
                                    <a key={item.label} href={item.href} className="contact-row" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                        style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', cursor: 'none', transition: 'transform 0.25s ease' }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                                        <div style={{ width: '40px', height: '40px', flexShrink: 0, background: 'rgba(201,146,26,0.08)', border: '1px solid rgba(201,146,26,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9921A' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(122,66,25,0.5)', marginBottom: '3px' }}>{item.label}</p>
                                            <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.87rem', color: '#2A1206' }}>{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="reveal-right" style={{ padding: '34px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(201,146,26,0.06) 0%, rgba(244,236,216,0.8) 100%)', border: '1px solid rgba(201,146,26,0.22)' }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px', filter: 'drop-shadow(0 0 14px rgba(201,146,26,0.7))', animation: 'flicker 3s ease-in-out infinite' }}>🪔</span>
                            <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>
                                "എല്ലാ കർമ്മങ്ങളും വൈദിക വിധികൾ അനുസരിച്ചാണ് നടത്തുന്നത്. ആധികാരികമായ പാരമ്പര്യത്തിന്റെ പരിവർത്തന ശക്തി അനുഭവിക്കാൻ നിങ്ങളെ ഞങ്ങൾ ക്ഷണിക്കുന്നു."
                            </p>
                            <p style={{ fontFamily: "'Noto Serif Malayalam',serif", fontStyle: 'italic', fontSize: '0.76rem', color: 'rgba(201,146,26,0.7)', marginTop: '14px' }}>
                                — ജയരാജൻ നമ്പൂതിരി
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
