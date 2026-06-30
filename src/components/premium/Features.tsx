import React from 'react';
import { Lock } from 'lucide-react';
import { FEATURES } from '@/data/content';
import ScrollReveal from './ScrollReveal';

interface FeaturesProps {
  onSection: (id: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ onSection }) => {
  return (
    <section id="features" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            What's Inside
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
            Premium Features, Fully Locked
          </h2>
          <p className="mt-4 text-gray-400">
            Every set is blurred until you unlock. Subscribe to reveal the full
            experience.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <ScrollReveal key={f.title} delay={i * 80}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="h-full w-full object-cover blur-md brightness-75 scale-110 transition-all duration-500 group-hover:blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full border border-amber-400/40 bg-black/50 p-3 backdrop-blur">
                        <Lock className="h-5 w-5 text-amber-300" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl bg-amber-500/10 p-2 text-amber-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-serif text-lg text-white">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-gray-400">{f.description}</p>
                    <button
                      onClick={() => onSection('pricing')}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
                    >
                      <Lock className="h-3.5 w-3.5" /> Unlock to view
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
