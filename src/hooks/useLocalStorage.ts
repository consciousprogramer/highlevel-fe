import { ILCWallet } from "@/types/localStorageData.types";
import { isServer } from "@/utils/general.utils";
import { useCallback } from "react";

type TLocalStorageData = {
  wallet: ILCWallet;
};

type TLocalStorageKeys = keyof TLocalStorageData;

function useLocalStorage() {
  const getLocalStorage = useCallback(<K extends TLocalStorageKeys>(key: K) => {
    if (isServer()) return null;
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as TLocalStorageData[K];
  }, []);

  const setLocalStorage = useCallback(
    <K extends TLocalStorageKeys>(key: K, value: TLocalStorageData[K]) => {
      if (isServer()) return null;
      localStorage.setItem(key, JSON.stringify(value));
    },
    []
  );

  const clearLocalStorageKey = useCallback(
    <K extends TLocalStorageKeys>(key: K) => {
      if (isServer()) return null;
      localStorage.removeItem(key);
    },
    []
  );

  return {
    getLocalStorage,
    setLocalStorage,
    clearLocalStorageKey,
  };
}

export default useLocalStorage;
