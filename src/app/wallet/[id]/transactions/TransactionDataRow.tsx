"use client";
import { Transaction } from "@/types/api/base.types";
import React from "react";
import { transactionFields } from "./TransactionsTable";
import { formatToIndianNumber } from "@/utils/general.utils";

const TransactionDataRow = ({
  transaction,
  index,
}: {
  transaction: Transaction;
  index: number;
}) => {
  return (
    <tr key={transaction.id} className="">
      {transactionFields.map((field) => {
        switch (field) {
          case "amount":
            return (
              <td key={field} className="tw-p-2 tw-border tw-border-gray-200">
                ₹ {formatToIndianNumber(Math.abs(+transaction[field]))}
              </td>
            );
          case "closingBalance":
            return (
              <td key={field} className="tw-p-2 tw-border tw-border-gray-200">
                ₹ {formatToIndianNumber(+transaction[field])}
              </td>
            );
          case "walletId":
            return (
              <td
                key={field}
                className="tw-p-2 tw-border tw-border-gray-200 tw-text-xs"
              >
                {transaction[field]}
              </td>
            );
          case "id":
            return (
              <td
                key={field}
                className="tw-p-2 tw-border tw-border-gray-200 tw-text-xs"
              >
                {transaction[field]}
              </td>
            );
          case "type":
            if (transaction[field] === "DEBIT") {
              return (
                <td
                  key={field}
                  className="tw-p-2 tw-border tw-border-gray-200 tw-text-xs"
                >
                  <span className="tw-text-white tw-bg-green-500 tw-rounded tw-px-1.5 tw-py-1">
                    {transaction[field]}
                  </span>
                </td>
              );
            } else {
              return (
                <td
                  key={field}
                  className="tw-p-2 tw-border tw-border-gray-200 tw-text-xs "
                >
                  <span className="tw-text-white tw-bg-orange-500 tw-rounded tw-px-1.5 tw-py-1">
                    {transaction[field]}
                  </span>
                </td>
              );
            }
          default:
            return (
              <td key={field} className="tw-p-2 tw-border tw-border-gray-200">
                {transaction[field]}
              </td>
            );
        }
      })}
    </tr>
  );
};

export default React.memo(TransactionDataRow);
