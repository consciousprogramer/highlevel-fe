import { walletServicesRepo } from "@/services/wallet.services";
import { formatNumberIndian } from "@/utils/general.utils";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const WalletDetails: React.FC<{ walletId: string }> = async ({ walletId }) => {
  console.log("[WalletDetails] rendering");

  const {
    data: { name, balance, createdAt, id },
  } = await walletServicesRepo.fetchWalletService({ walletId });

  return (
    <main className="tw-p-2">
      <div className="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-p-3 tw-rounded tw-shadow">
        <section className="tw-col-span-3">
          {/* wallet icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media.istockphoto.com/id/1411677127/vector/person-buying-clothes-online-on-cellphone.jpg?s=612x612&w=0&k=20&c=aC9KExqpl8weFV3tFwrKz_CB5cyaEihNuyNWXSOJ4YU="
            alt="user's wallet page image"
            className="tw-w-full tw-h-full tw-rounded"
          />
        </section>
        <section className="tw-col-span-9 tw-bg-slate-100 tw-p-3 tw-rounded">
          {/* wallet details */}
          <h1 className="tw-text-2xl tw-text-gray-700 tw-mb-1">
            Your Wallet Details
          </h1>
          <div className="tw-grid tw-grid-cols-3 tw-gap-x-2 tw-mb-1.5">
            <h2 className="">Wallet ID :</h2>
            <p className="">{id}</p>
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-x-2 tw-mb-1.5">
            <h2 className="">Wallet Name :</h2>
            <p className="">{name}</p>
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-x-2 tw-mb-1.5">
            <h2 className="">Wallet Balance :</h2>
            <p className="">₹ {+balance}</p>
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-x-2 tw-mb-1.5">
            <h2 className="">Created At :</h2>
            <p className="">{new Date(createdAt).toString()}</p>
          </div>
          <h3 className="tw-mt-3 ">
            <Link
              href={`/wallet/${id}/transactions`}
              className="tw-italic tw-text-blue-500 hover:tw-text-blue-700 tw-transition-colors tw-underline"
            >
              {"View Wallet's Transactions"}
            </Link>
          </h3>
        </section>
      </div>
    </main>
  );
};

export default WalletDetails;
