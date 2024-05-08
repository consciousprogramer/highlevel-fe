import Navbar from "@/components/layout/Navbar";
import React from "react";

const TransactLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="tw-p-2">
      <div className="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-p-3 tw-rounded tw-shadow">
        <section className="tw-col-span-12 md:tw-col-span-3 ">
          {/* wallet icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media.istockphoto.com/id/1411677127/vector/person-buying-clothes-online-on-cellphone.jpg?s=612x612&w=0&k=20&c=aC9KExqpl8weFV3tFwrKz_CB5cyaEihNuyNWXSOJ4YU="
            alt="user's wallet page image"
            className="tw-w-full tw-h-full tw-rounded tw-object-cover"
          />
        </section>
        <section className="tw-col-span-12 md:tw-col-span-9 tw-bg-slate-100 tw-p-3 tw-rounded">
          {/* wallet Setup */}
          <h1 className="tw-text-2xl tw-text-gray-700 tw-mb-2">
            Make Transaction
          </h1>
          {children}
        </section>
      </div>
    </main>
  );
};

export default TransactLayout;
