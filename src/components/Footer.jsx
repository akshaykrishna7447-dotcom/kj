import { MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: 'var(--brown-rich)', borderTop: '1px solid var(--gold-border)', padding: 'clamp(60px, 8vw, 100px) 0 clamp(40px, 6vw, 60px)', position: 'relative', overflow: 'hidden', width: '100%' }}>
            {/* Gold top border */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)' }} />

            {/* Warm ambient glow */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: 'radial-gradient(ellipse, rgba(181,149,86,0.08) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '48px', marginBottom: '56px' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: '24px' }}>
                            <span style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.22em', background: 'linear-gradient(135deg, var(--parchment), var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', lineHeight: 1 }}>KOTTIVATTAM</span>
                            <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(212,185,123,0.7)', textTransform: 'uppercase' }}>ILLAM</span>
                        </div>
                        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-cream-dim)', maxWidth: '300px', marginBottom: '24px' }}>
                            The living heritage of Vedic tradition, devotion, and service.
                        </p>
                        <a href="https://maps.app.goo.gl/dKugayduKY7srUUp9?g_st=iw" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-cream-dim)', textDecoration: 'none', transition: 'color 0.3s ease', maxWidth: '280px', lineHeight: 1.5 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-cream-dim)'}>
                            <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                            <span style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.88rem' }}>Kottivattam Illam, Kozhikode, Kerala</span>
                        </a>
                    </div>

                    {/* Navigation */}
                    <div style={{ paddingTop: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                            {[
                                { name: 'HERITAGE', href: '#illam' },
                                { name: 'ABOUT', href: '#about' },
                                { name: 'POOJAS', href: '#poojas' },
                                { name: 'GALLERY', href: '#gallery' },
                            ].map(({ name, href }) => (
                                <a key={name} href={href}
                                    onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                                    style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--text-cream-dim)', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}
                                    onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                                    onMouseLeave={e => e.target.style.color = 'var(--text-cream-dim)'}>
                                    {name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '26px' }}>CONTACT</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(181,149,86,0.45)', marginBottom: '4px' }}>PHONE / WHATSAPP</p>
                                <a href="tel:+919961085646" style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-cream-dim)', textDecoration: 'none' }}>+91 99610 85646</a>
                            </div>
                            <div>
                                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(181,149,86,0.45)', marginBottom: '4px' }}>EMAIL</p>
                                <a href="mailto:jayarajan.namboothiri@gmail.com" style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-cream-dim)', textDecoration: 'none' }}>jayarajan.namboothiri@gmail.com</a>
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                <a href="https://wa.me/919961085646" target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: 'var(--gold-light)', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, borderBottom: '1px solid rgba(212,185,123,0.3)', paddingBottom: '2px' }}>
                                    <MessageCircle size={13} /> Send a message
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sacred verse */}
                    <div>
                        <h4 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '26px' }}>SACRED VERSE</h4>
                        <p style={{ fontFamily: "'Noto Serif Malayalam',serif", fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '10px' }}>
                            "Asato ma sadgamaya"
                        </p>
                        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.86rem', lineHeight: 1.75, color: 'var(--text-cream-dim)' }} dangerouslySetInnerHTML={{__html: 'Lead me from ignorance to truth,<br />from darkness to light, and from death to immortality.'}} />
                        <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(242,235,220,0.28)', marginTop: '14px' }}>
                            — Brihadaranyaka Upanishad
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{ borderTop: '1px solid rgba(181,149,86,0.15)', padding: '32px 0 40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                    <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.85rem', color: 'var(--text-cream-dim)' }}>
                        © {new Date().getFullYear()} Kottivattam Illam. All rights reserved.
                    </p>
                    <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.85rem', color: 'var(--text-cream-dim)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Crafted with devotion for a sacred heritage <span style={{ color: 'var(--gold)' }}>✦</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
