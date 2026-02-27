/**
 * Returns true when the app is in demo mode (show mock data).
 * Field: VITE_DEMO_MODE=true
 * Web:   NEXT_PUBLIC_DEMO_MODE=true
 */
export function isDemoMode(): boolean {
  // Vite (field app)
  if (typeof import.meta !== 'undefined' && (import.meta as unknown as Record<string, unknown>).env) {
    const env = (import.meta as unknown as { env: Record<string, string> }).env;
    if (env.VITE_DEMO_MODE === 'true') return true;
  }
  // Next.js (web app) / Node
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') return true;
  }
  return true; // default to demo mode for development
}
