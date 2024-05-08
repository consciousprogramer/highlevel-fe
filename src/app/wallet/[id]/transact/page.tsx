"use client";
import { walletServicesRepo } from "@/services/wallet.services";
import React, { useState } from "react";
import Transact from "./Transact";
enum transactionType {
  Credit = "Credit",
  Debit = "Debit",
}
interface formDataInterface {
  amount: number;
  type: transactionType;
  description: string;
}

function TransactPage({ params: { id } }: { params: { id: string } }) {
  return <Transact walletId={id} />;
}

export default TransactPage;
