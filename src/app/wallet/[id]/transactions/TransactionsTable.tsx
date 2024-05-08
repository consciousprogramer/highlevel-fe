"use client";
import { useManageSort } from "@/hooks/useManageSort";
import { transactionServicesRepo } from "@/services/transaction.services";
import { TSortOrderType, Transaction } from "@/types/api/base.types";
import { generateQueryString } from "@/utils/url.utils";
import React, { useEffect, useState } from "react";
import { ImSortAmountAsc, ImSortAmountDesc, ImDownload3 } from "react-icons/im";
import TransactionDataRow from "./TransactionDataRow";
import TableHead from "./TableHead";
import NumberSelectPanel from "./NumberSelectPanel";
import toast from "react-hot-toast";
import { extractErrorMessage } from "@/utils/errors/errorHandling.utils";

export const transactionFields: Array<keyof Transaction> = [
  "amount",
  "closingBalance",
  "createdAt",
  "description",
  "id",
  "type",
  "walletId",
];

const TransactionsTable = ({ walletId }: { walletId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [paginationData, setPagination] = useState<{
    page: number;
    limit: number;
    totalRows: number;
    isReady: boolean;
    sortOn: keyof Transaction;
    sortOrder: TSortOrderType;
  }>({
    page: 1,
    limit: 10,
    totalRows: 0,
    isReady: false,
    sortOn: "createdAt",
    sortOrder: "DESC",
  });

  const { isReady, limit, page, sortOn, sortOrder, totalRows } = paginationData;

  const sortOrderChangeHandler = (field: keyof Transaction) => {
    if (sortOn === field) {
      setPagination((prev) => {
        return {
          ...prev,
          sortOrder: sortOrder === "ASC" ? "DESC" : "ASC",
        };
      });
    } else {
      setPagination((prev) => {
        return {
          ...prev,
          sortOn: field,
          sortOrder: "ASC",
        };
      });
    }
  };

  const download = async () => {
    const {
      data: { expiresAt, csvSingedUrl },
      message,
    } = await toast.promise(
      transactionServicesRepo.getTransactionsCSV({
        walletId,
      }),
      {
        loading: "Generating CSV...",
        success: "CSV generated successfully",
        error: (error) => `Download Failed : ${extractErrorMessage(error)}`,
      }
    );

    window.open(csvSingedUrl);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPagination((prev) => ({
      ...prev,
      page: +e.target.value,
    }));

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPagination((prev) => ({
      ...prev,
      limit: +e.target.value,
    }));

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const {
          data: { totalRowsCount, transactions },
        } = await transactionServicesRepo.fetchTransactions({
          walletId,
          queryString: generateQueryString({
            limit: limit.toString(),
            skip: ((page - 1) * limit).toString(),
            sortOn: sortOn,
            sortOrder: sortOrder,
          }),
        });
        setIsLoading(false);
        setTransactions(
          transactions.map((transaction) => ({
            ...transaction,
            createdAt: new Date(transaction.createdAt).toString(),
          }))
        );
        setPagination((prev) => {
          return {
            ...prev,
            isReady: true,
            totalRows: totalRowsCount,
          };
        });
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isReady, limit, page, sortOn, sortOrder, walletId]);

  if (!isReady || isLoading) {
    return <p className="tw-text-3xl">Loading...</p>;
  }

  return (
    <div className="">
      <section className="tw-flex tw-justify-between tw-items-center tw-p-2 tw-border-t tw-border-b tw-border-stone-200 tw-mx-2 tw-my-2">
        <h1 className="tw-font-mono tw-text-sm md:tw-text-base">{`Wallet ID : ${walletId}`}</h1>
        <div className="tw-flex-shrink-0">
          <button
            className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-bg-cyan-600 tw-text-white tw-py-1 tw-px-2 tw-rounded tw-text-sm md:tw-text-base"
            onClick={download}
          >
            <ImDownload3 />
            Download CSV
          </button>
        </div>
      </section>
      <main>
        {transactions.length ? (
          <div className="tw-p-1">
            <table className="tw-border tw-border-gray-300 tw-min-w-full">
              <thead className="">
                <tr className="tw-bg-slate-200 tw-py-2 tw-text-lg tw-font-semibold">
                  {transactionFields.map((field) => (
                    <TableHead
                      field={field}
                      key={field}
                      sortOn={sortOn}
                      sortOrder={sortOrder}
                      sortOrderChangeHandler={sortOrderChangeHandler}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <TransactionDataRow
                    transaction={transaction}
                    key={transaction.id}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="">No Transaction found</p>
        )}
      </main>
      <div className="tw-px-2 tw-py-2 tw-flex tw-justify-between tw-items-center tw-bg-gray-200/80 tw-rounded-md tw-my-2 tw-fixed tw-left-2 tw-right-2 tw-bottom-2 tw-backdrop-blur-sm">
        <p className="">Current Page : {page}</p>
        <div className="tw-flex tw-items-center tw-justify-end tw-gap-x-3">
          {/* Page controller panel */}
          <NumberSelectPanel
            value={page}
            setPagination={handlePageChange}
            list={new Array(Math.ceil(totalRows / limit)).fill(0)}
            title="Select Page"
            optionRenderer={(_, index) => (
              <option className="tw-p-1" key={index} value={index + 1}>
                {index + 1}
              </option>
            )}
          />

          {/* page  panel */}
          <NumberSelectPanel
            value={limit}
            setPagination={handleLimitChange}
            list={[10, 20, 50]}
            title="Per Page"
            optionRenderer={(item) => (
              <option className="tw-p-1" key={item} value={item}>
                {item}
              </option>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
