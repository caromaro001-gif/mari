import React, { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';
import Navbar from './premium/Navbar';
import Hero from './premium/Hero';
import Features from './premium/Features';
import Pricing from './premium/Pricing';
import Payment from './premium/Payment';
import VerificationForm from './premium/VerificationForm';
import Testimonials from './premium/Testimonials';
import FAQ from './premium/FAQ';
import Footer from './premium/Footer';
import WhatsAppButton from './premium/WhatsAppButton';
import Contact from './premium/Contact';
import LegalPage, { PRIVACY_SECTIONS, TERMS_SECTIONS } from './premium/LegalPage';
import AuthModal from './premium/AuthModal';
import MemberGallery from './premium/MemberGallery';

type Page = 'home' | 'privacy' | 'terms' | 'contact' | 'gallery';

const Loader: React.FC = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
    <Crown className="h-12 w-12 text-amber-400 animate-pulse" />
    <p className="mt-4 font-serif text-lg text-white tracking-wide">
      Marii<span className="text-amber-400">Utrera</span> Premium
    </p>
    <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-white/10">
      <div className="h-full w-1/2 animate-[shimmer_1.1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    </div>
    <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
  </div>
);

const AppLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<Page>('home');
  const [selectedPlan, setSelectedPlan] = useState('VIP Access');
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const navigate = (p: string) => setPage(p as Page);

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const selectPlan = (planName: string) => {
    setPage('home');
    setSelectedPlan(planName);
    setTimeout(() => scrollTo('payment'), 60);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased selection:bg-amber-500/30">
      <Navbar
        onNavigate={navigate}
        onSection={scrollTo}
        onLogin={() => setAuthOpen(true)}
        onGallery={() => navigate('gallery')}
      />

      {page === 'home' && (
        <main>
          <Hero onSection={scrollTo} />
          <Features onSection={scrollTo} />
          <Pricing onSelect={selectPlan} />
          <Payment />
          <VerificationForm
            selectedPlan={selectedPlan}
            onPlanChange={setSelectedPlan}
          />
          <Testimonials />
          <FAQ />
        </main>
      )}

      {page === 'gallery' && (
        <MemberGallery
          onBack={() => navigate('home')}
          onLogin={() => setAuthOpen(true)}
        />
      )}

      {page === 'privacy' && (
        <LegalPage
          title="Privacy Policy"
          intro="Your privacy matters. This policy explains how we collect, use, and protect your information."
          sections={PRIVACY_SECTIONS}
          onBack={() => navigate('home')}
        />
      )}

      {page === 'terms' && (
        <LegalPage
          title="Terms of Service"
          intro="Please read these terms carefully before subscribing to MariiUtrera Premium."
          sections={TERMS_SECTIONS}
          onBack={() => navigate('home')}
        />
      )}

      {page === 'contact' && <Contact onBack={() => navigate('home')} />}

      <Footer onNavigate={navigate} onSection={scrollTo} />
      <WhatsAppButton />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => navigate('gallery')}
      />
    </div>
  );
};

export default AppLayout;
