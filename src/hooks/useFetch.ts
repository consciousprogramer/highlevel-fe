import React, { useEffect, useRef, useState } from "react";

function useFetch<T>(request: Promise<T>) {
  const requestRef = useRef(request);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await requestRef.current;
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    data,
    error,
    setData,
    setLoading,
    setError,
  };
}

export default useFetch;
