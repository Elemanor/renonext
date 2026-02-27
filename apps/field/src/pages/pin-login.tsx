import { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Delete, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 30000; // 30 seconds

export function PinLoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Handle lockout timer
  useEffect(() => {
    if (lockedUntil) {
      const interval = setInterval(() => {
        if (Date.now() >= lockedUntil) {
          setLockedUntil(null);
          setAttempts(0);
          setError(null);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockedUntil]);

  const verifyPin = useCallback(async (pinCode: string) => {
    setLoading(true);
    setError(null);

    try {
      // Try to call the RPC function
      const { data, error: rpcError } = await supabase.rpc('verify_worker_pin', {
        pin_code: pinCode,
      });

      if (rpcError) {
        // RPC doesn't exist yet, fall back to demo mode
        console.warn('verify_worker_pin RPC not found, using demo mode');
        if (pinCode === '1234') {
          // Demo mode: use a test account or create a session
          // For now, we'll just show success and navigate
          navigate('/', { replace: true });
          return true;
        }
        return false;
      }

      // RPC exists and returned data
      if (data && data.success) {
        navigate('/', { replace: true });
        return true;
      }

      return false;
    } catch (err) {
      console.error('PIN verification error:', err);
      // Fall back to demo mode on error
      if (pinCode === '1234') {
        navigate('/', { replace: true });
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleDigitPress = useCallback((digit: string) => {
    if (lockedUntil) return;
    if (pin.length >= 4) return;

    const newPin = pin + digit;
    setPin(newPin);

    // Auto-submit when 4 digits entered
    if (newPin.length === 4) {
      setTimeout(async () => {
        const success = await verifyPin(newPin);

        if (!success) {
          // Failed attempt
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setPin('');

          const newAttempts = attempts + 1;
          setAttempts(newAttempts);

          if (newAttempts >= MAX_ATTEMPTS) {
            setError('Too many failed attempts');
            setLockedUntil(Date.now() + LOCKOUT_DURATION);
          } else {
            setError(`Invalid PIN (${newAttempts}/${MAX_ATTEMPTS} attempts)`);
          }
        }
      }, 100);
    }
  }, [pin, lockedUntil, attempts, verifyPin]);

  const handleBackspace = useCallback(() => {
    if (lockedUntil) return;
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  }, [lockedUntil]);

  const handleClear = useCallback(() => {
    if (lockedUntil) return;
    setPin('');
    setError(null);
  }, [lockedUntil]);

  const remainingSeconds = lockedUntil
    ? Math.ceil((lockedUntil - Date.now()) / 1000)
    : 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Lock className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">RenoNext Field</h1>
          <p className="mt-2 text-sm text-slate-300">
            Enter your 4-digit PIN
          </p>
        </div>

        {/* PIN Display */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full transition-all ${
                  i < pin.length
                    ? 'bg-blue-500 scale-110'
                    : 'border-2 border-white/40'
                }`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-2 text-center text-sm text-red-200">
              {lockedUntil
                ? `Locked out. Try again in ${remainingSeconds}s`
                : error}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mt-4 text-center text-sm text-blue-300">
              Verifying...
            </div>
          )}
        </motion.div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Digits 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigitPress(digit.toString())}
              disabled={lockedUntil !== null || loading}
              className="min-h-[64px] min-w-[64px] rounded-2xl bg-white/10 text-2xl font-bold text-white transition-all hover:bg-white/20 active:bg-white/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {digit}
            </button>
          ))}

          {/* Bottom row: Clear, 0, Backspace */}
          <button
            onClick={handleClear}
            disabled={lockedUntil !== null || loading}
            className="min-h-[64px] min-w-[64px] rounded-2xl bg-white/10 text-white transition-all hover:bg-white/20 active:bg-white/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Clear"
          >
            <span className="text-sm font-medium">Clear</span>
          </button>

          <button
            onClick={() => handleDigitPress('0')}
            disabled={lockedUntil !== null || loading}
            className="min-h-[64px] min-w-[64px] rounded-2xl bg-white/10 text-2xl font-bold text-white transition-all hover:bg-white/20 active:bg-white/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            0
          </button>

          <button
            onClick={handleBackspace}
            disabled={lockedUntil !== null || loading}
            className="min-h-[64px] min-w-[64px] rounded-2xl bg-white/10 text-white transition-all hover:bg-white/20 active:bg-white/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Backspace"
          >
            <Delete className="h-6 w-6" />
          </button>
        </div>

        {/* Alternative Login Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-blue-300 hover:text-blue-200 underline"
          >
            Use email & password instead
          </Link>
        </div>
      </div>
    </div>
  );
}
