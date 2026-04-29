/**
 * Image Sequence Configuration
 * 
 * Centralized configuration for the professional hub photo sequence.
 * Update these values if the image assets change.
 */

export const HERO_SEQUENCE_CONFIG = {
  /** Base path relative to the public directory */
  basePath: '/images/professional-hub/renato-hero',
  /** File name prefix before the frame number */
  filePrefix: 'ezgif-frame-',
  /** File extension without the dot */
  fileExtension: 'jpg',
  /** Total number of frames in the sequence */
  totalFrames: 35,
  /** Starting frame index (first file number) */
  startIndex: 1,
  /** Zero-padding length for the frame number */
  padLength: 3,
} as const;

/**
 * Returns the URL for a specific frame in the sequence.
 * @param index - Zero-based frame index (0 to totalFrames - 1)
 */
export function getFrameUrl(index: number): string {
  const { basePath, filePrefix, fileExtension, startIndex, padLength } = HERO_SEQUENCE_CONFIG;
  const frameNumber = (index + startIndex).toString().padStart(padLength, '0');
  return `${basePath}/${filePrefix}${frameNumber}.${fileExtension}`;
}

/**
 * Returns all frame URLs in sequence order.
 */
export function getAllFrameUrls(): string[] {
  return Array.from(
    { length: HERO_SEQUENCE_CONFIG.totalFrames },
    (_, i) => getFrameUrl(i)
  );
}
