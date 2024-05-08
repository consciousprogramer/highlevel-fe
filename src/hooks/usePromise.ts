import React, { useCallback, useEffect, useState } from "react";

function useCallService<T, A>(
  service: (data: A) => Promise<T>,
  serviceData?: A | undefined,
  callOnMount = true
) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const callService = useCallback<(data: A) => void>(
    async (data) => {
      try {
        setLoading(true);
        setError(null);
        // const result = await service.call(null, data);
        const result = await service(data);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [service]
  );

  useEffect(() => {
    if (serviceData && callOnMount) {
      (async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await service(serviceData);
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [callService, callOnMount, serviceData, service]);

  return {
    isLoading,
    data,
    error,
    // setData,
    // setLoading,
    // setError,
    callService,
  };
}

export default useCallService;
