// frontend/hooks/useApi.ts
import useSWR, { SWRConfiguration } from 'swr'; // Import SWRConfiguration for better types
import apiClient from '@/lib/api';

// The fetcher function remains the same.
const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

/**
 * A custom hook to simplify data fetching with SWR and our apiClient.
 * @param {string | null} path The API endpoint path. If null, fetching is disabled.
 * @param {SWRConfiguration} swrOptions Optional configuration object to pass directly to useSWR.
 */
export function useApi<T>(path: string | null, swrOptions: SWRConfiguration = {}) { 
  // Pass the path, the fetcher, and the optional swrOptions to useSWR.
  const { data, error, isLoading, mutate } = useSWR<T>(path, fetcher, swrOptions);

  return {
    data: data || null, // Return data or null
    error,
    isLoading,
    mutate,
  };
}