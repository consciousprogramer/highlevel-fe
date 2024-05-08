import axios, { AxiosError, AxiosRequestConfig } from "axios";

type ResourceStatus<T> = "pending" | "success" | "error";

interface Resource<T> {
  read(): T;
}
export function createResource<T>(promise: Promise<T>): Resource<T> {
  let status: ResourceStatus<T> = "pending";
  let result: T | Error | null = null;

  const suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw result as Error;
        case "success":
          return result as T;
        default:
          throw new Error("Unexpected resource status");
      }
    },
  };
}

class RequestHandler {
  token: string;
  headers: { Authorization: string } = { Authorization: "" };
  constructor(token: string) {
    this.token = token;
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  suspenseAwarePost<ResponseDataType>(
    url: string,
    bodyData?: object,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const modifiedPromise = createResource(
        axios.post<ResponseDataType>(url, bodyData, {
          ...config,
          headers: this.headers,
        })
      );
      return modifiedPromise.read();
    } catch (error) {
      throw error as AxiosError;
    }
  }

  async simplePost<ResponseDataType>(
    url: string,
    bodyData?: object,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const response = await axios.post<ResponseDataType>(url, bodyData, {
        ...config,
        headers: this.headers,
      });

      return response;
    } catch (error) {
      throw error as AxiosError;
    }
  }

  suspenseAwareGet<ResponseDataType>(
    url: string,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const modifiedPromise = createResource(
        axios.get<ResponseDataType>(url, {
          ...config,
          headers: this.headers,
        })
      );
      return modifiedPromise.read();
    } catch (error) {
      throw error as AxiosError;
    }
  }

  async simpleGet<ResponseDataType>(
    url: string,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const response = axios.get<ResponseDataType>(url, {
        ...config,
        headers: this.headers,
      });

      return response;
    } catch (error) {
      throw error as AxiosError;
    }
  }
}

export const requestHandler = new RequestHandler("");
