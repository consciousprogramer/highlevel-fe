import React from "react";
import NumberSelect from "./NumberSelect";

const NumberSelectPanel = ({
  setPagination,
  value,
  list,
  optionRenderer,
  title,
}: {
  value: string | number;
  setPagination: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: number[];
  title: string;
  optionRenderer: (item: number, index: number) => JSX.Element;
}) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-end tw-gap-x-1">
      <p className="">{title}</p>
      <NumberSelect
        setPagination={setPagination}
        value={value}
        list={list}
        optionRenderer={optionRenderer}
      />
    </div>
  );
};

export default NumberSelectPanel;
