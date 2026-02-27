import { useState, useCallback } from 'react';

export interface GeolocationData {
  lat: number;
  lng: number;
  accuracy: number;
  address: string | null;
  timestamp: number;
}

export type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'unsupported';

interface GeolocationState {
  location: GeolocationData | null;
  loading: boolean;
  error: string | null;
  permissionStatus: PermissionStatus;
}

/**
 * GPS location hook. Uses navigator.geolocation with optional
 * reverse geocoding via Nominatim (free, no key needed).
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
    permissionStatus: 'prompt',
  });

  const reverseGeocode = useCallback(
    async (lat: number, lng: number): Promise<string | null> => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          { headers: { 'User-Agent': 'RenoNextField/1.0' } }
        );
        if (!res.ok) return null;
        const data = await res.json();
        return data.display_name ?? null;
      } catch {
        return null;
      }
    },
    []
  );

  const getCurrentPosition = useCallback(
    async (includeAddress = true): Promise<GeolocationData | null> => {
      if (!navigator.geolocation) {
        setState((s) => ({
          ...s,
          error: 'Geolocation not supported',
          permissionStatus: 'unsupported',
        }));
        return null;
      }

      setState((s) => ({ ...s, loading: true, error: null }));

      return new Promise<GeolocationData | null>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            let address: string | null = null;
            if (includeAddress) {
              address = await reverseGeocode(latitude, longitude);
            }
            const loc: GeolocationData = {
              lat: latitude,
              lng: longitude,
              accuracy,
              address,
              timestamp: position.timestamp,
            };
            setState({
              location: loc,
              loading: false,
              error: null,
              permissionStatus: 'granted',
            });
            resolve(loc);
          },
          (err) => {
            const permissionStatus: PermissionStatus =
              err.code === err.PERMISSION_DENIED ? 'denied' : 'prompt';
            const errorMsg =
              err.code === err.PERMISSION_DENIED
                ? 'Location permission denied'
                : err.code === err.POSITION_UNAVAILABLE
                  ? 'Location unavailable'
                  : 'Location request timed out';
            setState({
              location: null,
              loading: false,
              error: errorMsg,
              permissionStatus,
            });
            resolve(null);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      });
    },
    [reverseGeocode]
  );

  return {
    ...state,
    getCurrentPosition,
  };
}
