/**
 * Google Service Account authentication via JWT token exchange.
 * Uses GOOGLE_SERVICE_ACCOUNT_JSON env var (server-only).
 */

import { GoogleAuth } from 'google-auth-library';

let authClient: GoogleAuth | null = null;

function getServiceAccountCredentials() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var is not set');
  }
  try {
    return JSON.parse(json);
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON');
  }
}

export function getGoogleAuth(scopes: string[]): GoogleAuth {
  if (authClient) return authClient;

  const credentials = getServiceAccountCredentials();

  authClient = new GoogleAuth({
    credentials,
    scopes,
  });

  return authClient;
}

/** Get an authenticated access token for Google APIs */
export async function getAccessToken(scopes: string[]): Promise<string> {
  const auth = getGoogleAuth(scopes);
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  if (!tokenResponse.token) {
    throw new Error('Failed to obtain Google access token');
  }
  return tokenResponse.token;
}
