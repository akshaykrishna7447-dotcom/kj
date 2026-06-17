import { MessageCircle } from 'lucide-react';
export default function Footer() {
    return (
        <footer style={{ background: '#2A1206', borderTop: '1px solid rgba(201,146,26,0.2)', padding: '100px 0 60px', position: 'relative', overflow: 'hidden' }}>
            {/* Gold top border */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9921A, #E8C96A, #C9921A, transparent)' }} />

            {/* Warm ambient glow */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: 'radial-gradient(ellipse, rgba(201,146,26,0.08) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '48px', marginBottom: '56px' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: '24px' }}>
                            <span style={{ fontFamily: "'Noto Serif Malayalam',serif", fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.22em', background: 'linear-gradient(135deg, #F0D98A, #E8C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', lineHeight: 1 }}>കൊട്ടിവട്ടം</span>
                            <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.5em', color: 'rgba(232,201,106,0.7)', textTransform: 'uppercase' }}>ഇല്ലം</span>
                        </div>
                        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(242,235,220,0.7)', maxWidth: '300px', marginBottom: '32px' }}>
                            വൈദിക പാരമ്പര്യത്തിന്റെയും ഭക്തിയുടെയും സേവനത്തിന്റെയും ജീവിക്കുന്ന പൈതൃകം.
                        </p>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <a href="#" style={{ color: 'rgba(232,201,106,0.5)', transition: 'color 0.3s ease' }} onMouseEnter={e => e.target.style.color = '#E8C96A'} onMouseLeave={e => e.target.style.color = 'rgba(232,201,106,0.5)'}>
                                    <MessageCircle size={20} />
                                </a>
                            </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9921A', marginBottom: '26px' }}>വഴികാട്ടി</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                            {[
                                { name: 'പൈതൃകം', href: '#illam' },
                                { name: 'കുറിച്ച്', href: '#about' },
                                { name: 'പൂജകൾ', href: '#poojas' },
                                { name: 'ചിത്രങ്ങൾ', href: '#gallery' },
                            ].map(({ name, href }) => (
                                <a key={name} href={href}
                                    onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                                    style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.12em', color: 'rgba(242,235,220,0.65)', textDecoration: 'none', cursor: 'none', transition: 'color 0.3s ease' }}
                                    onMouseEnter={e => e.target.style.color = '#E8C96A'}
                                    onMouseLeave={e => e.target.style.color = 'rgba(242,235,220,0.65)'}>
                                    {name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9921A', marginBottom: '26px' }}>ബന്ധപ്പെടാൻ</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,146,26,0.45)', marginBottom: '4px' }}>ഫോൺ / വാട്ട്‌സ്ആപ്പ്</p>
                                <a href="tel:+919400000000" style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.85rem', color: 'rgba(242,235,220,0.8)', textDecoration: 'none' }}>+91 94000 00000</a>
                            </div>
                            <div>
                                <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,146,26,0.45)', marginBottom: '4px' }}>ഇമെയിൽ</p>
                                <a href="mailto:kottivattamillam@gmail.com" style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.85rem', color: 'rgba(242,235,220,0.8)', textDecoration: 'none' }}>info@kottivattamillam.com</a>
                            </div>
                            <div style={{ marginTop: '6px' }}>
                                <a href="https://wa.me/919400000000" target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#E8C96A', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, borderBottom: '1px solid rgba(232,201,106,0.3)', paddingBottom: '2px' }}>
                                    <MessageCircle size={13} /> മെസ്സേജ് അയക്കുക
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sacred verse */}
                    <div>
                        <h4 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9921A', marginBottom: '26px' }}>പവിത്ര ശ്ലോകം</h4>
                        <p style={{ fontFamily: "'Noto Serif Malayalam',serif", fontStyle: 'italic', fontSize: '1.15rem', color: '#E8C96A', marginBottom: '10px' }}>
                            "അസതോ മാ സദ്ഗമയ"
                        </p>
                        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.86rem', lineHeight: 1.75, color: 'rgba(242,235,220,0.65)' }} dangerouslySetInnerHTML={{__html: 'അജ്ഞാനത്തിൽ നിന്ന് സത്യത്തിലേക്കും,<br />ഇരുളിൽ നിന്ന് വെളിച്ചത്തിലേക്കും, മരണത്തിൽ നിന്ന് അമരത്വത്തിലേക്കും എന്നെ നയിച്ചാലും.'}} />
                        <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(242,235,220,0.28)', marginTop: '14px' }}>
                            — ബൃഹദാരണ്യക ഉപനിഷത്ത്
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,146,26,0.3), transparent)', marginBottom: '30px' }} />

                {/* Bottom */}
                <div style={{ borderTop: '1px solid rgba(201,146,26,0.15)', padding: '32px 32px 40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                    <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.85rem', color: 'rgba(242,235,220,0.5)' }}>
                        © {new Date().getFullYear()} കൊട്ടിവട്ടം ഇല്ലം. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.
                    </p>
                    <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.85rem', color: 'rgba(242,235,220,0.5)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ഒരു പുണ്യ പൈതൃകത്തിനായി ഭക്തിയോടെ നിർമ്മിച്ചത് <span style={{ color: '#C9921A' }}>✦</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
