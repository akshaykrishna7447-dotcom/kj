import { MessageCircle } from 'lucide-react';

const navLinks = [
    ['The Illam', '#illam'],
    ['About Namboothiriji', '#about'],
    ['Sacred Rituals', '#poojas'],
    ['Gallery', '#gallery'],
    ['Book a Pooja', '#contact'],
];

export default function Footer() {
    return (
        <footer style={{ background: '#0a0201', borderTop: '1px solid rgba(255,153,51,0.15)', padding: '120px 0 60px', position: 'relative' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', marginBottom: '56px' }}>
                    {/* Brand & Address */}
                    <div>
                        <span className="om-ornament" style={{ fontSize: '2.2rem', display: 'block', marginBottom: '12px' }}></span>
                        <h3 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '1.1rem', color: '#fdf5e6', letterSpacing: '0.2em', marginBottom: '8px' }}>KOTTIVATTAM ILLAM</h3>
                        <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(253,245,230,0.7)', marginBottom: '20px' }}>
                            Near Mahadeva Temple,<br />
                            Eranhipalam, Calicut<br />
                            Kerala, India - 673006
                        </p>
                        <p className="section-subtitle" style={{ fontSize: '0.88rem' }}>
                            A living heritage of Vedic tradition, devotion, and divine service.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '28px' }}>Navigate</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {navLinks.map(([label, href]) => (
                                <a key={label} href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="nav-link" style={{ fontSize: '0.75rem', width: 'fit-content' }}>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '28px' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,245,230,0.4)', marginBottom: '4px' }}>Phone / WhatsApp</p>
                                <a href="tel:+919400000000" style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.85rem', color: 'rgba(253,245,230,0.85)', textDecoration: 'none', cursor: 'pointer' }}>+91 94000 00000</a>
                            </div>
                            <div>
                                <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,245,230,0.4)', marginBottom: '4px' }}>Email</p>
                                <a href="mailto:kottivattamillam@gmail.com" style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.85rem', color: 'rgba(253,245,230,0.85)', textDecoration: 'none', cursor: 'pointer' }}>kottivattamillam@gmail.com</a>
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <a href="https://wa.me/919400000000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ff9933', textDecoration: 'none', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,153,51,0.3)', paddingBottom: '2px' }}>
                                    <MessageCircle size={14} /> Message on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sacred verse */}
                    <div>
                        <h4 style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '28px' }}>Sacred Verse</h4>
                        <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(212,175,55,0.85)', marginBottom: '10px', textShadow: '0 0 10px rgba(255,153,51,0.3)' }}>
                            "അസതോ മാ സദ്ഗമയ"
                        </p>
                        <p className="section-subtitle" style={{ fontSize: '0.85rem' }}>
                            Lead me from ignorance to truth,<br />from darkness to light, from death to immortality.
                        </p>
                        <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(253,245,230,0.35)', marginTop: '16px' }}>
                            — Brihadaranyaka Upanishad
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider-gold" style={{ marginBottom: '32px' }} />

                {/* Bottom */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.75rem', color: 'rgba(253,245,230,0.45)' }}>
                        © {new Date().getFullYear()} Kottivattam Illam. All rights reserved.
                    </p>
                    <p style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.75rem', color: 'rgba(253,245,230,0.35)' }}>
                        Crafted with devotion for a sacred legacy
                    </p>
                    <a href="https://wa.me/919400000000?text=Namaskaram! I would like to enquire about a pooja." target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', textDecoration: 'none', cursor: 'none' }}>
                        <MessageCircle size={15} />
                        <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: '0.72rem', letterSpacing: '0.15em' }}>WhatsApp Us</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
