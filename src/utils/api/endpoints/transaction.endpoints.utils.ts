import { buildResourceApiUrls } from "@/utils/url.utils";

const transactionApiUrlConstructor = buildResourceApiUrls("/transaction");

export const transactionApiEndpoints = {
  fetchTransactions: (data: { walletId: string; queryString?: string }) =>
    transactionApiUrlConstructor(
      `/${data.walletId}/?${data?.queryString ?? ""}`
    ),
  getTransactionsCSV: (data: { walletId: string }) =>
    transactionApiUrlConstructor(`/${data.walletId}/csv`),
};
