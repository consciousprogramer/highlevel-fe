"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const TransactionReceipt = ({
  transactionId,
  walletId,
}: {
  walletId: string;
  transactionId: string;
}) => {
  const router = useRouter();
  return (
    <div className="tw-w-full tw-grid tw-place-items-center tw-py-12">
      <div className="tw-bg-green-300 tw-p-4 tw-rounded-md">
        <h1 className="">Transaction Completed Successfully ✅</h1>
        <p className="">
          Transaction ID :{" "}
          <span className="tw-p-2 tw-font-mono">{transactionId}</span>
        </p>
        <div className="tw-mt-2 tw-flex tw-items-center tw-justify-between">
          <Link
            href={`/wallet/${walletId}/transactions`}
            className="tw-italic tw-text-blue-500 hover:tw-text-blue-700 tw-transition-colors tw-underline"
          >
            {"View Wallet's Transactions"}
          </Link>
          <button
            onClick={() => router.back()}
            className="tw-bg-emerald-700 tw-px-2 tw-py-0.5 tw-rounded tw-shadow-sm tw-text-white tw-align-middle tw-flex tw-items-center tw-justify-between tw-gap-x-1"
          >
            <MdOutlineKeyboardBackspace /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceipt;
