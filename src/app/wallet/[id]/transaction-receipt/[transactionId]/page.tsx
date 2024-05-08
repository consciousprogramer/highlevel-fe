import Link from "next/link";
import React from "react";
import TransactionReceipt from "./TransactionReceipt";

const TransactionReceiptPage = ({
  params: { id, transactionId },
}: {
  params: { id: string; transactionId: string };
}) => {
  return <TransactionReceipt walletId={id} transactionId={transactionId} />;
};

export default TransactionReceiptPage;
