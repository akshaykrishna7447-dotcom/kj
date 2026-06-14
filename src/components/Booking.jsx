import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Phone, MapPin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rituals = [
    'Ganapathi Homam', 'Sudarshana Homam', 'Bhagavathy Pooja',
    'Navagraha Pooja', 'Satyanarayana Katha', 'Ayushya Homam',
    'Other (please specify)',
];

export default function Booking() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax bg
            gsap.fromTo(bgRef.current,
                { yPercent: -20 },
                { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: true } }
            );

            // Floating ambient orbs
            gsap.to(orb1Ref.current, { x: 60, y: -40, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            gsap.to(orb2Ref.current, { x: -50, y: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });

            // Pulsing golden halo around the section title
            gsap.to('.booking-halo', {
                scale: 1.6, opacity: 0,
                duration: 2.5, repeat: -1, ease: 'power2.out',
            });

            // Stagger entrance for ritual buttons
            gsap.fromTo('.ritual-btn',
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: '#contact', start: 'top 75%' }
                }
            );

            // Contact rows
            gsap.fromTo('.contact-row',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleBook = (ritual = '') => {
        const msg = ritual
            ? `Namaskaram 🙏 I would like to enquire about booking the *${ritual}* at Kottivattam Illam.`
            : 'Namaskaram 🙏 I would like to book a sacred pooja at Kottivattam Illam.';
        window.open(`https://wa.me/919400000000?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section id="contact" ref={sectionRef} style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', background: 'linear-gradient(160deg, #0e0200 0%, #1a0503 60%, #0e0200 100%)' }}>
            {/* Lamps parallax bg */}
            <div ref={bgRef} style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/lamps.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, willChange: 'transform' }} />

            {/* Floating orbs */}
            <div ref={orb1Ref} style={{ position: 'absolute', top: '20%', left: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,100,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div ref={orb2Ref} style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Grid overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                        <div className="booking-halo" style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '1px solid rgba(255,153,51,0.4)', opacity: 0.8 }} />
                        <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '2rem', color: '#d4af37', filter: 'drop-shadow(0 0 20px rgba(255,153,51,0.6))' }}>✦</span>
                    </div>
                    <span className="reveal-up section-eyebrow" style={{ letterSpacing: '0.5em', marginBottom: '14px', display: 'block' }}>✦ Connect With Us ✦</span>
                    <h2 className="reveal-up section-title text-gold-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>Book a Sacred Ritual</h2>
                    <div className="devotional-divider reveal-up"><span className="om-ornament"></span></div>
                    <p className="reveal-up section-subtitle" style={{ fontSize: '1.05rem', maxWidth: '480px', margin: '-32px auto 0' }}>
                        Reach us via WhatsApp to schedule your sacred ritual. We respond with devotion and care.
                    </p>
                </div>

                {/* Two columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px', alignItems: 'start' }}>
                    {/* Ritual selector */}
                    <div className="reveal-left" style={{ padding: '44px 40px', background: 'rgba(20,5,2,0.85)', border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
                        <h3 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '1rem', color: '#fdf5e6', marginBottom: '28px', letterSpacing: '0.1em' }}>Select Your Sacred Ritual</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                            {rituals.map((ritual, i) => (
                                <button key={ritual} className="ritual-btn" onClick={() => handleBook(ritual)}
                                    style={{ width: '100%', textAlign: 'left', padding: '13px 18px', background: 'rgba(255,153,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'none', border: '1px solid rgba(255,153,51,0.12)', transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.2s ease' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,153,51,0.5)'; e.currentTarget.style.background = 'rgba(255,153,51,0.12)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,153,51,0.12)'; e.currentTarget.style.background = 'rgba(255,153,51,0.04)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                >
                                    <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.87rem', color: 'rgba(253,245,230,0.82)' }}>
                                        <span style={{ color: '#d4af37', marginRight: '12px' }}>✦</span>{ritual}
                                    </span>
                                    <MessageCircle size={13} style={{ color: '#ff9933', opacity: 0.7, flexShrink: 0 }} />
                                </button>
                            ))}
                        </div>
                        <button onClick={() => handleBook()} className="btn-gold" style={{ width: '100%' }}>
                            <MessageCircle size={16} /> Book via WhatsApp
                        </button>
                    </div>

                    {/* Right column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="reveal-right" style={{ padding: '40px 36px', background: 'rgba(20,5,2,0.85)', border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
                            <h3 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '0.95rem', color: '#d4af37', marginBottom: '32px', letterSpacing: '0.12em' }}>Contact Information</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                {[
                                    { icon: <Phone size={18} />, label: 'Phone', value: '+91 94000 00000', href: 'tel:+919400000000' },
                                    { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: 'Message Us', href: 'https://wa.me/919400000000' },
                                    { icon: <MapPin size={18} />, label: 'Location', value: 'Kottivattam Illam, Calicut, Kerala', href: '#' },
                                    { icon: <Mail size={18} />, label: 'Email', value: 'kottivattamillam@gmail.com', href: 'mailto:kottivattamillam@gmail.com' },
                                ].map((item) => (
                                    <a key={item.label} href={item.href} className="contact-row" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                        style={{ display: 'flex', alignItems: 'center', gap: '18px', textDecoration: 'none', cursor: 'none', transition: 'transform 0.25s ease' }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                                    >
                                        <div style={{ width: '42px', height: '42px', flexShrink: 0, background: 'rgba(255,153,51,0.08)', border: '1px solid rgba(255,153,51,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(253,245,230,0.38)', marginBottom: '3px' }}>{item.label}</p>
                                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.88rem', color: 'rgba(253,245,230,0.82)' }}>{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="reveal-right" style={{ padding: '36px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(204,68,0,0.12) 0%, rgba(255,153,51,0.06) 100%)', border: '1px solid rgba(255,153,51,0.2)', boxShadow: '0 0 60px rgba(255,100,0,0.08)' }}>
                            <span className="om-ornament" style={{ fontSize: '2.2rem', display: 'block', marginBottom: '14px' }}></span>
                            <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>
                                "All rituals are conducted with deep fidelity to Vedic injunctions. We invite you to experience the transformative power of authentic sacred tradition."
                            </p>
                            <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.72rem', color: 'rgba(255,153,51,0.7)', marginTop: '16px', letterSpacing: '0.1em' }}>
                                — Jayarajan Namboothiri
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
