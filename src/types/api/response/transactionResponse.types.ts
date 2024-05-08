import { ResponseModifier, Transaction } from "../base.types";

export type TTransactionServiceResponseDataTypes = {
  fetchTransactions: ResponseModifier<{
    transactions: Transaction[];
    page: number;
    limit: number;
    totalPages: number;
    totalRowsCount: number;
  }>;
  getTransactionsCSV: ResponseModifier<{ 
    expiresAt:string,
    csvSingedUrl:string
   }>;
};
