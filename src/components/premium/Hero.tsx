import React from 'react';
import { Lock, ChevronDown, ShieldCheck } from 'lucide-react';
import { PREVIEW_IMAGES, HERO_BG } from '@/data/content';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  onSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSection }) => {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Premium Access
            </span>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl xl:text-6xl leading-[1.1] text-white">
              Unlock{' '}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                MariiUtrera's
              </span>{' '}
              Exclusive Premium Content
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed">
              Private content, exclusive updates, premium galleries,
              behind-the-scenes access, and subscriber-only drops.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSection('pricing')}
                className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-8 py-3.5 font-semibold text-black hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-shadow"
              >
                Unlock Premium
              </button>
              <button
                onClick={() => onSection('features')}
                className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors"
              >
                Preview Content
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200} className="relative">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {PREVIEW_IMAGES.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-amber-500/15"
                style={{ animation: `float 6s ease-in-out ${i * 0.4}s infinite` }}
              >
                <img
                  src={src}
                  alt="Locked premium preview"
                  className="h-full w-full object-cover scale-105 blur-md brightness-75"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-amber-300/90" />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <button
        onClick={() => onSection('features')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-amber-300/70 hover:text-amber-300 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
