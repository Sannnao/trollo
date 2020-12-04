import { useState } from 'react';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const request = async (
    url,
    method = 'GET',
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);

    try {
      const responce = await fetch(url, { method, body, headers });
      const data = await responce.json();

      if (!responce.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setIsLoading(false);

      return data;
    } catch(err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return { loading: isLoading, request, error, clearError };
}
