import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: false,
});

const WalletDetailsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default WalletDetailsLayout;
