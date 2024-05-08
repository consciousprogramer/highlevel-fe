import { ResponseModifier } from "../base.types";

export type TWalletServiceResponseDataTypes = {
  walletSetupService: ResponseModifier<{
    id: string;
    name: string;
    balance: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  fetchWalletService: ResponseModifier<{
    id: string;
    name: string;
    balance: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  transactService: ResponseModifier<{
    updatedBalance: string;
    transactionId: string;
  }>;
};
