export type UserRole = 'client' | 'pro' | 'admin';
export type ProStatus = 'available' | 'working' | 'offline';
export type WsibStatus = 'active' | 'expired' | 'exempt' | 'not_applicable';
export type BusinessType = 'sole_proprietor' | 'partnership' | 'corporation' | 'other';
export type ApplicationStatus = 'incomplete' | 'pending_review' | 'approved' | 'rejected' | 'changes_requested';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProProfile {
  id: string;
  user_id: string;
  bio: string | null;
  headline: string | null;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  service_radius_km: number;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  city: string | null;
  province: string;
  years_experience: number | null;
  is_available: boolean;
  avg_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  response_time_minutes: number | null;
  current_job_id: string | null;
  current_status: ProStatus;
  stripe_account_id: string | null;
  id_verified: boolean;
  background_check_passed: boolean;
  // BCIN — Ontario Building Code designer credential
  bcin: string | null;
  bcin_verified: boolean;
  bcin_categories: string[];
  company_name: string | null;
  // License
  license_number: string | null;
  license_type: string | null;
  license_province: string;
  license_expiry: string | null;
  // Insurance
  insurance_provider: string | null;
  insurance_policy_number: string | null;
  insurance_coverage_amount: number | null;
  insurance_expiry: string | null;
  insurance_certificate_url: string | null;
  // WSIB
  wsib_number: string | null;
  wsib_status: WsibStatus | null;
  wsib_certificate_url: string | null;
  // Business
  business_number: string | null;
  business_type: BusinessType | null;
  // Portfolio
  portfolio_urls: string[];
  // Application workflow
  application_status: ApplicationStatus;
  application_submitted_at: string | null;
  application_reviewed_at: string | null;
  application_reviewed_by: string | null;
  application_notes: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientProfile {
  id: string;
  user_id: string;
  default_address: string | null;
  default_latitude: number | null;
  default_longitude: number | null;
  default_city: string | null;
  total_jobs_posted: number;
  created_at: string;
}

export interface ProWithProfile extends ProProfile {
  profile: Profile;
  categories?: CategoryWithExperience[];
  distance_km?: number;
}

export interface CategoryWithExperience {
  category_id: string;
  category: Category;
  years_experience: number | null;
  custom_rate_min: number | null;
  custom_rate_max: number | null;
}

// Re-import Category to avoid circular dependency at type level
import type { Category } from './job';
