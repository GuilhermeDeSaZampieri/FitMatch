import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

console.log("API URL HTTP:", "http://localhost:3000");

export function getHeaders() {
  return {
    headers: { "Content-Type": "application/json" },
  };
}

export function getParamsSearch(value: string) {
  const token = localStorage.getItem("token");
  return {
    params: {
      search: value,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function getAuthorization() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}
