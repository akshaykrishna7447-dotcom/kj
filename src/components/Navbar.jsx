import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden,   setHidden  ] = useState(false);
    const [isOpen,   setIsOpen  ] = useState(false);
    const magneticBtn = useMagnetic({ strength: 0.4, radius: 80 });

    useEffect(() => {
        let ticking = false;
        let lastScrollY = window.scrollY;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setScrolled(currentScrollY > 50);
                    
                    // Hide nav when scrolling down past 200px, show when scrolling up
                    if (currentScrollY > 200) {
                        if (currentScrollY > lastScrollY) {
                            setHidden(true);
                        } else if (currentScrollY < lastScrollY - 10) {
                            setHidden(false); // buffer to prevent jitter
                        }
                    } else {
                        setHidden(false);
                    }
                    lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
                    ticking = false;
                });
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
                position: 'fixed', top: scrolled ? '20px' : '30px', left: 0, right: 0, zIndex: 50,
                display: 'flex', justifyContent: 'center', pointerEvents: 'none',
                transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                transform: hidden ? 'translateY(-150px)' : 'translateY(0)',
                padding: '0 20px',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: scrolled ? '12px 32px' : '16px 40px',
                    background: scrolled ? 'rgba(21,12,7,0.85)' : 'rgba(21,12,7,0.4)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '100px', pointerEvents: 'auto',
                    border: scrolled ? `1px solid rgba(181,149,86,0.3)` : `1px solid rgba(181,149,86,0.15)`,
                    boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(181,149,86,0.1) inset' : '0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(181,149,86,0.05) inset',
                    transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}>
                    {/* Desktop links */}
                    <div style={{ display: 'none', gap: '40px', justifyContent: 'center', alignItems: 'center' }} className="md-flex">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="nav-link"
                                style={{ color: textColor, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em', transition: 'color 0.3s ease' }}
                                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                                onMouseEnter={e => e.target.style.color = logoGold}
                                onMouseLeave={e => e.target.style.color = textColor}>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button className="md-hidden" onClick={() => setIsOpen(!isOpen)}
                        style={{ background: 'none', border: 'none', color: '#F3E9D2', padding: '4px', cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
