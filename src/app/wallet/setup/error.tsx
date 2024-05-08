"use client";
import React from "react";

const WalletSetupErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="tw-h-screen tw-w-full tw-grid tw-place-items-center">
      <div className="tw-aspect-square tw-font-semibold tw-text-3xl tw-bg-red-500 tw-rounded-2xl tw-py-2 tw-px-5 tw-flex tw-items-center tw-justify-center">
        <p className="">Error: {error.message}</p>
      </div>
    </div>
  );
};

export default WalletSetupErrorBoundary;
