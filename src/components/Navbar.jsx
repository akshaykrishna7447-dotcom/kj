import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Heritage', href: '#illam' },
        { name: 'About', href: '#about' },
        { name: 'Poojas', href: '#poojas' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <>
            <nav
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: scrolled ? 'rgba(20,5,2,0.88)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,153,51,0.12)' : '1px solid transparent',
                }}
            >
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: scrolled ? '14px 32px' : '22px 32px',
                    maxWidth: '1280px', margin: '0 auto',
                    transition: 'padding 0.4s ease',
                }}>
                    {/* Logo */}
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-start' }}>
                        <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'none', textDecoration: 'none' }}>
                            <span className="om-ornament" style={{ fontSize: '1.5rem' }}></span>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.2em', color: '#d4af37', lineHeight: 1.1 }}>KOTTIVATTAM</span>
                                <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 300, fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(253,245,230,0.5)', textTransform: 'uppercase' }}>ILLAM</span>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Links */}
                    <div style={{ display: 'none', gap: '40px', flex: '2', justifyContent: 'center' }} className="md-flex">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="nav-link"
                                onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                                style={{ 
                                    fontFamily: "'Noto Serif Malayalam', serif", 
                                    fontSize: '0.75rem', 
                                    color: 'rgba(253,245,230,0.9)',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    transition: 'color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#d4af37'}
                                onMouseLeave={(e) => e.target.style.color = 'rgba(253,245,230,0.9)'}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'none', flex: '1', justifyContent: 'flex-end', alignItems: 'center' }} className="md-flex">
                        <a href="#contact" className="btn-outline-gold" style={{ padding: '10px 24px', fontSize: '0.7rem' }}
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            Offer Deepam
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md-hidden" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: '#d4af37', padding: '4px' }}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(14,3,1,0.98)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px' }}>
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link"
                            style={{ fontSize: '1.4rem', fontFamily: "'Noto Serif Malayalam', serif", letterSpacing: '0.12em' }}
                            onClick={(e) => { e.preventDefault(); setIsOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}>
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="btn-gold" style={{ marginTop: '16px' }}
                        onClick={(e) => { e.preventDefault(); setIsOpen(false); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        Offer Deepam
                    </a>
                </div>
            )}
        </>
    );
}

const styles = `
  @media (min-width: 768px) {
    .md-flex { display: flex !important; }
    .md-hidden { display: none !important; }
  }
`;
if (typeof document !== 'undefined') {
    const id = 'nav-styles';
    if (!document.getElementById(id)) {
        const styleEl = document.createElement('style');
        styleEl.id = id;
        styleEl.innerHTML = styles;
        document.head.appendChild(styleEl);
    }
}
