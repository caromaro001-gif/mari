import React from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/config/site';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2"
      aria-label="Chat on WhatsApp"
    >
      <span className="hidden sm:block rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
        Need Help? Chat on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="relative h-7 w-7 text-white" />
      </span>
    </a>
  );
};

export default WhatsAppButton;
