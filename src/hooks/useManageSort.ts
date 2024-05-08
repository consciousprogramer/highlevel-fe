import { TSortOrderType } from "@/types/api/base.types";
import { useCallback, useState } from "react";

export interface ISortData<IObject extends Record<string, any>> {
  sortOn: keyof IObject;
  sortOrder: TSortOrderType;
}

export const useManageSort = <T extends Record<string, any>>() => {
  const [sortData, setSortData] = useState<ISortData<T>>({
    sortOn: "id",
    sortOrder: "ASC",
  });

  const sortChangeHandler = useCallback(
    (field: string) => {
      if (sortData.sortOn === field) {
        setSortData((prevState) => ({
          ...prevState,
          sortOrder: prevState.sortOrder === "ASC" ? "DESC" : "ASC",
        }));
      } else {
        setSortData({
          sortOn: field,
          sortOrder: "ASC",
        });
      }
    },
    [sortData]
  );

  return {
    sortData,
    sortChangeHandler,
  };
};
