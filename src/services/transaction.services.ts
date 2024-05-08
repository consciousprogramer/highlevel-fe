import { TTransactionServiceRequestDataTypes } from "@/types/api/request/transactionRequest.types";
import { TTransactionServiceResponseDataTypes } from "@/types/api/response/transactionResponse.types";
import { transactionApiEndpoints } from "@/utils/api/endpoints/transaction.endpoints.utils";
import { requestHandler } from "@/utils/requestHandler.utils";

export const transactionServicesRepo = {
  fetchTransactions: async (
    data: TTransactionServiceRequestDataTypes["fetchTransactions"]
  ) => {
    const response = await requestHandler.simpleGet<
      TTransactionServiceResponseDataTypes["fetchTransactions"]
    >(transactionApiEndpoints.fetchTransactions(data));
    return response.data;
  },
  getTransactionsCSV: async (
    data: TTransactionServiceRequestDataTypes["getTransactionsCSV"]
  ) => {
    const response = await requestHandler.simpleGet<
      TTransactionServiceResponseDataTypes["getTransactionsCSV"]
    >(transactionApiEndpoints.getTransactionsCSV(data));
    return response.data;
  },
};
