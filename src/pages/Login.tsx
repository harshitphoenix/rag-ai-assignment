import React, { useCallback, useId, useState } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

const accent = '#53b987';
const heading = '#44475b';

function TopoPattern({ patternId }: { patternId: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-white/25"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={patternId} width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            d="M0 40 Q30 20 60 40 T120 40 M0 80 Q40 60 80 80 T120 75 M20 0 Q40 30 20 60 T20 120 M80 10 Q100 40 70 70 T90 120"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

const underlineInput =
  'rounded-none border-0 border-b border-slate-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#53b987]';

export default function Login() {
  useAuth(false);
  const topoPatternId = useId().replace(/:/g, '');

  const { login, error, loading, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const tryDismiss = useCallback(() => {
    if (window.history.length > 1) window.history.back();
  }, []);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Minimum 6 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await login(email, password);
  };

  return (
    <Dialog open onOpenChange={(next) => !next && tryDismiss()}>
      <DialogContent className="p-0">
        <DialogClose asChild>
          <button
            type="button"
            className="absolute right-3 top-3 z-[60] rounded-[var(--radius-ui)] p-1 text-slate-500 opacity-80 transition-opacity hover:bg-slate-100 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            aria-label="Close"
            onClick={tryDismiss}
          >
            <X className="h-5 w-5" />
          </button>
        </DialogClose>

        <div className="flex max-h-[min(92vh,720px)] flex-col md:max-h-[min(640px,90vh)] md:flex-row">
          <div
            className="relative flex min-h-[11rem] w-full shrink-0 flex-col justify-between p-6 text-white md:w-[42%] md:min-h-0 md:p-8"
            style={{ backgroundColor: accent }}
          >
            <TopoPattern patternId={topoPatternId} />
            <div className="relative z-[1]">
              <p className="text-xl font-bold leading-snug md:text-2xl">Simple, secure care.</p>
            </div>
            <div className="relative z-[1] flex items-center gap-2">
              <span
                className="inline-block size-4 shrink-0 rounded-[var(--radius-ui)] bg-white/90"
                aria-hidden
              />
              <span className="text-lg font-bold" style={{ letterSpacing: '0.04em' }}>
                EHR
              </span>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col bg-white">
            <div className="max-h-[min(70vh,560px)] overflow-y-auto overscroll-contain px-6 pb-6 pt-12 md:max-h-none md:px-8 md:pb-8 md:pt-10">
              <DialogTitle
                className="mb-8 text-center text-xl font-bold md:text-[22px]"
                style={{ color: heading }}
              >
                Welcome to HealthOS
              </DialogTitle>
              <DialogDescription className="sr-only">
                Sign in with your email and password to open the HealthOS dashboard.
              </DialogDescription>

              <Button
                type="button"
                variant="outline"
                disabled
                title="Sign-in with Google is not enabled in this build"
                className="w-full gap-2 py-6 opacity-70"
                style={{ color: heading }}
              >
                <svg className="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">Or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4 py-2">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col">
                <div className="mb-4">
                  <Label htmlFor="login-email" className="sr-only">
                    Your email address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    placeholder="Your Email Address"
                    aria-invalid={!!fieldErrors.email}
                    className={cn(underlineInput, fieldErrors.email && 'border-red-400')}
                    style={{ color: heading }}
                  />
                  {fieldErrors.email && (
                    <p className="mt-2 text-xs text-red-600">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Label htmlFor="login-password" className="sr-only">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    placeholder="Password"
                    aria-invalid={!!fieldErrors.password}
                    className={cn(underlineInput, fieldErrors.password && 'border-red-400')}
                    style={{ color: heading }}
                  />
                  {fieldErrors.password && (
                    <p className="mt-2 text-xs text-red-600">{fieldErrors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 text-base font-bold text-white shadow-sm hover:opacity-95"
                  style={{ backgroundColor: accent, borderColor: accent }}
                >
                  {loading ? 'Signing in…' : 'Continue'}
                </Button>
              </form>

              <p
                className="mt-6 text-center text-[11px] leading-relaxed md:mt-8 md:text-xs"
                style={{ color: heading }}
              >
                By proceeding, I agree to{' '}
                <Button type="button" variant="link" className="h-auto p-0 text-[11px] md:text-xs" style={{ color: heading }}>
                  Terms
                </Button>
                ,{' '}
                <Button type="button" variant="link" className="h-auto p-0 text-[11px] md:text-xs" style={{ color: heading }}>
                  Privacy Policy
                </Button>
                {' & '}
                <Button type="button" variant="link" className="h-auto p-0 text-[11px] md:text-xs" style={{ color: heading }}>
                  Data use
                </Button>
                .
              </p>

              <p className="mt-3 text-center text-[10px] text-slate-400 md:text-[11px]">
                Demo: demo@health.com · demo123
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
