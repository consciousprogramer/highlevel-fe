import { TWalletServiceRequestDataTypes } from "@/types/api/request/walletRequest.types";
import { TWalletServiceResponseDataTypes } from "@/types/api/response/walletResponse.types";
import { TRepoNameSafeWrapperForRepos } from "@/types/api/services/serviceNames.types";
import { walletApiEndpoints } from "@/utils/api/endpoints/wallet.endpoints.utils";
import { requestHandler } from "@/utils/requestHandler.utils";

// export const walletServicesRepo: TRepoNameSafeWrapperForRepos<"walletServices"> =
export const walletServicesRepo = {
  walletSetupService: async (
    data: TWalletServiceRequestDataTypes["walletSetupService"]
  ) => {
    const response = await requestHandler.simplePost<
      TWalletServiceResponseDataTypes["walletSetupService"]
    >(walletApiEndpoints.setup, data);

    return response.data;
  },
  fetchWalletService: async (
    paramsData: TWalletServiceRequestDataTypes["fetchWalletService"]
  ) => {
    const { walletId } = paramsData;

    const response = await requestHandler.simpleGet<
      TWalletServiceResponseDataTypes["fetchWalletService"]
    >(walletApiEndpoints.fetchWallet(`/${walletId}`));

    return response.data;
  },
  transactService: (
    data: TWalletServiceRequestDataTypes["transactService"]
  ) => {
    const { walletId } = data.paramsData;
    return requestHandler.simplePost<
      TWalletServiceResponseDataTypes["transactService"]
    >(walletApiEndpoints.transact(`/${walletId}/transact`), data.bodyData);
  },
};
