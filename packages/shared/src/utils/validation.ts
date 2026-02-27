import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, 'Please enter a valid phone number')
    .nullable()
    .optional(),
  avatar_url: z.string().url('Must be a valid URL').nullable().optional(),
});

export const proProfileSchema = z.object({
  bio: z
    .string()
    .max(1000, 'Bio must be under 1000 characters')
    .nullable()
    .optional(),
  headline: z
    .string()
    .max(150, 'Headline must be under 150 characters')
    .nullable()
    .optional(),
  hourly_rate_min: z
    .number()
    .min(15, 'Minimum rate must be at least $15')
    .max(500, 'Rate seems too high')
    .nullable()
    .optional(),
  hourly_rate_max: z
    .number()
    .min(15, 'Maximum rate must be at least $15')
    .max(500, 'Rate seems too high')
    .nullable()
    .optional(),
  service_radius_km: z
    .number()
    .min(1, 'Radius must be at least 1 km')
    .max(100, 'Maximum radius is 100 km'),
  address: z.string().max(200).nullable().optional(),
  city: z.string().max(100).nullable().optional(),
  province: z
    .string()
    .length(2, 'Use 2-letter province code')
    .default('ON'),
  years_experience: z
    .number()
    .min(0)
    .max(60, 'Experience seems too high')
    .nullable()
    .optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
}).refine(
  (data) => {
    if (data.hourly_rate_min != null && data.hourly_rate_max != null) {
      return data.hourly_rate_max >= data.hourly_rate_min;
    }
    return true;
  },
  { message: 'Max rate must be greater than or equal to min rate', path: ['hourly_rate_max'] }
);

export const jobSchema = z.object({
  client_id: z.string().uuid(),
  category_id: z.string().min(1, 'Please select a category'),
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be under 200 characters'),
  description: z
    .string()
    .min(20, 'Please provide more detail (at least 20 characters)')
    .max(5000, 'Description must be under 5000 characters'),
  address: z.string().min(5, 'Please enter an address'),
  city: z.string().min(2, 'Please enter a city'),
  province: z.string().length(2).default('ON'),
  postal_code: z
    .string()
    .regex(
      /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,
      'Please enter a valid Canadian postal code'
    ),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  scheduled_date: z.string().nullable().optional(),
  scheduled_time_start: z.string().nullable().optional(),
  scheduled_time_end: z.string().nullable().optional(),
  is_flexible_date: z.boolean().default(false),
  is_urgent: z.boolean().default(false),
  estimated_hours: z.number().min(0.5).max(200).nullable().optional(),
  budget_min: z.number().min(0).nullable().optional(),
  budget_max: z.number().min(0).nullable().optional(),
  details: z.record(z.unknown()).default({}),
  photos: z.array(z.string()).default([]),
}).refine(
  (data) => {
    if (data.budget_min != null && data.budget_max != null) {
      return data.budget_max >= data.budget_min;
    }
    return true;
  },
  { message: 'Max budget must be greater than or equal to min budget', path: ['budget_max'] }
);

export const bidSchema = z.object({
  job_id: z.string().uuid(),
  pro_id: z.string().uuid(),
  amount: z.number().min(25, 'Minimum bid is $25'),
  estimated_hours: z
    .number()
    .min(0.5, 'Minimum is 0.5 hours')
    .max(200, 'Estimated hours seems too high'),
  message: z
    .string()
    .max(2000, 'Message must be under 2000 characters')
    .nullable()
    .optional(),
  proposed_date: z.string().nullable().optional(),
  proposed_time_start: z.string().nullable().optional(),
  proposed_time_end: z.string().nullable().optional(),
  includes_materials: z.boolean().default(false),
  material_cost: z.number().min(0).nullable().optional(),
});

export const reviewSchema = z.object({
  job_id: z.string().uuid(),
  reviewer_id: z.string().uuid(),
  reviewee_id: z.string().uuid(),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z
    .string()
    .min(10, 'Please write at least 10 characters')
    .max(2000, 'Review must be under 2000 characters')
    .nullable()
    .optional(),
  photos: z.array(z.string()).max(5).default([]),
  is_from_client: z.boolean(),
});

export const messageSchema = z.object({
  conversation_id: z.string().uuid(),
  sender_id: z.string().uuid(),
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be under 5000 characters'),
  message_type: z
    .enum(['text', 'image', 'system', 'bid_update', 'job_update'])
    .default('text'),
  metadata: z.record(z.unknown()).default({}),
});

export const materialOrderSchema = z.object({
  job_id: z.string().uuid(),
  client_id: z.string().uuid(),
  pro_id: z.string().uuid(),
  items: z
    .array(
      z.object({
        material_id: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
        unit_price: z.number().min(0),
        total_price: z.number().min(0),
      })
    )
    .min(1, 'Order must have at least one item'),
  delivery_address: z.string().min(5, 'Please enter a delivery address'),
  delivery_date: z.string().nullable().optional(),
  notes: z.string().max(500).nullable().optional(),
});

// Inferred types from schemas
export type ProfileInput = z.infer<typeof profileSchema>;
export type ProProfileInput = z.infer<typeof proProfileSchema>;
export type JobInput = z.infer<typeof jobSchema>;
export type BidInput = z.infer<typeof bidSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type MaterialOrderInput = z.infer<typeof materialOrderSchema>;
