import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoSrc from '../assets/logo.png';

const links = [
  { name: 'How It Works', href: '#how' },
  { name: 'Fleet', href: '#fleet' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Requirements', href: '#requirements' },
  { name: 'FAQ', href: '#faq' },
  { name: 'List Your Car', href: '#partner' }
];

export default function Nav({ onBook }: { onBook?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-md py-4 shadow-sm border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center" style={{ height: '88px', width: '270px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={logoSrc}
              alt="Ivoire Rental"
              style={{
                position: 'absolute',
                height: '260px',
                width: 'auto',
                top: '-99px',
                left: '-18px',
                filter: 'brightness(0) invert(1)',
                imageRendering: 'auto',
              }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onBook}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-accent transition-colors"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 right-0 bg-card border-b border-white/10 z-40 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-primary py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); onBook?.(); }}
                className="mt-4 px-6 py-3 bg-primary text-primary-foreground text-center font-bold rounded-md hover:bg-accent transition-colors w-full"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
