import React, { useCallback, useState } from "react";

const useRequestState = <T>() => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
};

export default useRequestState;
