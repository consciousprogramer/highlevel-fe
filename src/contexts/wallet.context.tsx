"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ILCWallet } from "@/types/localStorageData.types";
import { isServer } from "@/utils/general.utils";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type TWalletContext = {
  wallet: ILCWallet | null;
  addWallet: (walletData: ILCWallet) => void;
  updateBalance: (latestBalance: number) => void;
  clearWallet: () => void;
  getWalletId: () => string | null;
};

const WalletContext = createContext<TWalletContext>({
  wallet: null,
  addWallet: () => {},
  updateBalance: () => {},
  clearWallet: () => {},
  getWalletId: () => null,
});

let didReadFromLocalStorage = false;
export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getLocalStorage, setLocalStorage, clearLocalStorageKey } =
    useLocalStorage();

  const readFromLocalStorage = () => {
    const walletData = getLocalStorage("wallet");
    return walletData;
  };

  const [wallet, setWallet] = useState<ILCWallet | null>(
    readFromLocalStorage()
  );

  const addWallet = useCallback(
    (walletData: ILCWallet) => {
      setWallet(walletData);
      setLocalStorage("wallet", walletData);
    },
    [setLocalStorage]
  );

  const updateBalance = useCallback(
    (latestBalance: number) => {
      setWallet((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          balance: latestBalance,
        };
      });
      setLocalStorage("wallet", {
        ...getLocalStorage("wallet")!,
        balance: latestBalance,
      });
    },
    [setLocalStorage, getLocalStorage]
  );

  const clearWallet = useCallback(() => {
    setWallet(null);
    clearLocalStorageKey("wallet");
  }, [clearLocalStorageKey]);

  const getWalletId = useCallback(() => {
    if (!wallet) return null;
    return wallet.id;
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{ addWallet, clearWallet, updateBalance, wallet, getWalletId }}
    >
      {didReadFromLocalStorage ? null : children}
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  return useContext(WalletContext);
}
