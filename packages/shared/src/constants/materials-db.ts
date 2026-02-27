import type { MaterialFormula } from '../types/material';

/**
 * Complete material formulas database keyed by category slug.
 * Each formula function takes a job details object and returns the computed quantity.
 */
export const MATERIAL_FORMULAS: Record<string, MaterialFormula[]> = {
  painting: [
    {
      materialName: 'Interior Paint',
      unit: 'gallon',
      formula: (details) => {
        const sqft = Number(details.total_sqft) || 0;
        const coats = 2;
        const coveragePerGallon = 350; // sq ft per gallon
        return Math.ceil((sqft * coats) / coveragePerGallon);
      },
      isRequired: true,
      estimatedUnitPrice: 45,
      notes: 'Based on 350 sq ft coverage per gallon, 2 coats.',
    },
    {
      materialName: 'Primer',
      unit: 'gallon',
      formula: (details) => {
        const sqft = Number(details.total_sqft) || 0;
        const condition = String(details.wall_condition || '');
        const multiplier = condition.includes('Poor') ? 1 : 0.5;
        const coveragePerGallon = 300;
        return Math.ceil((sqft * multiplier) / coveragePerGallon);
      },
      isRequired: true,
      estimatedUnitPrice: 35,
      notes: 'Full coat for poor walls, half for fair/good.',
    },
    {
      materialName: 'Painter\'s Tape',
      unit: 'roll',
      formula: (details) => {
        const rooms = Number(details.rooms) || 1;
        return Math.ceil(rooms * 1.5);
      },
      isRequired: true,
      estimatedUnitPrice: 8,
      notes: '1.5 rolls per room on average.',
    },
    {
      materialName: 'Drop Cloth',
      unit: 'piece',
      formula: (details) => {
        const rooms = Number(details.rooms) || 1;
        return Math.ceil(rooms / 2);
      },
      isRequired: true,
      estimatedUnitPrice: 12,
      notes: 'One drop cloth covers approximately 2 rooms.',
    },
    {
      materialName: 'Roller Covers',
      unit: 'piece',
      formula: (details) => {
        const rooms = Number(details.rooms) || 1;
        const numColors = Number(details.num_colors) || 1;
        return Math.max(numColors * 2, Math.ceil(rooms / 2));
      },
      isRequired: true,
      estimatedUnitPrice: 6,
      notes: '2 per color minimum, or 1 per 2 rooms.',
    },
    {
      materialName: 'Sandpaper (Assorted)',
      unit: 'pack',
      formula: (details) => {
        const sqft = Number(details.total_sqft) || 0;
        const condition = String(details.wall_condition || '');
        if (condition.includes('Poor')) return Math.ceil(sqft / 500);
        if (condition.includes('Fair')) return Math.ceil(sqft / 1000);
        return 1;
      },
      isRequired: false,
      estimatedUnitPrice: 10,
      notes: 'More needed for walls requiring extensive prep.',
    },
    {
      materialName: 'Wood Filler / Spackle',
      unit: 'tub',
      formula: (details) => {
        const condition = String(details.wall_condition || '');
        if (condition.includes('Poor')) return 2;
        if (condition.includes('Fair')) return 1;
        return 0;
      },
      isRequired: false,
      estimatedUnitPrice: 14,
      notes: 'For patching holes and imperfections.',
    },
  ],

  moving: [
    {
      materialName: 'Moving Boxes (Medium)',
      unit: 'box',
      formula: (details) => {
        const moveType = String(details.move_type || '');
        const baseBoxes: Record<string, number> = {
          'Studio/1-Bedroom': 20,
          '2-Bedroom': 35,
          '3-Bedroom': 50,
          '4+ Bedroom': 70,
          'Office': 40,
          'Single Items': 2,
        };
        return baseBoxes[moveType] ?? 30;
      },
      isRequired: true,
      estimatedUnitPrice: 3.5,
      notes: 'Medium boxes for general household items.',
    },
    {
      materialName: 'Moving Boxes (Large)',
      unit: 'box',
      formula: (details) => {
        const moveType = String(details.move_type || '');
        const baseBoxes: Record<string, number> = {
          'Studio/1-Bedroom': 8,
          '2-Bedroom': 15,
          '3-Bedroom': 22,
          '4+ Bedroom': 30,
          'Office': 15,
          'Single Items': 1,
        };
        return baseBoxes[moveType] ?? 12;
      },
      isRequired: true,
      estimatedUnitPrice: 5,
      notes: 'Large boxes for bulky lightweight items.',
    },
    {
      materialName: 'Packing Tape',
      unit: 'roll',
      formula: (details) => {
        const needsPacking = Boolean(details.needs_packing);
        const moveType = String(details.move_type || '');
        const base = moveType.includes('4+') ? 8 : moveType.includes('3') ? 6 : 4;
        return needsPacking ? base * 2 : base;
      },
      isRequired: true,
      estimatedUnitPrice: 5,
      notes: 'Double if packing service included.',
    },
    {
      materialName: 'Bubble Wrap',
      unit: 'roll',
      formula: (details) => {
        const needsPacking = Boolean(details.needs_packing);
        return needsPacking ? 3 : 1;
      },
      isRequired: false,
      estimatedUnitPrice: 20,
      notes: 'For fragile items protection.',
    },
    {
      materialName: 'Furniture Blankets',
      unit: 'piece',
      formula: (details) => {
        const moveType = String(details.move_type || '');
        const baseBlankets: Record<string, number> = {
          'Studio/1-Bedroom': 8,
          '2-Bedroom': 12,
          '3-Bedroom': 16,
          '4+ Bedroom': 24,
          'Office': 12,
          'Single Items': 2,
        };
        return baseBlankets[moveType] ?? 10;
      },
      isRequired: true,
      estimatedUnitPrice: 15,
      notes: 'Reusable blankets for furniture protection.',
    },
    {
      materialName: 'Stretch Wrap',
      unit: 'roll',
      formula: (details) => {
        const moveType = String(details.move_type || '');
        if (moveType === 'Single Items') return 1;
        return moveType.includes('4+') ? 4 : 2;
      },
      isRequired: true,
      estimatedUnitPrice: 12,
      notes: 'For securing drawers and wrapping upholstery.',
    },
    {
      materialName: 'Mattress Bags',
      unit: 'piece',
      formula: (details) => {
        const moveType = String(details.move_type || '');
        const beds: Record<string, number> = {
          'Studio/1-Bedroom': 1,
          '2-Bedroom': 2,
          '3-Bedroom': 3,
          '4+ Bedroom': 4,
          'Office': 0,
          'Single Items': 0,
        };
        return beds[moveType] ?? 1;
      },
      isRequired: false,
      estimatedUnitPrice: 10,
      notes: 'One per mattress to protect from dirt and moisture.',
    },
  ],

  snow_removal: [
    {
      materialName: 'Ice Melt / Rock Salt',
      unit: 'bag (20kg)',
      formula: (details) => {
        const includesSalting = Boolean(details.includes_salting);
        if (!includesSalting) return 0;
        const areaSqft = Number(details.area_sqft) || 0;
        // ~1 bag per 1500 sq ft for a standard application
        return Math.ceil(areaSqft / 1500);
      },
      isRequired: false,
      estimatedUnitPrice: 18,
      notes: 'Only needed if salting/de-icing is included.',
    },
    {
      materialName: 'Sand/Grit Mix',
      unit: 'bag (20kg)',
      formula: (details) => {
        const includesSalting = Boolean(details.includes_salting);
        if (!includesSalting) return 0;
        const areaSqft = Number(details.area_sqft) || 0;
        return Math.ceil(areaSqft / 2000);
      },
      isRequired: false,
      estimatedUnitPrice: 12,
      notes: 'Provides traction on ice. Used alongside salt.',
    },
    {
      materialName: 'Snow Stakes/Markers',
      unit: 'piece',
      formula: (details) => {
        const areaType = String(details.area_type || '');
        if (areaType === 'Parking Lot') return 20;
        if (areaType === 'Commercial Property') return 15;
        return 6;
      },
      isRequired: false,
      estimatedUnitPrice: 3,
      notes: 'Marks edges of driveways and walkways for plowing.',
    },
  ],

  furniture_assembly: [
    {
      materialName: 'Wall Anchors (Assorted)',
      unit: 'pack',
      formula: (details) => {
        const wallMount = Boolean(details.includes_wall_mount);
        const numItems = Number(details.num_items) || 1;
        if (!wallMount) return 0;
        return Math.ceil(numItems / 3);
      },
      isRequired: false,
      estimatedUnitPrice: 8,
      notes: 'Required when wall mounting is needed. Pack of 10 assorted anchors.',
    },
    {
      materialName: 'Felt Furniture Pads',
      unit: 'pack',
      formula: (details) => {
        const numItems = Number(details.num_items) || 1;
        return Math.ceil(numItems / 4);
      },
      isRequired: false,
      estimatedUnitPrice: 6,
      notes: 'Protects floors. One pack covers about 4 pieces of furniture.',
    },
  ],

  cleaning: [
    {
      materialName: 'All-Purpose Cleaner',
      unit: 'bottle',
      formula: (details) => {
        const cleaningType = String(details.cleaning_type || '');
        const isDeep = cleaningType.includes('Deep') || cleaningType.includes('Move') || cleaningType.includes('Construction');
        const sqft = Number(details.total_sqft) || 1000;
        const base = Math.ceil(sqft / 1500);
        return isDeep ? base * 2 : base;
      },
      isRequired: true,
      estimatedUnitPrice: 8,
      notes: 'Concentrated multi-surface cleaner.',
    },
    {
      materialName: 'Glass Cleaner',
      unit: 'bottle',
      formula: (details) => {
        const numBathrooms = Number(details.num_bathrooms) || 1;
        return Math.ceil(numBathrooms / 2) + 1;
      },
      isRequired: true,
      estimatedUnitPrice: 6,
      notes: 'For mirrors, glass surfaces, and windows.',
    },
    {
      materialName: 'Microfiber Cloths',
      unit: 'pack',
      formula: (details) => {
        const cleaningType = String(details.cleaning_type || '');
        const isDeep = cleaningType.includes('Deep') || cleaningType.includes('Move');
        return isDeep ? 2 : 1;
      },
      isRequired: true,
      estimatedUnitPrice: 12,
      notes: 'Pack of 12 reusable microfiber cloths.',
    },
    {
      materialName: 'Bathroom Disinfectant',
      unit: 'bottle',
      formula: (details) => {
        const numBathrooms = Number(details.num_bathrooms) || 1;
        return Math.ceil(numBathrooms / 2);
      },
      isRequired: true,
      estimatedUnitPrice: 7,
      notes: 'Heavy-duty bathroom cleaner and disinfectant.',
    },
  ],
};

/**
 * Calculate materials for a given category and job details.
 * Returns an array of MaterialFormula results with computed quantities.
 */
export function calculateMaterials(
  categorySlug: string,
  details: Record<string, unknown>
): Array<MaterialFormula & { quantity: number; estimatedCost: number }> {
  const formulas = MATERIAL_FORMULAS[categorySlug];
  if (!formulas) return [];

  return formulas
    .map((formula) => {
      const quantity = formula.formula(details);
      return {
        ...formula,
        quantity,
        estimatedCost: quantity * formula.estimatedUnitPrice,
      };
    })
    .filter((m) => m.quantity > 0);
}
