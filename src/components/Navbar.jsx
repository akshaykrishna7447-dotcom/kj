import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen,   setIsOpen  ] = useState(false);
    const magneticBtn = useMagnetic({ strength: 0.4, radius: 80 });

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => { setScrolled(window.scrollY > 50); ticking = false; });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { name: 'പൈതൃകം',     href: '#illam' },
        { name: 'കുറിച്ച്',        href: '#about' },
        { name: 'പൂജകൾ',       href: '#poojas' },
        { name: 'ചിത്രങ്ങൾ',      href: '#gallery' },
    ];
    const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

    const scrolledBg   = 'rgba(21,12,7,0.97)'; // --brown-deep
    const scrolledBorder = 'rgba(181,149,86,0.25)';
    const textColor    = '#F3E9D2'; // --cream
    const logoGold     = '#B59556'; // --gold

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                background: scrolled ? scrolledBg : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? `1px solid ${scrolledBorder}` : '1px solid transparent',
                boxShadow: scrolled ? '0 4px 30px rgba(42,18,6,0.08)' : 'none',
            }}>
                {/* Bottom gold line when scrolled */}
                {scrolled && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(181,149,86,0.4), transparent)' }} />
                )}

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: scrolled ? '14px 32px' : '22px 32px',
                    maxWidth: '1280px', margin: '0 auto',
                    transition: 'padding 0.4s ease',
                }}>
                    {/* Logo */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '11px', cursor: 'none', textDecoration: 'none' }}>
                        <span style={{ fontSize: '1.4rem', filter: `drop-shadow(0 0 8px rgba(181,149,86,0.7))`, animation: 'flicker 3s ease-in-out infinite' }}>🪔</span>
                            <div>
                                <span style={{
                                    fontFamily: "'Noto Serif Malayalam', serif", fontWeight: 700,
                                    fontSize: '0.88rem', letterSpacing: '0.22em', lineHeight: 1.1,
                                    display: 'block',
                                    background: 'linear-gradient(135deg, #D6B56F, #B59556)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>കൊട്ടിവട്ടം</span>
                                <span style={{
                                    fontFamily: "'Manrope', sans-serif", fontWeight: 500,
                                    fontSize: '0.47rem', letterSpacing: '0.5em', display: 'block',
                                    color: 'rgba(181,149,86,0.7)',
                                    textTransform: 'uppercase',
                                }}>ഇല്ലം</span>
                            </div>
                        </a>
                    </div>

                    {/* Desktop links */}
                    <div style={{ display: 'none', gap: '40px', flex: 2, justifyContent: 'center' }} className="md-flex">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="nav-link"
                                style={{ color: textColor }}
                                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                                onMouseEnter={e => e.target.style.color = logoGold}
                                onMouseLeave={e => e.target.style.color = textColor}>
                                {link.name}
                            </a>
                        ))}
                    </div>


                    {/* CTA */}
                    <div style={{ display: 'none', flex: 1, justifyContent: 'flex-end' }} className="md-flex">
                        <div ref={magneticBtn}>
                            <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
                                style={{
                                    padding: '9px 22px', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    border: `1px solid rgba(181,149,86,0.55)`,
                                    color: textColor, background: 'transparent', cursor: 'none', letterSpacing: '0.15em',
                                    fontFamily: "'Manrope', sans-serif", fontWeight: 600, textTransform: 'uppercase',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(181,149,86,0.1)'; e.currentTarget.style.borderColor = logoGold; e.currentTarget.style.color = '#EBE1CD'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(181,149,86,0.55)'; e.currentTarget.style.color = textColor; }}>
                                🙏 പൂജ ബുക്ക് ചെയ്യുക
                            </a>
                        </div>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md-hidden" onClick={() => setIsOpen(!isOpen)}
                        style={{ background: 'none', border: 'none', color: '#F3E9D2', padding: '4px', cursor: 'none' }}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            {isOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 40,
                    background: 'rgba(21,12,7,0.98)', backdropFilter: 'blur(24px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px',
                }}>
                    <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,149,86,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <span style={{ fontSize: '2.8rem', filter: 'drop-shadow(0 0 16px rgba(181,149,86,0.7))', animation: 'flicker 3s ease-in-out infinite' }}>🪔</span>
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="nav-link"
                            style={{ fontSize: '1.3rem', fontFamily: "'Noto Serif Malayalam', serif", letterSpacing: '0.12em', color: '#F3E9D2' }}
                            onClick={e => { e.preventDefault(); setIsOpen(false); scrollTo(link.href); }}>
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="btn-gold" style={{ marginTop: '8px' }}
                        onClick={e => { e.preventDefault(); setIsOpen(false); scrollTo('#contact'); }}>
                        🙏 പൂജ ബുക്ക് ചെയ്യുക
                    </a>
                </div>
            )}
        </>
    );
}

// Responsive helpers
const styles = `
  @media (min-width: 768px) {
    .md-flex   { display: flex !important; }
    .md-hidden { display: none !important; }
  }
`;
if (typeof document !== 'undefined') {
    const id = 'nav-styles';
    if (!document.getElementById(id)) {
        const el = document.createElement('style');
        el.id = id; el.innerHTML = styles;
        document.head.appendChild(el);
    }
}
