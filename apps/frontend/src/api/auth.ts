import api from './api'
import type { User } from '../types/user'

async function login(email: string, password: string): Promise<User> {
  const response = await api.post<User>('/auth/login', { email, password })
  return response.data
}

async function register(
  firstName: string,
  lastName: string,
  password: string,
  email: string,
): Promise<User> {
  const response = await api.post<User>('/auth/register', {
    firstName,
    lastName,
    password,
    email,
  })
  return response.data
}

async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>('/auth/me')
  return response.data
}

export { login, register, getCurrentUser }
