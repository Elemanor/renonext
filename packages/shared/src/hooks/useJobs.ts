import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as jobsApi from '../api/jobs';
import type { Job, JobStatus } from '../types/job';

const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  nearby: (lat: number, lng: number, radius: number) =>
    [...jobKeys.all, 'nearby', { lat, lng, radius }] as const,
  progress: (jobId: string) => [...jobKeys.all, 'progress', jobId] as const,
};

export function useJobs(filters: { clientId: string; status?: JobStatus }) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => jobsApi.getClientJobs(filters.clientId, filters.status),
    enabled: Boolean(filters.clientId),
  });
}

export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: jobKeys.detail(id ?? ''),
    queryFn: () => jobsApi.getJob(id!),
    enabled: Boolean(id),
  });
}

export function useNearbyJobs(
  lat: number | null,
  lng: number | null,
  radiusKm: number = 25,
  categoryId?: string
) {
  return useQuery({
    queryKey: [...jobKeys.nearby(lat ?? 0, lng ?? 0, radiusKm), categoryId],
    queryFn: () => jobsApi.getNearbyJobs(lat!, lng!, radiusKm, categoryId),
    enabled: lat != null && lng != null,
  });
}

export function useJobProgress(jobId: string | undefined) {
  return useQuery({
    queryKey: jobKeys.progress(jobId ?? ''),
    queryFn: () => jobsApi.getJobProgress(jobId!),
    enabled: Boolean(jobId),
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof jobsApi.createJob>[0]) =>
      jobsApi.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Parameters<typeof jobsApi.updateJob>[1];
    }) => jobsApi.updateJob(id, updates),
    onSuccess: (updatedJob: Job) => {
      queryClient.setQueryData(jobKeys.detail(updatedJob.id), updatedJob);
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useCompleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobsApi.completeJob(jobId),
    onSuccess: (completedJob: Job) => {
      queryClient.setQueryData(jobKeys.detail(completedJob.id), completedJob);
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useAddJobProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof jobsApi.addJobProgress>[0]) =>
      jobsApi.addJobProgress(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.progress(variables.job_id),
      });
      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(variables.job_id),
      });
    },
  });
}
