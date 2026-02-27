export interface CategoryDetailField {
  name: string;
  type: 'number' | 'text' | 'select' | 'boolean' | 'multiselect';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  unit?: string;
  min?: number;
  max?: number;
}

export interface CategoryDefinition {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  detailFields: CategoryDetailField[];
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'cat_painting',
    name: 'Painting',
    slug: 'painting',
    icon: 'palette',
    description: 'Interior and exterior painting for homes and businesses',
    detailFields: [
      {
        name: 'rooms',
        type: 'number',
        label: 'Number of Rooms',
        required: true,
        min: 1,
        max: 50,
      },
      {
        name: 'total_sqft',
        type: 'number',
        label: 'Total Square Footage',
        required: true,
        unit: 'sq ft',
        min: 50,
        max: 10000,
      },
      {
        name: 'ceiling_height',
        type: 'select',
        label: 'Ceiling Height',
        required: true,
        options: ['8 ft', '9 ft', '10 ft', '12 ft', 'Vaulted/Custom'],
      },
      {
        name: 'paint_type',
        type: 'select',
        label: 'Paint Type',
        required: true,
        options: ['Flat/Matte', 'Eggshell', 'Satin', 'Semi-Gloss', 'Gloss'],
      },
      {
        name: 'includes_ceiling',
        type: 'boolean',
        label: 'Include Ceiling Painting',
        required: false,
      },
      {
        name: 'includes_trim',
        type: 'boolean',
        label: 'Include Trim/Baseboards',
        required: false,
      },
      {
        name: 'wall_condition',
        type: 'select',
        label: 'Wall Condition',
        required: true,
        options: ['Good - minimal prep', 'Fair - some patching needed', 'Poor - extensive prep required'],
      },
      {
        name: 'num_colors',
        type: 'number',
        label: 'Number of Colors',
        required: false,
        min: 1,
        max: 20,
      },
    ],
  },
  {
    id: 'cat_moving',
    name: 'Moving',
    slug: 'moving',
    icon: 'truck',
    description: 'Local and long-distance moving services',
    detailFields: [
      {
        name: 'move_type',
        type: 'select',
        label: 'Move Type',
        required: true,
        options: ['Studio/1-Bedroom', '2-Bedroom', '3-Bedroom', '4+ Bedroom', 'Office', 'Single Items'],
      },
      {
        name: 'origin_floor',
        type: 'select',
        label: 'Origin Floor Level',
        required: true,
        options: ['Ground/Main', '2nd Floor', '3rd Floor', '4th+ Floor', 'Basement'],
      },
      {
        name: 'destination_floor',
        type: 'select',
        label: 'Destination Floor Level',
        required: true,
        options: ['Ground/Main', '2nd Floor', '3rd Floor', '4th+ Floor', 'Basement'],
      },
      {
        name: 'has_elevator',
        type: 'boolean',
        label: 'Elevator Available',
        required: false,
      },
      {
        name: 'distance_km',
        type: 'number',
        label: 'Distance Between Locations',
        required: true,
        unit: 'km',
        min: 1,
        max: 500,
      },
      {
        name: 'needs_packing',
        type: 'boolean',
        label: 'Need Packing Services',
        required: false,
      },
      {
        name: 'heavy_items',
        type: 'multiselect',
        label: 'Heavy/Special Items',
        required: false,
        options: ['Piano', 'Pool Table', 'Safe', 'Hot Tub', 'Gym Equipment', 'Appliances'],
      },
    ],
  },
  {
    id: 'cat_snow_removal',
    name: 'Snow Removal',
    slug: 'snow_removal',
    icon: 'snowflake',
    description: 'Driveway, walkway, and parking lot snow clearing',
    detailFields: [
      {
        name: 'area_type',
        type: 'select',
        label: 'Area Type',
        required: true,
        options: ['Residential Driveway', 'Walkway/Sidewalk', 'Parking Lot', 'Commercial Property'],
      },
      {
        name: 'area_sqft',
        type: 'number',
        label: 'Area Size',
        required: true,
        unit: 'sq ft',
        min: 50,
        max: 50000,
      },
      {
        name: 'includes_salting',
        type: 'boolean',
        label: 'Include Salting/De-icing',
        required: false,
      },
      {
        name: 'is_recurring',
        type: 'boolean',
        label: 'Recurring Service (Full Season)',
        required: false,
      },
      {
        name: 'snow_depth',
        type: 'select',
        label: 'Estimated Snow Depth',
        required: false,
        options: ['Light (< 5 cm)', 'Moderate (5-15 cm)', 'Heavy (15-30 cm)', 'Very Heavy (30+ cm)'],
      },
    ],
  },
  {
    id: 'cat_furniture_assembly',
    name: 'Furniture Assembly',
    slug: 'furniture_assembly',
    icon: 'wrench',
    description: 'Assembly of flat-pack and ready-to-assemble furniture',
    detailFields: [
      {
        name: 'num_items',
        type: 'number',
        label: 'Number of Items',
        required: true,
        min: 1,
        max: 50,
      },
      {
        name: 'item_types',
        type: 'multiselect',
        label: 'Item Types',
        required: true,
        options: [
          'Bed Frame', 'Desk', 'Bookshelf', 'Dresser', 'Wardrobe/Closet',
          'Dining Table', 'TV Stand', 'Office Chair', 'Shelving Unit', 'Other',
        ],
      },
      {
        name: 'brand',
        type: 'select',
        label: 'Primary Brand',
        required: false,
        options: ['IKEA', 'Wayfair', 'Amazon', 'Structube', 'CB2', 'Other'],
      },
      {
        name: 'has_instructions',
        type: 'boolean',
        label: 'Instructions Available',
        required: false,
      },
      {
        name: 'includes_wall_mount',
        type: 'boolean',
        label: 'Wall Mounting Needed',
        required: false,
      },
    ],
  },
  {
    id: 'cat_cleaning',
    name: 'Cleaning',
    slug: 'cleaning',
    icon: 'sparkles',
    description: 'Residential and commercial cleaning services',
    detailFields: [
      {
        name: 'cleaning_type',
        type: 'select',
        label: 'Cleaning Type',
        required: true,
        options: ['Regular Cleaning', 'Deep Cleaning', 'Move-In/Move-Out', 'Post-Construction', 'One-Time'],
      },
      {
        name: 'home_size',
        type: 'select',
        label: 'Home Size',
        required: true,
        options: ['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms'],
      },
      {
        name: 'num_bathrooms',
        type: 'number',
        label: 'Number of Bathrooms',
        required: true,
        min: 1,
        max: 10,
      },
      {
        name: 'total_sqft',
        type: 'number',
        label: 'Total Square Footage',
        required: false,
        unit: 'sq ft',
        min: 200,
        max: 10000,
      },
      {
        name: 'has_pets',
        type: 'boolean',
        label: 'Pets in Home',
        required: false,
      },
      {
        name: 'extras',
        type: 'multiselect',
        label: 'Extra Services',
        required: false,
        options: [
          'Inside Fridge', 'Inside Oven', 'Inside Cabinets',
          'Windows (Interior)', 'Laundry', 'Organize',
        ],
      },
    ],
  },
  {
    id: 'cat_plumbing',
    name: 'Plumbing',
    slug: 'plumbing',
    icon: 'droplets',
    description: 'Plumbing repairs, installations, and maintenance',
    detailFields: [
      {
        name: 'issue_type',
        type: 'select',
        label: 'Issue Type',
        required: true,
        options: [
          'Leak Repair', 'Drain Clog', 'Faucet Install/Repair',
          'Toilet Install/Repair', 'Water Heater', 'Pipe Repair/Replace',
          'Sump Pump', 'Garbage Disposal', 'Other',
        ],
      },
      {
        name: 'num_fixtures',
        type: 'number',
        label: 'Number of Fixtures',
        required: false,
        min: 1,
        max: 20,
      },
      {
        name: 'is_emergency',
        type: 'boolean',
        label: 'Emergency/Urgent',
        required: false,
      },
      {
        name: 'location_in_home',
        type: 'select',
        label: 'Location',
        required: true,
        options: ['Kitchen', 'Bathroom', 'Basement', 'Laundry Room', 'Exterior', 'Multiple'],
      },
    ],
  },
  {
    id: 'cat_electrical',
    name: 'Electrical',
    slug: 'electrical',
    icon: 'zap',
    description: 'Electrical repairs, installations, and upgrades',
    detailFields: [
      {
        name: 'work_type',
        type: 'select',
        label: 'Work Type',
        required: true,
        options: [
          'Outlet Install/Repair', 'Light Fixture', 'Switch Install/Repair',
          'Panel Upgrade', 'Wiring', 'EV Charger Install',
          'Generator Install', 'Smart Home', 'Other',
        ],
      },
      {
        name: 'num_points',
        type: 'number',
        label: 'Number of Points/Fixtures',
        required: false,
        min: 1,
        max: 50,
      },
      {
        name: 'home_age',
        type: 'select',
        label: 'Home Age',
        required: false,
        options: ['New (0-10 years)', 'Medium (10-30 years)', 'Old (30-50 years)', 'Very Old (50+ years)'],
      },
      {
        name: 'is_emergency',
        type: 'boolean',
        label: 'Emergency/Urgent',
        required: false,
      },
    ],
  },
  {
    id: 'cat_landscaping',
    name: 'Landscaping',
    slug: 'landscaping',
    icon: 'trees',
    description: 'Lawn care, garden design, and outdoor maintenance',
    detailFields: [
      {
        name: 'service_type',
        type: 'select',
        label: 'Service Type',
        required: true,
        options: [
          'Lawn Mowing', 'Garden Design', 'Tree Trimming', 'Hedge Trimming',
          'Leaf Removal', 'Mulching', 'Sod Installation', 'Irrigation',
          'Patio/Walkway', 'Full Landscaping',
        ],
      },
      {
        name: 'yard_size',
        type: 'select',
        label: 'Yard Size',
        required: true,
        options: ['Small (< 1000 sq ft)', 'Medium (1000-3000 sq ft)', 'Large (3000-5000 sq ft)', 'Very Large (5000+ sq ft)'],
      },
      {
        name: 'is_recurring',
        type: 'boolean',
        label: 'Recurring Service',
        required: false,
      },
      {
        name: 'has_slope',
        type: 'boolean',
        label: 'Sloped/Uneven Terrain',
        required: false,
      },
      {
        name: 'includes_disposal',
        type: 'boolean',
        label: 'Include Waste Disposal',
        required: false,
      },
    ],
  },
  {
    id: 'cat_handyman',
    name: 'Handyman',
    slug: 'handyman',
    icon: 'hammer',
    description: 'General repairs, installations, and odd jobs',
    detailFields: [
      {
        name: 'task_type',
        type: 'multiselect',
        label: 'Task Types',
        required: true,
        options: [
          'TV Mounting', 'Shelf Installation', 'Door Repair/Install',
          'Drywall Repair', 'Caulking', 'Weatherstripping',
          'Picture Hanging', 'Deck Repair', 'Fence Repair',
          'General Repairs', 'Other',
        ],
      },
      {
        name: 'num_tasks',
        type: 'number',
        label: 'Number of Tasks',
        required: true,
        min: 1,
        max: 20,
      },
      {
        name: 'estimated_hours',
        type: 'number',
        label: 'Estimated Hours Needed',
        required: false,
        min: 1,
        max: 40,
      },
      {
        name: 'materials_provided',
        type: 'boolean',
        label: 'Materials Already Purchased',
        required: false,
      },
    ],
  },
  {
    id: 'cat_junk_removal',
    name: 'Junk Removal',
    slug: 'junk_removal',
    icon: 'trash-2',
    description: 'Residential and commercial junk hauling and disposal',
    detailFields: [
      {
        name: 'load_size',
        type: 'select',
        label: 'Estimated Load Size',
        required: true,
        options: ['Small (few items)', 'Quarter Truck', 'Half Truck', 'Full Truck', 'Multiple Loads'],
      },
      {
        name: 'item_types',
        type: 'multiselect',
        label: 'Item Types',
        required: true,
        options: [
          'Furniture', 'Appliances', 'Electronics', 'Construction Debris',
          'Yard Waste', 'General Household', 'Mattresses', 'Hot Tub',
        ],
      },
      {
        name: 'location',
        type: 'select',
        label: 'Pickup Location',
        required: true,
        options: ['Curbside', 'Garage', 'Basement', 'Inside Home', 'Backyard'],
      },
      {
        name: 'has_stairs',
        type: 'boolean',
        label: 'Stairs Involved',
        required: false,
      },
      {
        name: 'needs_sorting',
        type: 'boolean',
        label: 'Needs Sorting/Separating',
        required: false,
      },
    ],
  },
];

/**
 * Look up a category definition by its slug.
 */
export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Look up a category definition by its id.
 */
export function getCategoryById(id: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
