import { AxiosError } from "axios";

type TApiErrorResponse = {
  message: string;
  data: Record<string, any>;
};

export const extractAxiosErrorMessage = (
  error: AxiosError<TApiErrorResponse>
) => {
  // check for network error
  if (error.code === "ERR_NETWORK") {
    const { message } = error;
    return message;
  }

  //   check for error in response
  if (error.code === "ERR_BAD_RESPONSE" && error.response) {
    const { message, data } = error.response.data;
    return data.message || message;
  }
};

export const extractErrorMessage = (error: any) => {
  let errorMessage = "Something went wrong";
  if (error instanceof AxiosError) {
    const msg = extractAxiosErrorMessage(error);
    if (msg) errorMessage = msg;
  }

  return errorMessage;
};
