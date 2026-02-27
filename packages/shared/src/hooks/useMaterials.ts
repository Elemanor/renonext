import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as materialsApi from '../api/materials';

const materialKeys = {
  all: ['materials'] as const,
  templates: (categoryId: string) =>
    [...materialKeys.all, 'templates', categoryId] as const,
  jobMaterials: (jobId: string) =>
    [...materialKeys.all, 'job', jobId] as const,
  orders: (clientId: string) =>
    [...materialKeys.all, 'orders', clientId] as const,
};

export function useMaterialTemplates(categoryId: string | undefined) {
  return useQuery({
    queryKey: materialKeys.templates(categoryId ?? ''),
    queryFn: () => materialsApi.getMaterialTemplates(categoryId!),
    enabled: Boolean(categoryId),
  });
}

export function useJobMaterials(jobId: string | undefined) {
  return useQuery({
    queryKey: materialKeys.jobMaterials(jobId ?? ''),
    queryFn: () => materialsApi.getJobMaterials(jobId!),
    enabled: Boolean(jobId),
  });
}

export function useUpdateJobMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      jobId: string;
      updates: Parameters<typeof materialsApi.updateJobMaterial>[1];
    }) => materialsApi.updateJobMaterial(id, updates),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: materialKeys.jobMaterials(variables.jobId),
      });
    },
  });
}

export function useAddJobMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof materialsApi.addJobMaterial>[0]) =>
      materialsApi.addJobMaterial(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: materialKeys.jobMaterials(variables.job_id),
      });
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof materialsApi.createMaterialOrder>[0]) =>
      materialsApi.createMaterialOrder(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: materialKeys.orders(variables.client_id),
      });
      queryClient.invalidateQueries({
        queryKey: materialKeys.jobMaterials(variables.job_id),
      });
    },
  });
}

export function useOrders(clientId: string | undefined) {
  return useQuery({
    queryKey: materialKeys.orders(clientId ?? ''),
    queryFn: () => materialsApi.getOrders(clientId!),
    enabled: Boolean(clientId),
  });
}
