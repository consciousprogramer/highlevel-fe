import { buildResourceApiUrls } from "@/utils/url.utils"

const walletApiUrlConstructor = buildResourceApiUrls("/wallet")

export const walletApiEndpoints = {
  setup: walletApiUrlConstructor("/setup"),
  fetchWallet: walletApiUrlConstructor,
  transact:walletApiUrlConstructor
}
