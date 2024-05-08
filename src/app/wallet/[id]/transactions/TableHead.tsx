import { TSortOrderType, Transaction } from "@/types/api/base.types";
import React from "react";
import { FaSortDown, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { FaSort, FaSortUp } from "react-icons/fa6";
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";

const TableHead = ({
  sortOrderChangeHandler,
  field,
  sortOn,
  sortOrder,
}: {
  field: keyof Transaction;
  sortOn: keyof Transaction;
  sortOrder: TSortOrderType;
  sortOrderChangeHandler: (field: keyof Transaction) => void;
}) => {
  return (
    <th className="tw-p-2" key={field}>
      <span className="tw-flex tw-justify-start tw-items-center tw-gap-x-2">
        <p className="tw-capitalize tw-text-left">{field}</p>
        {sortOn === field ? (
          <button
            className="tw-text-green-500 tw-text-sm"
            onClick={() => sortOrderChangeHandler(field)}
          >
            {sortOrder === "ASC" ? (
              <FaSortUp alignmentBaseline="middle" color="green" />
            ) : (
              <FaSortDown alignmentBaseline="middle" color="green" />
            )}
          </button>
        ) : (
          <button
            className="tw-text-gray-600 tw-text-sm"
            onClick={() => sortOrderChangeHandler(field)}
          >
            <FaSort alignmentBaseline="middle" />
          </button>
        )}
      </span>
    </th>
  );
};

export default TableHead;
