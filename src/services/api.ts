// axiosConfig.ts
// apiService.ts
// api.ts
import axios from "axios"

const api = axios.create({
  baseURL: "https://fish-aquarium-blue.vercel.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register"]

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// api.interceptors.response.use()

export default api
