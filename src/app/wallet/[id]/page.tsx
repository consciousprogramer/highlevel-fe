import React, { Suspense } from "react";
import WalletDetails from "./WalletDetails";
import LoaderUI from "./loading";

const WalletDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  // return <WalletDetails walletId={id} />;
  return (
    <Suspense fallback={<LoaderUI />}>
      <WalletDetails walletId={id} />
    </Suspense>
  );
};

export default WalletDetailsPage;
