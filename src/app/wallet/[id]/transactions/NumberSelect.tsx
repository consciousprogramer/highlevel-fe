import React from "react";

const NumberSelect = ({
  setPagination,
  value,
  list,
}: {
  value: string | number;
  setPagination: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: number[];
  optionRenderer: (item: number, index: number) => JSX.Element;
}) => {
  return (
    <select className="tw-p-1" value={value} onChange={setPagination}>
      {list.map((item) => (
        <option className="tw-p-1" key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default NumberSelect;
