import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface Member {
  id: string;
  email: string | null;
  full_name: string | null;
  plan: string | null;
  is_verified: boolean | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  member: Member | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    plan: string
  ) => Promise<{ error: string | null; needsConfirm?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMember = async (uid: string) => {
    const { data } = await supabase
      .from('members')
      .select('*')
      .eq('id', uid)
      .maybeSingle();
    setMember(data as Member | null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadMember(data.session.user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        loadMember(sess.user.id);
      } else {
        setMember(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    plan: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };

    const uid = data.user?.id;
    if (uid) {
      await supabase.from('members').upsert({
        id: uid,
        email,
        full_name: fullName,
        plan,
        is_verified: true,
      });
    }

    if (!data.session) {
      // Try immediate sign in (works when email confirmation is disabled)
      const { error: sErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (sErr) return { error: null, needsConfirm: true };
    }
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setMember(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, member, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
