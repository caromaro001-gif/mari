import React, { useState } from 'react';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE } from '@/config/site';
import { PLANS } from '@/data/content';
import ScrollReveal from './ScrollReveal';

interface VerificationFormProps {
  selectedPlan: string;
  onPlanChange: (plan: string) => void;
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50 transition-colors';

const VerificationForm: React.FC<VerificationFormProps> = ({
  selectedPlan,
  onPlanChange,
}) => {
  const [method, setMethod] = useState<'Cash App' | 'Bitcoin'>('Cash App');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const subscribeToCrm = async (email: string, name: string, phone: string, smsOptIn: boolean) => {
    try {
      await fetch(
        'https://famous.ai/api/crm/6a43d36580360f5deac41024/subscribe',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: name || undefined,
            phone: phone || undefined,
            sms_opt_in: smsOptIn,
            source: 'verification-form',
            tags: ['premium', 'payment-verification'],
          }),
        }
      );
    } catch {
      /* non-blocking */
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const email = String(fd.get('email') || '');
    const name = String(fd.get('fullName') || '');
    const phone = String(fd.get('phone') || '');
    const smsOptIn = fd.get('smsOptIn') === 'on';

    await subscribeToCrm(email, name, phone, smsOptIn);

   try {
  const res = await fetch(SITE.formspreeEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: fd,
  });

  const responseText = await res.text();

  console.log('Formspree Endpoint:', SITE.formspreeEndpoint);
  console.log('Formspree Status:', res.status);
  console.log('Formspree Response:', responseText);

  if (res.ok) {
    setDone(true);
    form.reset();
  } else {
    setError(
      `Submission failed (${res.status}). Check the browser console for details.`
    );
  }
} catch (err) {
  console.error('Network Error:', err);
  setError('Network error. Please check your connection and try again.');
} finally {
  setLoading(false);
}
  };

  if (done) {
    return (
      <section id="verify" className="py-24 sm:py-28">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <ScrollReveal>
            <div className="rounded-3xl border border-amber-500/30 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15">
                <CheckCircle2 className="h-9 w-9 text-amber-400" />
              </div>
              <h2 className="mt-6 font-serif text-2xl text-white">
                Thank You!
              </h2>
              <p className="mt-3 text-gray-300">
                Your payment is being reviewed. Access instructions will be sent
                once payment is confirmed.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-7 rounded-full border border-amber-500/40 px-6 py-2.5 text-sm font-medium text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                Submit Another
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="verify" className="py-24 sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <ScrollReveal className="text-center">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            Step 2
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
            Verify Your Payment
          </h2>
          <p className="mt-4 text-gray-400">
            Submit your details and we'll confirm your access.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9 backdrop-blur-xl"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Full Name
                </label>
                <input name="fullName" required className={inputClass} placeholder="John Doe" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Phone number (optional)
              </label>
              <input
                name="phone"
                type="tel"
                className={inputClass}
                placeholder="+1 555 000 0000"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Selected Plan
                </label>
                <select
                  name="selectedPlan"
                  value={selectedPlan}
                  onChange={(e) => onPlanChange(e.target.value)}
                  required
                  className={inputClass}
                >
                  {PLANS.map((p) => (
                    <option key={p.name} value={p.name} className="bg-zinc-900">
                      {p.name} — ${p.price}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  required
                  className={inputClass}
                >
                  <option value="Cash App" className="bg-zinc-900">Cash App</option>
                  <option value="Bitcoin" className="bg-zinc-900">Bitcoin (BTC)</option>
                </select>
              </div>
            </div>

            {method === 'Cash App' ? (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Cash App Username
                </label>
                <input name="cashAppUsername" className={inputClass} placeholder="$YourTag" />
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  BTC Transaction Hash
                </label>
                <input name="btcTxHash" className={inputClass} placeholder="Transaction hash / TXID" />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Amount Paid
              </label>
              <input name="amountPaid" required className={inputClass} placeholder="$25" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Screenshot Upload (optional)
              </label>
              <input
                name="screenshot"
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-amber-500/15 file:px-4 file:py-2 file:text-amber-300 hover:file:bg-amber-500/25"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Notes</label>
              <textarea
                name="notes"
                rows={3}
                className={inputClass}
                placeholder="Anything we should know..."
              />
            </div>

            <label className="flex items-start gap-3 text-xs text-gray-400">
              <input
                type="checkbox"
                name="smsOptIn"
                defaultChecked
                className="mt-0.5 h-4 w-4 accent-amber-500"
              />
              <span>
                Text me updates. Msg &amp; data rates may apply. Reply STOP to
                unsubscribe.
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-6 py-3.5 font-semibold text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-shadow disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5" /> Verify Payment
                </>
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VerificationForm;
