import { toastMessage } from '@/context/api/toastMessage';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UseEditOptions<T> {
  url: string;
  data: T;
}

interface UseEditResponse<T> {
  loading: boolean;
  error: any;
  response: T | null;
  editData: () => void;
}

export function useEdit<T>(url: string, data: T, config?: any): UseEditResponse<T> {
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axios.put(url, data, config ? config : {}); // Yoki .patch(url, data)
      if (result.data.error) {
        toastMessage(result.data.error)
        throw new Error(result.data.error);
      }
      return result?.data?.data;
    },
    onError: (error: any) => {
      // Custom error handling if needed
    },
  });

  return {
    loading: mutation.status === 'pending', // status 'pending' indicates loading
    error: mutation.error,
    response: mutation.data,
    editData: mutation.mutateAsync,
  };
}
