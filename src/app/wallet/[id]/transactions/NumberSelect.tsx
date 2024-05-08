import React from "react";

const NumberSelect = ({
  setPagination,
  value,
  list,
  optionRenderer,
}: {
  value: string | number;
  setPagination: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: number[];
  optionRenderer: (item: number, index: number) => JSX.Element;
}) => {
  return (
    <select className="tw-p-1" value={value} onChange={setPagination}>
      {list.map(optionRenderer)}
    </select>
  );
};

export default NumberSelect;
