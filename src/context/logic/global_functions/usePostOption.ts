import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toastMessage } from "@/context/api/toastMessage";
interface dataOption {
  token: string,
  role: string
}
interface UsePostResponse<T> {
  loading: boolean;
  error: any;
  response: dataOption;
  postData: () => void;
}

export function usePost<T>(url: string, data: T, config?: any): UsePostResponse<T> {
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axios.post(url, data, config ? config : {});
      console.log(data);
      if (result.data.error) {
        toastMessage(result.data.error.code);
        throw new Error(result.data.error.message);
      }
      return result.data.data;

    },
    onError: (error: any) => {
      // Custom error handling if needed
    },
  });

  return {
    loading: mutation.status === "pending", // status 'pending' indicates loading
    error: mutation.error,
    response: mutation.data,
    postData: mutation.mutateAsync,
  };
}
