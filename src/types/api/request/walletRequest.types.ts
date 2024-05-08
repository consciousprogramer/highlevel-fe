export type TWalletServiceRequestDataTypes = {
    walletSetupService: {
    name: string
    balance: number
  }
  fetchWalletService: {
    walletId: string
  }
  transactService: {
    bodyData: { amount: number; description?: string }
    paramsData: { walletId: string }
  }
}
