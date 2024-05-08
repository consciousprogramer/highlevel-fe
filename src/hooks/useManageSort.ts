import { useCallback, useState } from "react";

export interface ISortData<IObject extends Record<string, any>> {
  sortOn: keyof IObject;
  sortOrder: "asc" | "desc";
}

export const useManageSort = <T extends Record<string, any>>() => {
  const [sortData, setSortData] = useState<ISortData<T>>({
    sortOn: "id",
    sortOrder: "asc",
  });

  const sortChangeHandler = useCallback(
    (field: string) => {
      if (sortData.sortOn === field) {
        setSortData((prevState) => ({
          ...prevState,
          sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
        }));
      } else {
        setSortData({
          sortOn: field,
          sortOrder: "asc",
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
