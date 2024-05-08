import axios, { AxiosResponse, AxiosError } from "axios";

interface Data {
  // Define the shape of your data here
}

const API_URL = "https://api.example.com/data";

async function createData(
  inputData: Data
): Promise<{ data?: Data; error?: any; status?: number }> {
  try {
    const { data }: AxiosResponse<Data> = await axios.post(
      `${API_URL}`,
      inputData
    );
    return { data };
  } catch (error) {
    const { response } = error as AxiosError;
    if (response) {
      const { data: errorData, status } = response;
      return { error: errorData, status };
    }
    return { error: "", status: 0 };
  }
}

async function readData(
  id: string
): Promise<{ data?: Data; error?: any; status?: number }> {
  try {
    const { data }: AxiosResponse<Data> = await axios.get(`${API_URL}/${id}`);
    return { data };
  } catch (error) {
    const { response } = error as AxiosError;
    if (response) {
      const { data: errorData, status } = response;
      return { error: errorData, status };
    }
    return { error: "", status: 0 };
  }
}

async function updateData(
  id: string,
  inputData: Data
): Promise<{ data?: Data; error?: any; status?: number }> {
  try {
    const { data }: AxiosResponse<Data> = await axios.put(
      `${API_URL}/${id}`,
      inputData
    );
    return { data };
  } catch (error) {
    const { response } = error as AxiosError;
    if (response) {
      const { data: errorData, status } = response;
      return { error: errorData, status };
    }
    return { error: "", status: 0 };
  }
}

async function deleteData(
  id: string
): Promise<{ data?: null; error?: any; status?: number }> {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { data: null };
  } catch (error) {
    const { response } = error as AxiosError;
    if (response) {
      const { data: errorData, status } = response;
      return { error: errorData, status };
    }
    return { error: "", status: 0 };
  }
}

export { createData, readData, updateData, deleteData };
