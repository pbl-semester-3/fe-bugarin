import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // wajib — supaya cookie httpOnly JWT ikut terkirim
  headers: {
    "X-Client-Type": "web", // backend pakai ini untuk tentukan cookie vs bearer body
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined" && err.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
