/**
 * Base hourly rates (CAD) per category slug.
 * Each entry has { min, max } representing the typical range.
 */
export const BASE_RATES: Record<string, { min: number; max: number }> = {
  painting: { min: 35, max: 65 },
  moving: { min: 40, max: 80 },
  snow_removal: { min: 30, max: 60 },
  furniture_assembly: { min: 30, max: 55 },
  cleaning: { min: 25, max: 50 },
  plumbing: { min: 60, max: 120 },
  electrical: { min: 60, max: 120 },
  landscaping: { min: 35, max: 70 },
  handyman: { min: 35, max: 65 },
  junk_removal: { min: 40, max: 80 },
};

export interface PriceSuggestion {
  min: number;
  max: number;
  average: number;
}

/**
 * Suggest a price range for a job based on category, job details, and estimated hours.
 */
export function suggestPrice(
  categorySlug: string,
  details: Record<string, unknown>,
  estimatedHours: number
): PriceSuggestion {
  const rates = BASE_RATES[categorySlug] ?? { min: 35, max: 65 };

  let multiplier = 1.0;

  // Emergency / urgent jobs have a premium
  if (details.is_emergency || details.is_urgent) {
    multiplier += 0.5;
  }

  // Complexity adjustments by category
  switch (categorySlug) {
    case 'painting': {
      const condition = String(details.wall_condition || '');
      if (condition.includes('Poor')) multiplier += 0.3;
      else if (condition.includes('Fair')) multiplier += 0.15;
      if (details.includes_ceiling) multiplier += 0.2;
      if (details.includes_trim) multiplier += 0.15;
      break;
    }
    case 'moving': {
      const originFloor = String(details.origin_floor || '');
      const destFloor = String(details.destination_floor || '');
      if (originFloor.includes('3rd') || destFloor.includes('3rd')) multiplier += 0.15;
      if (originFloor.includes('4th') || destFloor.includes('4th')) multiplier += 0.3;
      if (!details.has_elevator && (originFloor !== 'Ground/Main' || destFloor !== 'Ground/Main')) {
        multiplier += 0.2;
      }
      if (details.needs_packing) multiplier += 0.25;
      const heavyItems = details.heavy_items;
      if (Array.isArray(heavyItems) && heavyItems.length > 0) {
        multiplier += heavyItems.length * 0.05;
      }
      break;
    }
    case 'snow_removal': {
      const snowDepth = String(details.snow_depth || '');
      if (snowDepth.includes('Heavy')) multiplier += 0.25;
      if (snowDepth.includes('Very Heavy')) multiplier += 0.5;
      if (details.includes_salting) multiplier += 0.15;
      break;
    }
    case 'furniture_assembly': {
      if (details.includes_wall_mount) multiplier += 0.2;
      const numItems = Number(details.num_items) || 1;
      if (numItems > 5) multiplier += 0.1;
      break;
    }
    case 'cleaning': {
      const cleaningType = String(details.cleaning_type || '');
      if (cleaningType.includes('Deep')) multiplier += 0.3;
      if (cleaningType.includes('Move')) multiplier += 0.4;
      if (cleaningType.includes('Construction')) multiplier += 0.5;
      if (details.has_pets) multiplier += 0.1;
      const extras = details.extras;
      if (Array.isArray(extras) && extras.length > 0) {
        multiplier += extras.length * 0.05;
      }
      break;
    }
    case 'plumbing':
    case 'electrical': {
      if (details.is_emergency) multiplier += 0.3; // additional emergency premium
      const homeAge = String(details.home_age || '');
      if (homeAge.includes('Very Old')) multiplier += 0.25;
      else if (homeAge.includes('Old')) multiplier += 0.15;
      break;
    }
    case 'landscaping': {
      if (details.has_slope) multiplier += 0.15;
      if (details.includes_disposal) multiplier += 0.1;
      break;
    }
    case 'handyman': {
      const numTasks = Number(details.num_tasks) || 1;
      if (numTasks > 3) multiplier += 0.1;
      break;
    }
    case 'junk_removal': {
      const loadSize = String(details.load_size || '');
      if (loadSize.includes('Full')) multiplier += 0.3;
      if (loadSize.includes('Multiple')) multiplier += 0.6;
      if (details.has_stairs) multiplier += 0.15;
      if (details.needs_sorting) multiplier += 0.1;
      break;
    }
  }

  const min = Math.round(rates.min * estimatedHours * multiplier);
  const max = Math.round(rates.max * estimatedHours * multiplier);
  const average = Math.round((min + max) / 2);

  return { min, max, average };
}

/**
 * Estimate hours needed for a job based on category and details.
 */
export function estimateHours(
  categorySlug: string,
  details: Record<string, unknown>
): number {
  switch (categorySlug) {
    case 'painting': {
      const sqft = Number(details.total_sqft) || 0;
      const rooms = Number(details.rooms) || 1;
      // ~200 sq ft per hour, plus 0.5hr per room for prep
      let hours = sqft / 200 + rooms * 0.5;
      if (details.includes_ceiling) hours *= 1.3;
      if (details.includes_trim) hours += rooms * 0.5;
      const condition = String(details.wall_condition || '');
      if (condition.includes('Poor')) hours += rooms * 0.75;
      else if (condition.includes('Fair')) hours += rooms * 0.3;
      return Math.max(2, Math.round(hours * 2) / 2); // round to nearest 0.5
    }

    case 'moving': {
      const moveType = String(details.move_type || '');
      const baseHours: Record<string, number> = {
        'Studio/1-Bedroom': 3,
        '2-Bedroom': 5,
        '3-Bedroom': 7,
        '4+ Bedroom': 10,
        'Office': 6,
        'Single Items': 1.5,
      };
      let hours = baseHours[moveType] ?? 5;
      const distanceKm = Number(details.distance_km) || 10;
      hours += distanceKm / 40; // drive time roughly
      if (details.needs_packing) hours *= 1.5;
      if (!details.has_elevator) {
        const origin = String(details.origin_floor || '');
        const dest = String(details.destination_floor || '');
        if (origin.includes('3rd') || dest.includes('3rd')) hours += 1;
        if (origin.includes('4th') || dest.includes('4th')) hours += 2;
      }
      return Math.max(1.5, Math.round(hours * 2) / 2);
    }

    case 'snow_removal': {
      const areaSqft = Number(details.area_sqft) || 500;
      // ~500 sq ft per hour manual, ~2000 for machine
      const isLarge = areaSqft > 3000;
      let hours = isLarge ? areaSqft / 2000 : areaSqft / 500;
      if (details.includes_salting) hours += 0.5;
      const snowDepth = String(details.snow_depth || '');
      if (snowDepth.includes('Heavy')) hours *= 1.5;
      if (snowDepth.includes('Very Heavy')) hours *= 2;
      return Math.max(0.5, Math.round(hours * 2) / 2);
    }

    case 'furniture_assembly': {
      const numItems = Number(details.num_items) || 1;
      // Average 1.5 hours per item (some are quick, some complex)
      let hours = numItems * 1.5;
      if (details.includes_wall_mount) hours += numItems * 0.3;
      return Math.max(1, Math.round(hours * 2) / 2);
    }

    case 'cleaning': {
      const sqft = Number(details.total_sqft) || 800;
      const numBathrooms = Number(details.num_bathrooms) || 1;
      const cleaningType = String(details.cleaning_type || '');
      // Base: 500 sq ft per hour for regular, less for deep
      let ratePerHour = 500;
      if (cleaningType.includes('Deep')) ratePerHour = 300;
      if (cleaningType.includes('Move') || cleaningType.includes('Construction')) ratePerHour = 250;
      let hours = sqft / ratePerHour + numBathrooms * 0.5;
      if (details.has_pets) hours *= 1.1;
      const extras = details.extras;
      if (Array.isArray(extras)) hours += extras.length * 0.3;
      return Math.max(1.5, Math.round(hours * 2) / 2);
    }

    case 'plumbing': {
      const numFixtures = Number(details.num_fixtures) || 1;
      // Average 1.5 hours per fixture for basic work
      let hours = numFixtures * 1.5;
      const issueType = String(details.issue_type || '');
      if (issueType.includes('Water Heater')) hours = Math.max(hours, 4);
      if (issueType.includes('Pipe')) hours = Math.max(hours, 3);
      return Math.max(1, Math.round(hours * 2) / 2);
    }

    case 'electrical': {
      const numPoints = Number(details.num_points) || 1;
      let hours = numPoints * 1;
      const workType = String(details.work_type || '');
      if (workType.includes('Panel')) hours = Math.max(hours, 6);
      if (workType.includes('Wiring')) hours = Math.max(hours, 4);
      if (workType.includes('EV Charger')) hours = Math.max(hours, 4);
      return Math.max(1, Math.round(hours * 2) / 2);
    }

    case 'landscaping': {
      const yardSize = String(details.yard_size || '');
      const baseHours: Record<string, number> = {
        'Small (< 1000 sq ft)': 2,
        'Medium (1000-3000 sq ft)': 4,
        'Large (3000-5000 sq ft)': 6,
        'Very Large (5000+ sq ft)': 10,
      };
      let hours = baseHours[yardSize] ?? 4;
      if (details.has_slope) hours *= 1.2;
      if (details.includes_disposal) hours += 1;
      const serviceType = String(details.service_type || '');
      if (serviceType.includes('Full Landscaping')) hours *= 2;
      if (serviceType.includes('Patio')) hours = Math.max(hours, 8);
      return Math.max(1, Math.round(hours * 2) / 2);
    }

    case 'handyman': {
      const numTasks = Number(details.num_tasks) || 1;
      const estimated = Number(details.estimated_hours) || 0;
      if (estimated > 0) return estimated;
      // Average 1 hour per task
      return Math.max(1, numTasks);
    }

    case 'junk_removal': {
      const loadSize = String(details.load_size || '');
      const baseHours: Record<string, number> = {
        'Small (few items)': 1,
        'Quarter Truck': 1.5,
        'Half Truck': 2.5,
        'Full Truck': 4,
        'Multiple Loads': 6,
      };
      let hours = baseHours[loadSize] ?? 2;
      if (details.has_stairs) hours += 0.5;
      if (details.needs_sorting) hours += 1;
      return Math.max(1, Math.round(hours * 2) / 2);
    }

    default:
      return 2;
  }
}
