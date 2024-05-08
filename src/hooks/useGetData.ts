import { useState, useEffect } from "react";

const promiseWrapper = <T>(promise: Promise<T>) => {
  let status = "pending";
  let result: T | Error | null = null;

  const s = promise.then(
    (value) => {
      status = "success";
      result = value;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read: () => {
      switch (status) {
        case "pending":
          throw s;
        case "success":
          return result as T;
        case "error":
          throw result;
        default:
          throw new Error("Unknown status");
      }
    },
  };
};

function useGetData<T>(reqPromise: Promise<T>) {
  const [resource, setResource] = useState<T | null>(null);

  useEffect(() => {
    const getData = async () => {
      const wrappedPromise = promiseWrapper<T>(reqPromise);
      setResource(wrappedPromise.read());
    };

    getData();
  }, [reqPromise]);

  return resource;
}

export default useGetData;
