import React, { FC, MouseEventHandler } from "react";

interface ErrorComponentProps {
  tryAgain: MouseEventHandler<HTMLButtonElement>;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ tryAgain }) => {
  return (
    <>
      {/* <div className="error-gif"></div> */}
      <div className="tw-text-center tw-font-bold tw-text-xl">
        There is some error occur
      </div>
      <button
        className=" tw-mt-4 tw-bg-goldenColor tw-px-2 tw-py-1 tw-rounded-xl tw-translate-x-[160%]"
        onClick={tryAgain}
      >
        Try Again
      </button>
    </>
  );
};

export { ErrorComponent };
