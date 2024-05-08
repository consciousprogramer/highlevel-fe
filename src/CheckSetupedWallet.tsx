"use client";
import React, { useEffect, useLayoutEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useWalletContext } from "./contexts/wallet.context";
import { walletServicesRepo } from "./services/wallet.services";

const CheckSetupedWallet = () => {
  const { getLocalStorage } = useLocalStorage();
  const router = useRouter();
  const { updateBalance } = useWalletContext();

  useEffect(() => {
    (async () => {
      const wallet = getLocalStorage("wallet");
      if (wallet) {
        const { id } = wallet;

        const {
          data: { balance },
        } = await walletServicesRepo.fetchWalletService({ walletId: id });

        updateBalance(+balance);
      }
    })();
  }, [getLocalStorage, updateBalance]);

  useLayoutEffect(() => {
    const path = window.location.pathname;
    if (path.includes("setup") || path === "" || path === "/") {
      const wallet = getLocalStorage("wallet");
      if (!wallet) {
        toast.success("Need to setup a wallet first.");
        router.replace("/wallet/setup");
      } else {
        toast.success("Wallet exists, you can transact");
        router.replace(`/wallet/${wallet.id}/transact`);
      }
    }
  }, [getLocalStorage, router]);
  return null;
};

export default CheckSetupedWallet;
