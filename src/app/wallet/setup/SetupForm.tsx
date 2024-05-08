"use client";
import { FormInput } from "@/components/common/UI/FormInput";
import { useWalletContext } from "@/contexts/wallet.context";
import { walletServicesRepo } from "@/services/wallet.services";
import React, { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import WalletSetupLoaderUI from "./loading";
import { useRouter } from "next/navigation";

function FormSetupData() {
  const router = useRouter();

  const walletContext = useWalletContext();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    balance: number;
  }>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      balance: 0,
    },
  });

  const onValid: SubmitHandler<{
    name: string;
    balance: number;
  }> = (data) => {
    toast.promise(setupWallet(data), {
      loading: "Setting up your wallet...",
      success: "Wallet setup successful",
      error: "Error setting up wallet",
    });
  };

  const setupWallet = async (data: { name: string; balance: number }) => {
    try {
      setIsLoading(true);
      const walletSetupResponse = await walletServicesRepo.walletSetupService(
        data
      );
      setIsLoading(false);

      const { data: walletResponseData, message } = walletSetupResponse;

      const { balance, id } = walletResponseData;

      walletContext.addWallet({ balance: +balance, id });

      router.replace(`/wallet/${id}/transact`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<{
    name: string;
    balance: number;
  }> = (event) => {
    toast.error("Please re-check the values entered in the form.");
    throw event;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(onValid, onError)(e);
  };

  if (isLoading) return <WalletSetupLoaderUI />;

  return (
    <div className="tw-w-full md:tw-w-3/4 xl:tw-w-1/2">
      <form method="post" onSubmit={onSubmit}>
        <FormInput
          fieldName="name"
          label="Wallet Name"
          register={register("name", {
            required: {
              value: true,
              message: "Wallet name is required",
            },
            minLength: {
              message: "Wallet name should be at least 3 characters long",
              value: 3,
            },
            maxLength: {
              message: "Wallet name should be at most 255 characters long",
              value: 255,
            },
          })}
          errors={errors}
        />
        <FormInput
          fieldName="balance"
          label="Initial balance"
          register={register("balance", {
            required: false,
            valueAsNumber: true,
            min: {
              message: "balance should be at least 0",
              value: 0,
            },
          })}
          errors={errors}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="tw-my-6 tw-px-6 tw-py-2 tw-bg-white tw-border tw-border-slate-100 tw-rounded tw-shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormSetupData;
