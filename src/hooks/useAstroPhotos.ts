import { dsoPhotoMap, AstroPhotoEntry } from '@/data/dsoPhotos';

/**
 * Get astrophotography images for a given DSO catalog ID (e.g. "M31", "C11").
 * Returns an array of photos, or empty if none available.
 */
export function getDsoPhotos(dsoId: string | null): AstroPhotoEntry[] {
  if (!dsoId) return [];
  return dsoPhotoMap[dsoId] ?? [];
}
