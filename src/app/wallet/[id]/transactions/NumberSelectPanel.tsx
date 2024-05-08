import React from "react";
import NumberSelect from "./NumberSelect";

const NumberSelectPanel = ({
  setPagination,
  value,
  list,
}: {
  value: string | number;
  setPagination: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: number[];
  title: string;
  optionRenderer: (item: number, index: number) => JSX.Element;
}) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-end tw-gap-x-1">
      <p className="">title</p>
      <NumberSelect
        setPagination={setPagination}
        value={value}
        list={list}
        optionRenderer={(item, i) => (
          <option className="tw-p-1" key={i} value={i + 1}>
            {i + 1}
          </option>
        )}
      />
    </div>
  );
};

export default NumberSelectPanel;
