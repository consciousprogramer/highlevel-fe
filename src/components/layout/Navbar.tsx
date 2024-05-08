"use client";
import { useWalletContext } from "@/contexts/wallet.context";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  formatToIndianNumber,
  isServer,
  safeToFixed,
} from "@/utils/general.utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  console.log("nav rendering, server:", isServer());

  const walletContext = useWalletContext();
  const { getLocalStorage } = useLocalStorage();

  return (
    <nav className="tw-flex tw-items-center tw-justify-between tw-bg-slate-200 tw-px-6">
      <Link
        className="tw-p-4 tw-text-3xl tw-font-bold tw-text-gray-800 tw-text-center"
        href="/"
      >
        <Image
          src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/48175265495/original/PTXBCP40UHx-8LCKsM1zqLX-pq8nndFHSw.png?1641235482"
          width={200}
          height={100}
          alt="HighLevel logo"
          about="HighLevel logo"
        />
      </Link>
      <div className="tw-p-2 tw-font-medium tw-bg-sky-100 tw-rounded">
        Balance: ₹{" "}
        {formatToIndianNumber(
          safeToFixed(
            walletContext.wallet?.balance ??
              getLocalStorage("wallet")?.balance ??
              0
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
