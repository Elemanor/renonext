import type { Proposal } from '@renonext/shared/types';

export interface ContractorProfileResponse {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: string;
  is_verified: boolean;
}

export interface ProProfileResponse {
  id: string;
  user_id: string;
  bio: string | null;
  years_experience: number | null;
  avg_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  response_time_minutes: number | null;
  bcin: string | null;
  bcin_verified: boolean;
  bcin_categories: string[];
  company_name: string | null;
}

export interface ProposalDetailResponse {
  proposal: Proposal;
  contractor_profile: ContractorProfileResponse;
  pro_profile: ProProfileResponse | null;
}
