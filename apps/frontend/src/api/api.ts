import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && typeof error.response?.data?.message === 'string') {
      error.message = error.response.data.message
    }

    return Promise.reject(error)
  },
)

export default api
