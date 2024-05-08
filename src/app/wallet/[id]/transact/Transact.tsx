"use client";
import { FormInput } from "@/components/common/UI/FormInput";
import { useWalletContext } from "@/contexts/wallet.context";
import useRequestState from "@/hooks/useRequestState";
import { walletServicesRepo } from "@/services/wallet.services";
import { extractErrorMessage } from "@/utils/errors/errorHandling.utils";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type TTransactionType = "DEBIT" | "CREDIT";
type TTransactData = {
  amount: number;
  description?: string;
};
type TTransactFormData = {
  amount: number;
  description?: string;
  type: TTransactionType;
};

const Transact = ({ walletId }: { walletId: string }) => {
  const router = useRouter();
  const walletContext = useWalletContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TTransactFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      type: "CREDIT",
    },
  });

  const { isLoading, setIsLoading } = useRequestState();

  const onValid: SubmitHandler<TTransactFormData> = async (data) => {
    const { amount, type, description } = data;

    if (+amount.toFixed(4) === 0) {
      return toast.error(
        "amount too small try with a some higher value, with less than 4 decimal places",
        {
          duration: 8000,
        }
      );
    }

    await transact({
      description: description || undefined,
      amount: type === "CREDIT" ? amount : -amount,
    });
  };

  const transact = async (data: TTransactData) => {
    try {
      setIsLoading(true);

      const walletSetupResponse = await toast.promise(
        walletServicesRepo.transactService({
          bodyData: data,
          paramsData: { walletId },
        }),
        {
          loading: "Transacting...",
          success: "Transaction Completed",
          error: (error) =>
            `Transaction Failed : ${extractErrorMessage(error)}`,
        }
      );

      setIsLoading(false);

      const { data: walletResponseData } = walletSetupResponse;

      const {
        data: { transactionId, updatedBalance },
      } = walletResponseData;

      walletContext.updateBalance(+updatedBalance);

      router.push(`/wallet/${walletId}/transaction-receipt/${transactionId}`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<TTransactFormData> = (event) => {
    toast.error("Please re-check the values entered in the form.");
    throw event;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(onValid, onError)(e);
  };

  return (
    <div className="tw-w-full md:tw-w-3/4 xl:tw-w-1/2">
      <form method="post" onSubmit={onSubmit}>
        <FormInput
          type="number"
          fieldName="amount"
          label="Transaction amount"
          register={register("amount", {
            validate: {
              decimal: (value) => {
                return (
                  /^([0-9]*[.])?[0-9]{0,4}$/.test(value.toString()) ||
                  "Please enter a number with upto 4 decimal places"
                );
              },
            },
            valueAsNumber: true,
            required: {
              value: true,
              message: "Amount is required",
            },
            min: {
              value: 0,
              message: "Amount should greater than 0",
            },
            // @ts-ignore
            // pattern: {
            //   value: /^([0-9]*[.])?[0-9]{0,4}$/,
            //   message: "Please enter a valid number with upto 4 decimal places",
            // },
          })}
          errors={errors}
        />
        <FormInput
          fieldName="description"
          label="Transaction Description"
          register={register("description", {
            required: false,
            maxLength: {
              value: 255,
              message: "Description should be less than 255 characters",
            },
            minLength: {
              value: 2,
              message: "Description should be greater than 2 characters",
            },
          })}
          errors={errors}
        />
        <div className="tw-py-1.5 tw-px-2 tw-flex tw-justify-between tw-items-center -tw-m-1">
          <div className="tw-grow">
            <select
              className="tw-px-2 tw-py-1 tw-shadow-sm"
              {...register("type", {})}
              onChange={(e) =>
                setValue("type", e.target.value as TTransactionType)
              }
            >
              {["DEBIT", "CREDIT"].map((type) => (
                <option
                  key={type}
                  value={type}
                  className="tw-rounded-none tw-py-1 tw-px-2"
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="tw-my-6 tw-px-6 tw-py-1 tw-bg-emerald-600 tw-text-white tw-rounded disabled:tw-bg-emerald-600/50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transact;
