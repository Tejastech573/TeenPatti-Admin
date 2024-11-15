// src/utils/cookies.ts
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const getToken = () => getCookie("token");
export const clearAuthCookies = () => {
  deleteCookie("token");
  deleteCookie("userId");
  deleteCookie("username");
};
