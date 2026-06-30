import React from 'react';
import { Crown } from 'lucide-react';
import { SITE } from '@/config/site';

interface FooterProps {
  onNavigate: (page: string) => void;
  onSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onSection }) => {
  const go = (id: string) => {
    onNavigate('home');
    setTimeout(() => onSection(id), 50);
  };
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-amber-400" />
              <span className="font-serif text-lg text-white">
                Marii<span className="text-amber-400">Utrera</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              Premium, private, subscriber-only content. Unlock the full
              experience today.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><button onClick={() => go('features')} className="hover:text-amber-400">Features</button></li>
              <li><button onClick={() => go('pricing')} className="hover:text-amber-400">Pricing</button></li>
              <li><button onClick={() => go('payment')} className="hover:text-amber-400">Payment</button></li>
              <li><button onClick={() => go('faq')} className="hover:text-amber-400">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-amber-400">Members Gallery</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-400">Contact</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-amber-400">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-amber-400">Terms of Service</button></li>
            </ul>

          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Get Access</h4>
            <p className="mt-4 text-sm text-gray-400">
              Ready to unlock everything?
            </p>
            <button
              onClick={() => go('pricing')}
              className="mt-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-5 py-2.5 text-sm font-semibold text-black"
            >
              Unlock Premium
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
