import { fetchApi } from '../Helpers/fetchApi'
import { IUser } from '../Types/model'
import { IResponse } from '../Types/response'

export async function getUsers() {
  const response = await fetchApi('users', {
    method: 'GET'
  })
  const result = (await response.json()) as IResponse<{ users: IUser[] }>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data.users
}

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  const response = await fetchApi('users', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  const result = (await response.json()) as IResponse<{ user: IUser }>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data.user
}

export async function updateUser(
  data: {
    name: string
    email: string
    password?: string
  },
  userId: number
) {
  const response = await fetchApi(`users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  const result = (await response.json()) as IResponse<{ user: IUser }>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data.user
}

export async function deleteUser(userId: number) {
  const response = await fetchApi(`users/${userId}`, {
    method: 'DELETE'
  })
  const result = (await response.json()) as IResponse<{ user: IUser }>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data.user
}

export async function getMe() {
  const response = await fetchApi('get-me', {
    method: 'GET'
  })
  const result = (await response.json()) as IResponse<{ user: IUser }>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data.user
}
