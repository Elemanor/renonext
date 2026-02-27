import { calculateMaterials as calcFromDB } from '../constants/materials-db';
import type { MaterialFormula } from '../types/material';

export interface CalculatedMaterial extends MaterialFormula {
  quantity: number;
  estimatedCost: number;
}

/**
 * Calculate all required and optional materials for a given category and job details.
 * Delegates to the materials-db constants and returns enriched results.
 */
export function calculateMaterials(
  categorySlug: string,
  details: Record<string, unknown>
): CalculatedMaterial[] {
  return calcFromDB(categorySlug, details);
}

/**
 * Calculate the total estimated material cost for a job.
 */
export function calculateTotalMaterialCost(
  categorySlug: string,
  details: Record<string, unknown>
): number {
  const materials = calculateMaterials(categorySlug, details);
  return materials.reduce((total, m) => total + m.estimatedCost, 0);
}

/**
 * Get only the required materials for a category and details.
 */
export function getRequiredMaterials(
  categorySlug: string,
  details: Record<string, unknown>
): CalculatedMaterial[] {
  return calculateMaterials(categorySlug, details).filter((m) => m.isRequired);
}

/**
 * Get only the optional materials for a category and details.
 */
export function getOptionalMaterials(
  categorySlug: string,
  details: Record<string, unknown>
): CalculatedMaterial[] {
  return calculateMaterials(categorySlug, details).filter((m) => !m.isRequired);
}
