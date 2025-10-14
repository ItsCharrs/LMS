// customer-portal/hooks/useApi.ts
import useSWR from 'swr';
import apiClient from '@/lib/api';

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export function useApi<T>(path: string | null) {
  const { data, error, isLoading, mutate } = useSWR<T>(path, fetcher);

  return {
    data: data || null,
    error,
    isLoading,
    mutate,
  };
}