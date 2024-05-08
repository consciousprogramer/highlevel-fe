export type TResponseType = {
  message: string;
  data: any;
};

export type TBaseResponseType = {
  message: string;
};

export type ResponseModifier<TResData extends Record<string, any>> =
  TBaseResponseType & { data: TResData };

export type Transaction = {
  id: string;
  description: string;
  amount: string;
  closingBalance: string;
  createdAt: string;
  type: string;
  walletId: string;
};

export type TTransactionType = "CREDIT" | "DEBIT";

export type TSortOrderType = "ASC" | "DESC";
