import api from './api'

async function login(username: string, password: string) {
  const response = await api.post('/auth/login', { username, password })
  return response.data
}

async function register(username: string, password: string, email: string) {
  const response = await api.post('/auth/register', { username, password, email })
  return response.data
}

export { login, register }
