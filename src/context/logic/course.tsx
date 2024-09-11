import axios from 'axios';
import { useState } from 'react';

const usePost = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const post = async (url: string, postData: any, file?: File) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const formData = new FormData();
      // Fayl bor bo'lsa, uni form-data ga qo'shish
      if (file) {
        formData.append('file', file);
      }

      // postData obyektidagi barcha maydonlarni form-data ga qo'shish
      Object.keys(postData).forEach((key) => {
        formData.append(key, postData[key]);
      });

      const { data } = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setData(data.body);
      }
      return data.body;
    } catch (err: any) {
      setError(err);
      throw new Error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, post };
};

export default usePost;
