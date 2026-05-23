import { api } from './api'

type LoginResponse = {
  token: string
}

export async function loginRequest(
  email: string,
  password: string
) {
  const response =
    await api.post<LoginResponse>(
      '/auth/login',
      {
        email,
        password,
      }
    )

  return response.data
}

export async function registerRequest(
  email: string,
  password: string
) {
  const response =
    await api.post(
      '/auth/register',
      {
        email,
        password,
      }
    )

  return response.data
}