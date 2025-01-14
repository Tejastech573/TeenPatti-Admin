import { axiosInstance } from "@/utils/axios";
import { setCookie } from "cookies-next";
interface LoginResponse {
  status: string;
  token?: string;
  msg?: string;
}

interface LoginResponse {
  status: string;
  token?: string;
  msg?: string;
}

export const loginAdmin = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/admin/login", {
      username,
      password,
    });
    if (response.data.token) {
      setCookie("token", response.data.token);
    }
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      status: "error",
      msg: error.response?.data?.msg || "An error occurred during login",
    };
  }
};

export const getUnBlockUser = async () => {
  try {
    const response = await axiosInstance.get(`/admin/users?is_blocked=false`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
export const getBlockUser = async () => {
  try {
    const response = await axiosInstance.get(`/admin/users?is_blocked=true`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
export const welcomeChips = async () => {
  try {
    const response = await axiosInstance.get(`/settings`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
export const GetPaymentHistory = async () => {
  try {
    const response = await axiosInstance.get(`/payments/history`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
export const UserBlock = async (userId: string) => {
  try {
    const response = await axiosInstance.post(`/admin/block/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
export const UserUnBlock = async (userId: string) => {
  try {
    const response = await axiosInstance.post(`/admin/unblock/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
export const addDailyReward = async (addDailyReward: any) => {
  try {
    const response = await axiosInstance.post(`/settings`, addDailyReward);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};

export const PlayerNameUpdate = async (name: any, userId: any) => {
  try {
    const response = await axiosInstance.post(`/user/profile`, {
      userId: userId,
      name: name,
    });
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};
