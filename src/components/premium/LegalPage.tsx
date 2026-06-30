import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SITE } from '@/config/site';

interface Section {
  heading: string;
  body: string;
}

interface LegalPageProps {
  title: string;
  intro: string;
  sections: Section[];
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, intro, sections, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </button>
        <h1 className="mt-8 font-serif text-3xl sm:text-4xl text-white">{title}</h1>
        <p className="mt-4 text-gray-400">{intro}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-serif text-xl text-amber-300">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-gray-600">
          © {new Date().getFullYear()} {SITE.brand}. Last updated {new Date().toLocaleDateString()}.
        </p>
      </div>
    </main>
  );
};

export const PRIVACY_SECTIONS: Section[] = [
  { heading: 'Information We Collect', body: 'We collect the details you provide on the verification form, including your name, email, phone (optional), payment method, and transaction information. This is used solely to confirm payment and deliver access.' },
  { heading: 'How We Use Your Data', body: 'Your information is used to verify payments, grant access to premium content, and provide customer support. We do not sell or rent your personal data to third parties.' },
  { heading: 'Data Security', body: 'We take reasonable measures to protect your information. Payment confirmations are handled securely and access details are sent directly to your email.' },
  { heading: 'Your Rights', body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us through the contact page or WhatsApp.' },
  { heading: 'Communications', body: 'If you opt in to SMS or email updates, we may send you membership updates. You can opt out at any time by replying STOP or contacting us.' },
];

export const TERMS_SECTIONS: Section[] = [
  { heading: 'Acceptance of Terms', body: 'By accessing or subscribing to this site, you agree to these Terms of Service. If you do not agree, please do not use the service.' },
  { heading: 'Eligibility', body: 'You must be at least 18 years of age (or the age of majority in your jurisdiction) to subscribe and access premium content.' },
  { heading: 'Payments & Access', body: 'Payments are accepted via Cash App and Bitcoin only. Access is granted after payment verification. Lifetime plans are one-time payments; Monthly and VIP plans renew per the selected cadence.' },
  { heading: 'Content License', body: 'All premium content is for your personal use only. Redistribution, resale, screen recording, or sharing of any content is strictly prohibited and may result in immediate termination without refund.' },
  { heading: 'Refunds', body: 'Due to the digital nature of the content, all sales are final and non-refundable once access has been granted.' },
  { heading: 'Limitation of Liability', body: 'The service is provided "as is" without warranties of any kind. We are not liable for any indirect or consequential damages arising from use of the service.' },
];

export default LegalPage;
