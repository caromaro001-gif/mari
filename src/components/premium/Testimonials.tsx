import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/content';
import ScrollReveal from './ScrollReveal';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            Subscribers Love It
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
            What Members Say
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.handle} delay={i * 90}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-amber-500/30 hover:-translate-y-1">
                <Quote className="h-7 w-7 text-amber-500/40" />
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-5 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-700 text-sm font-bold text-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.handle}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
