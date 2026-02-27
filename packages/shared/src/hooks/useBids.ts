import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as bidsApi from '../api/bids';

const bidKeys = {
  all: ['bids'] as const,
  forJob: (jobId: string) => [...bidKeys.all, 'job', jobId] as const,
  myBids: (proId: string) => [...bidKeys.all, 'my', proId] as const,
};

export function useBids(jobId: string | undefined) {
  return useQuery({
    queryKey: bidKeys.forJob(jobId ?? ''),
    queryFn: () => bidsApi.getBidsForJob(jobId!),
    enabled: Boolean(jobId),
  });
}

export function useMyBids(proId: string | undefined) {
  return useQuery({
    queryKey: bidKeys.myBids(proId ?? ''),
    queryFn: () => bidsApi.getMyBids(proId!),
    enabled: Boolean(proId),
  });
}

export function useCreateBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof bidsApi.createBid>[0]) =>
      bidsApi.createBid(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bidKeys.forJob(variables.job_id),
      });
      queryClient.invalidateQueries({
        queryKey: bidKeys.myBids(variables.pro_id),
      });
    },
  });
}

export function useAcceptBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bidId, jobId }: { bidId: string; jobId: string }) =>
      bidsApi.acceptBid(bidId, jobId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bidKeys.forJob(variables.jobId),
      });
      // Also invalidate the job detail so it picks up the new status
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'detail', variables.jobId],
      });
    },
  });
}

export function useRejectBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bidId, jobId }: { bidId: string; jobId: string }) =>
      bidsApi.rejectBid(bidId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bidKeys.forJob(variables.jobId),
      });
    },
  });
}

export function useWithdrawBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bidId,
      jobId,
      proId,
    }: {
      bidId: string;
      jobId: string;
      proId: string;
    }) => bidsApi.withdrawBid(bidId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bidKeys.forJob(variables.jobId),
      });
      queryClient.invalidateQueries({
        queryKey: bidKeys.myBids(variables.proId),
      });
    },
  });
}
