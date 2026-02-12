/**
 * Time utility functions
 */

/**
 * Convert JWT expiration string to milliseconds
 *
 * @param expiration - JWT expiration string (e.g., '15m', '1h', '24h', '7d')
 * @returns Milliseconds
 *
 * @example
 * parseExpirationToMs('15m') // 900000
 * parseExpirationToMs('1h')  // 3600000
 * parseExpirationToMs('24h') // 86400000
 * parseExpirationToMs('7d')  // 604800000
 */
export function parseExpirationToMs(expiration: string): number {
  const match = expiration.match(/^(\d+)([smhd])$/);

  if (!match) {
    // Default to 24 hours if invalid format
    return 24 * 60 * 60 * 1000;
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
}

/**
 * Convert milliseconds to human-readable time
 *
 * @param ms - Milliseconds
 * @returns Human-readable string
 *
 * @example
 * msToReadable(3600000) // '1 hour'
 * msToReadable(86400000) // '1 day'
 */
export function msToReadable(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
}
