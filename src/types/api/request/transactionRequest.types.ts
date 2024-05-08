import { Transaction } from "../base.types";

export type TTransactionServiceRequestDataTypes = {
  fetchTransactions: {
    walletId: string;
    queryString?: string;
  };
  getTransactionsCSV: {
    walletId: string;
  };
};
