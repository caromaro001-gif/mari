import React from 'react';
import { Check, Crown, Star } from 'lucide-react';
import { PLANS } from '@/data/content';
import ScrollReveal from './ScrollReveal';

interface PricingProps {
  onSelect: (planName: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelect }) => {
  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            Membership
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
            Choose Your Access
          </h2>
          <p className="mt-4 text-gray-400">
            One payment unlocks the vault. Pick the tier that fits you.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.popular
                    ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/[0.12] to-white/[0.02] shadow-[0_0_45px_rgba(212,175,55,0.18)]'
                    : 'border-white/10 bg-white/[0.03] hover:border-amber-500/30'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-4 py-1 text-xs font-bold text-black">
                    <Star className="h-3 w-3" /> MOST POPULAR
                  </span>
                )}
                <div className="flex items-center gap-2 text-amber-400">
                  <Crown className="h-5 w-5" />
                  <h3 className="font-serif text-xl text-white">{plan.name}</h3>
                </div>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-serif text-5xl text-white">
                    ${plan.price}
                  </span>
                  <span className="mb-1.5 text-sm text-gray-400">
                    {plan.cadence}
                  </span>
                </div>
                <ul className="mt-7 space-y-3 flex-1">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelect(plan.name)}
                  className={`mt-8 rounded-full px-6 py-3 font-semibold transition-shadow ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'
                      : 'border border-amber-500/40 text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  Unlock Premium
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
