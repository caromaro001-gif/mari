import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { SITE, whatsappLink } from '@/config/site';

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50 transition-colors';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get('email') || '');
    const name = String(fd.get('name') || '');

    try {
      await fetch('https://famous.ai/api/crm/6a43d36580360f5deac41024/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: 'contact-form',
          tags: ['contact'],
        }),
      });
    } catch {
      /* non-blocking */
    }

    try {
      await fetch(SITE.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });
    } catch {
      /* ignore */
    }
    setLoading(false);
    setDone(true);
    form.reset();
  };

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </button>
        <h1 className="mt-8 font-serif text-3xl sm:text-4xl text-white">Contact Us</h1>
        <p className="mt-4 text-gray-400">
          Questions before subscribing? Reach out and we'll help you get set up.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <a
            href={whatsappLink('Hi! I have a question about MariiUtrera Premium.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#25D366]/40 transition-colors"
          >
            <span className="rounded-xl bg-[#25D366]/15 p-2.5 text-[#25D366]">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">WhatsApp</p>
              <p className="text-xs text-gray-500">Fastest response</p>
            </div>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <span className="rounded-xl bg-amber-500/15 p-2.5 text-amber-400">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">Email Support</p>
              <p className="text-xs text-gray-500">Via the form below</p>
            </div>
          </div>
        </div>

        {done ? (
          <div className="mt-8 rounded-3xl border border-amber-500/30 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
            <CheckCircle2 className="mx-auto h-10 w-10 text-amber-400" />
            <p className="mt-4 text-gray-300">
              Thanks for reaching out! We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9 backdrop-blur-xl"
          >
            <input type="hidden" name="formType" value="contact" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Name</label>
                <input name="name" required className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-300">Email</label>
                <input name="email" type="email" required className={inputClass} placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-300">Message</label>
              <textarea name="message" rows={4} required className={inputClass} placeholder="How can we help?" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-6 py-3.5 font-semibold text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-shadow disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Contact;
