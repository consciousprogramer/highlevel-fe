import React from "react";
import TransactionsTable from "./TransactionsTable";

const TransactionsPage = ({ params: { id } }: { params: { id: string } }) => {
  return <TransactionsTable walletId={id} />;
};

export default TransactionsPage;
