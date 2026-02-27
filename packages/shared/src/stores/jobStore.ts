import { create } from 'zustand';
import type { Job } from '../types/job';

interface DraftJob {
  category_id: string | null;
  title: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  latitude: number | null;
  longitude: number | null;
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
}

interface JobState {
  currentJob: Job | null;
  draftJob: DraftJob;
  currentStep: number;
  totalSteps: number;
}

interface JobActions {
  setCurrentJob: (job: Job | null) => void;
  updateDraft: (updates: Partial<DraftJob>) => void;
  clearDraft: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const emptyDraft: DraftJob = {
  category_id: null,
  title: '',
  description: '',
  address: '',
  city: '',
  province: 'ON',
  postal_code: '',
  latitude: null,
  longitude: null,
  scheduled_date: null,
  scheduled_time_start: null,
  scheduled_time_end: null,
  is_flexible_date: false,
  is_urgent: false,
  estimated_hours: null,
  budget_min: null,
  budget_max: null,
  details: {},
  photos: [],
};

export const useJobStore = create<JobState & JobActions>()((set, get) => ({
  currentJob: null,
  draftJob: { ...emptyDraft },
  currentStep: 0,
  totalSteps: 5,

  setCurrentJob: (job) => {
    set({ currentJob: job });
  },

  updateDraft: (updates) => {
    set((state) => ({
      draftJob: { ...state.draftJob, ...updates },
    }));
  },

  clearDraft: () => {
    set({ draftJob: { ...emptyDraft }, currentStep: 0 });
  },

  setStep: (step) => {
    const { totalSteps } = get();
    const clamped = Math.max(0, Math.min(step, totalSteps - 1));
    set({ currentStep: clamped });
  },

  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
}));
