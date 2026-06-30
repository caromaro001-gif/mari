import React, { useEffect, useState } from 'react';
import { Menu, X, Crown, LockOpen, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  onSection: (id: string) => void;
  onLogin: () => void;
  onGallery: () => void;
}

const links = [
  { label: 'Features', id: 'features' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Payment', id: 'payment' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onSection,
  onLogin,
  onGallery,
}) => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (id === 'contact') {
      onNavigate('contact');
    } else {
      onNavigate('home');
      setTimeout(() => onSection(id), 50);
    }
  };

  const memberBtn = (mobile?: boolean) =>
    user ? (
      <button
        onClick={() => {
          setOpen(false);
          onGallery();
        }}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-5 py-2 text-sm font-semibold text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-shadow ${
          mobile ? 'w-full py-2.5' : ''
        }`}
      >
        <LockOpen className="h-4 w-4" /> My Gallery
      </button>
    ) : (
      <button
        onClick={() => {
          setOpen(false);
          onLogin();
        }}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/40 px-5 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-500/10 transition-colors ${
          mobile ? 'w-full py-2.5' : ''
        }`}
      >
        <LogIn className="h-4 w-4" /> Member Login
      </button>
    );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-amber-500/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => {
            onNavigate('home');
            onSection('top');
          }}
          className="flex items-center gap-2 group"
        >
          <Crown className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif text-lg md:text-xl tracking-wide text-white">
            Marii<span className="text-amber-400">Utrera</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-gray-300 hover:text-amber-400 transition-colors"
            >
              {l.label}
            </button>
          ))}
          {memberBtn()}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-amber-500/10 px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-left text-gray-200 py-2 hover:text-amber-400 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <div className="mt-2">{memberBtn(true)}</div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
