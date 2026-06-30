import React, { useState } from 'react';
import { X, Loader2, Crown, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PLANS } from '@/data/content';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50 transition-colors';

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSuccess }) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [plan, setPlan] = useState('VIP Access');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else {
        onSuccess?.();
        onClose();
      }
    } else {
      const { error, needsConfirm } = await signUp(email, password, fullName, plan);
      if (error) setError(error);
      else if (needsConfirm) {
        setInfo('Account created! Please check your email to confirm, then log in.');
        setMode('login');
      } else {
        onSuccess?.();
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl border border-amber-500/20 bg-zinc-950 p-7 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-400" />
          <h2 className="font-serif text-xl text-white">
            {mode === 'login' ? 'Member Login' : 'Create Member Account'}
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          {mode === 'login'
            ? 'Log in to access your unlocked premium gallery.'
            : 'Verified subscribers — create your account to unlock content.'}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputClass}
                placeholder="Full name"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={inputClass}
              placeholder="Password (min 6 chars)"
            />
          </div>
          {mode === 'signup' && (
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
            >
              {PLANS.map((p) => (
                <option key={p.name} value={p.name} className="bg-zinc-900">
                  {p.name}
                </option>
              ))}
            </select>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}
          {info && <p className="text-sm text-amber-400">{info}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 px-6 py-3 font-semibold text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-shadow disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : mode === 'login' ? (
              'Log In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          {mode === 'login' ? "Don't have an account? " : 'Already a member? '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
              setInfo('');
            }}
            className="font-medium text-amber-400 hover:text-amber-300"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
