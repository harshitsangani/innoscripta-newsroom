/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError } from "axios";

const baseUrl: string = "https://newsapi.org/v2";

class NetworkService {
  private getHeaders(): Record<string, string> {
    const token = import.meta.env.VITE_NEWS_API_API_KEY;
    return {
      "Content-Type": "application/json",
      Authorization: token,
    };
  }

  private handleAxiosError(error: AxiosError): void {
    alert(
      `(${error.response?.status}) ` +
        (error.response?.data as unknown as any)?.message
    );
  }

  async get<ResponseBody, RequestParams = unknown>(
    url: string,
    params?: RequestParams
  ): Promise<ResponseBody> {
    try {
      const response = await axios.get(baseUrl + url, {
        headers: this.getHeaders(),
        params,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleAxiosError(error);
      }

      throw error;
    }
  }

  async post<RequestBody, ResponseBody, RequestParams = unknown>(
    url: string,
    body?: RequestBody,
    params?: RequestParams
  ): Promise<ResponseBody> {
    try {
      const response = await axios.post(baseUrl + url, body, {
        method: "POST",
        headers: this.getHeaders(),
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        this.handleAxiosError(error);
      }

      throw error;
    }
  }

  async put<RequestBody, ResponseBody>(
    url: string,
    body: RequestBody
  ): Promise<ResponseBody> {
    try {
      const response = await axios.put(baseUrl + url, body, {
        method: "PUT",
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleAxiosError(error);
      }

      throw error;
    }
  }

  async patch<RequestBody>(url: string, body: RequestBody): Promise<void> {
    try {
      const response = await axios.patch(baseUrl + url, body, {
        method: "PATCH",
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleAxiosError(error);
      }

      throw error;
    }
  }

  async delete<ResponseBody>(url: string): Promise<ResponseBody> {
    try {
      const response = await axios.delete(baseUrl + url, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.handleAxiosError(error);
      }

      throw error;
    }
  }
}

const networkService = new NetworkService();

export default networkService;
