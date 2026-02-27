export const APP_NAME = 'RenoNext';

/** Platform fee percentage taken from each job payment */
export const PLATFORM_FEE_PERCENT = 12;

/** Minimum allowed bid amount in CAD */
export const MIN_BID_AMOUNT = 25;

/** Maximum service radius a pro can set in kilometers */
export const MAX_SERVICE_RADIUS_KM = 100;

/** Default search radius for finding nearby jobs/pros in kilometers */
export const DEFAULT_RADIUS_KM = 25;

/** Maximum image upload size in megabytes */
export const IMAGE_MAX_SIZE_MB = 10;

/** Maximum image upload size in bytes */
export const IMAGE_MAX_SIZE_BYTES = IMAGE_MAX_SIZE_MB * 1024 * 1024;

/** Supported image MIME types for uploads */
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
] as const;

/** Number of items per page for paginated lists */
export const ITEMS_PER_PAGE = 20;

/** Maximum number of photos per job posting */
export const MAX_JOB_PHOTOS = 10;

/** Maximum number of photos per progress update */
export const MAX_PROGRESS_PHOTOS = 5;

/** Maximum number of photos per review */
export const MAX_REVIEW_PHOTOS = 5;

/** Bid expiry time in hours */
export const BID_EXPIRY_HOURS = 72;

/** Ontario HST rate */
export const HST_RATE = 0.13;
