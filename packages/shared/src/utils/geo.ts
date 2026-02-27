/**
 * Calculate the distance between two geographic points using the Haversine formula.
 * Returns distance in kilometers.
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const EARTH_RADIUS_KM = 6371;

  const toRad = (deg: number): number => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Check if a point is within a given radius of another point.
 */
export function isWithinRadius(
  proLat: number,
  proLng: number,
  jobLat: number,
  jobLng: number,
  radiusKm: number
): boolean {
  return calculateDistance(proLat, proLng, jobLat, jobLng) <= radiusKm;
}

export interface AddressComponents {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

/**
 * Format address components into a single string.
 */
export function formatAddress(components: AddressComponents): string {
  const parts: string[] = [];

  if (components.street) parts.push(components.street);
  if (components.city) parts.push(components.city);
  if (components.province) {
    if (components.postalCode) {
      parts.push(`${components.province} ${components.postalCode}`);
    } else {
      parts.push(components.province);
    }
  } else if (components.postalCode) {
    parts.push(components.postalCode);
  }
  if (components.country) parts.push(components.country);

  return parts.join(', ');
}

export interface GeoPosition {
  lat: number;
  lng: number;
}

/**
 * Get the current geographic position of the device.
 * Returns a promise that resolves with latitude and longitude.
 * Works in browser environments with the Geolocation API.
 */
export function getCurrentPosition(): Promise<GeoPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported in this environment'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out'));
            break;
          default:
            reject(new Error('Failed to get current position'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}

/**
 * Calculate the bounding box for a given center point and radius.
 * Useful for database queries that filter by approximate location before doing exact distance.
 */
export function getBoundingBox(
  lat: number,
  lng: number,
  radiusKm: number
): { minLat: number; maxLat: number; minLng: number; maxLng: number } {
  const latDelta = radiusKm / 111.32; // 1 degree of latitude ~ 111.32 km
  const lngDelta = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));

  return {
    minLat: lat - latDelta,
    maxLat: lat + latDelta,
    minLng: lng - lngDelta,
    maxLng: lng + lngDelta,
  };
}
