import type { Profile, ProProfile } from './user';

export type JobStatus =
  | 'draft'
  | 'posted'
  | 'bidding'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type BidStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';

export type ProgressUpdateType =
  | 'started'
  | 'photo_update'
  | 'milestone'
  | 'material_used'
  | 'issue_reported'
  | 'completed';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Job {
  id: string;
  client_id: string;
  category_id: string;
  title: string;
  description: string;
  status: JobStatus;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  scheduled_date: string | null;
  scheduled_time_start: string | null;
  scheduled_time_end: string | null;
  is_flexible_date: boolean;
  is_urgent: boolean;
  estimated_hours: number | null;
  budget_min: number | null;
  budget_max: number | null;
  details: Record<string, unknown>;
  photos: string[];
  accepted_bid_id: string | null;
  assigned_pro_id: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  total_cost: number | null;
  platform_fee: number | null;
  pro_payout: number | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
  client?: Profile;
  assigned_pro?: ProProfile;
  bids?: JobBid[];
  progress?: JobProgress[];
}

export interface JobBid {
  id: string;
  job_id: string;
  pro_id: string;
  amount: number;
  estimated_hours: number;
  message: string | null;
  proposed_date: string | null;
  proposed_time_start: string | null;
  proposed_time_end: string | null;
  includes_materials: boolean;
  material_cost: number | null;
  status: BidStatus;
  created_at: string;
  updated_at: string;
  // Joined fields
  pro?: ProProfile & { profile?: Profile };
}

export interface JobProgress {
  id: string;
  job_id: string;
  pro_id: string;
  update_type: ProgressUpdateType;
  title: string;
  description: string | null;
  photos: string[];
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Review {
  id: string;
  job_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string | null;
  photos: string[];
  is_from_client: boolean;
  response: string | null;
  response_at: string | null;
  created_at: string;
  // Joined fields
  reviewer?: Profile;
  reviewee?: Profile;
  job?: Job;
}
