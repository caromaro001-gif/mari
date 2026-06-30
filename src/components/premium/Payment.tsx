import React, { useState } from 'react';
import { Copy, Check, Bitcoin, DollarSign } from 'lucide-react';
import { SITE } from '@/config/site';
import ScrollReveal from './ScrollReveal';

const CopyField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
        <span className="flex-1 truncate font-mono text-sm text-amber-200">
          {value}
        </span>
        <button
          onClick={copy}
          className="rounded-lg bg-amber-500/10 p-2 text-amber-300 hover:bg-amber-500/20 transition-colors"
          aria-label="Copy"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <section id="payment" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            Step 1
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
            Send Your Payment
          </h2>
          <p className="mt-4 text-gray-400">
            We accept Cash App and Bitcoin only. Send to the details below, then
            verify your payment.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-emerald-500/15 p-2.5 text-emerald-400">
                  <DollarSign className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl text-white">Cash App</h3>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Send the exact plan amount to our Cash App tag.
              </p>
              <div className="mt-5">
                <CopyField label="Cash App Tag" value={SITE.cashApp} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-orange-500/15 p-2.5 text-orange-400">
                  <Bitcoin className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl text-white">Bitcoin (BTC)</h3>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Send the equivalent BTC to our wallet address.
              </p>
              <div className="mt-5">
                <CopyField label="BTC Wallet Address" value={SITE.btcAddress} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Payment;
