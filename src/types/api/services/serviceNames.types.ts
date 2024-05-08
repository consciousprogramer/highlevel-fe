import { TResponseType } from "../base.types";

export type TRepoWiseServiceNames = {
  walletServices: [
    "walletSetupService",
    "fetchWalletService",
    "transactService"
  ];
  transactionServices: ["fetchTransactions", "fetchATransaction"];
};

type IRepoNames = keyof TRepoWiseServiceNames;

export type TRepoNameSafeWrapper<S extends IRepoNames, K = any> = Record<
  TRepoWiseServiceNames[S][number],
  K
>;

export type TRepoNameSafeWrapperForRepos<S extends IRepoNames> =
  TRepoNameSafeWrapper<S, Function>;
export type TRepoNameSafeWrapperForServiceRequestTypes<S extends IRepoNames> =
  TRepoNameSafeWrapper<S, Function>;

export type TRepoNameSafeWrapperForServiceResponseTypes<S extends IRepoNames> =
  TRepoNameSafeWrapper<S, TResponseType>;
