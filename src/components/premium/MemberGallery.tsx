import React, { useEffect, useState } from 'react';
import {
  Loader2,
  Lock,
  Play,
  Image as ImageIcon,
  ShieldCheck,
  LogIn,
  ArrowLeft,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import ScrollReveal from './ScrollReveal';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  media_url: string;
  description: string | null;
}

interface MemberGalleryProps {
  onBack: () => void;
  onLogin: () => void;
}

const MemberGallery: React.FC<MemberGalleryProps> = ({ onBack, onLogin }) => {
  const { user, member, loading: authLoading, signOut } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setItems((data as GalleryItem[]) || []);
        setLoading(false);
      });
  }, [user]);

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      </main>
    );
  }

  // Gated: not logged in
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-5 pt-28 pb-20">
        <ScrollReveal>
          <div className="max-w-md rounded-3xl border border-amber-500/20 bg-white/[0.03] p-9 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15">
              <Lock className="h-8 w-8 text-amber-400" />
            </div>
            <h1 className="mt-6 font-serif text-2xl text-white">
              Members Only Area
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              This private gallery is reserved for verified subscribers. Log in
              to unlock the full, un-blurred premium collection.
            </p>
            <button
              onClick={onLogin}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-7 py-3 font-semibold text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-shadow"
            >
              <LogIn className="h-4 w-4" /> Member Login
            </button>
            <button
              onClick={onBack}
              className="mt-4 block w-full text-sm text-gray-500 hover:text-amber-400"
            >
              Back to home
            </button>
          </div>
        </ScrollReveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </button>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Member Access
            </span>
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl text-white">
              Your Private Gallery
            </h1>
            <p className="mt-2 text-gray-400">
              Welcome back{member?.full_name ? `, ${member.full_name}` : ''}.
              {member?.plan ? ` Plan: ${member.plan}.` : ''} Everything below is
              fully unlocked.
            </p>
          </div>
          <button
            onClick={signOut}
            className="self-start rounded-full border border-white/15 px-5 py-2.5 text-sm text-white hover:bg-white/5"
          >
            Log out
          </button>
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it, i) => (
              <ScrollReveal key={it.id} delay={i * 70}>
                <button
                  onClick={() => setActive(it)}
                  className="group block w-full text-left overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:border-amber-500/40 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={it.media_url}
                      alt={it.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {it.category === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="rounded-full bg-amber-400/90 p-4">
                          <Play className="h-6 w-6 fill-black text-black" />
                        </div>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-amber-300 backdrop-blur">
                      {it.category === 'video' ? (
                        <Play className="h-3 w-3" />
                      ) : (
                        <ImageIcon className="h-3 w-3" />
                      )}
                      {it.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-white">{it.title}</h3>
                    {it.description && (
                      <p className="mt-1 text-sm text-gray-400">{it.description}</p>
                    )}
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/20 bg-zinc-950">
            <img
              src={active.media_url}
              alt={active.title}
              className="max-h-[70vh] w-full object-contain bg-black"
            />
            <div className="p-6">
              <h3 className="font-serif text-xl text-white">{active.title}</h3>
              {active.description && (
                <p className="mt-1 text-sm text-gray-400">{active.description}</p>
              )}
              <button
                onClick={() => setActive(null)}
                className="mt-4 rounded-full border border-white/15 px-5 py-2 text-sm text-white hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MemberGallery;
