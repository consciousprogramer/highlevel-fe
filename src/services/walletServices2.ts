import { readData } from "./CrudRepo";

const getWalletInitialData = async (id: string) => {
  const { data, error, status } = await readData(id);

  return { data, error, status };
};

export { getWalletInitialData };
