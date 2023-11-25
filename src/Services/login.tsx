import { fetchApi } from '../Helpers/fetchApi'
import { IUser } from '../Types/model'
import { IResponse } from '../Types/response'

interface ILogin {
  email: string
  password: string
}

interface DataLogin {
  user: IUser
  token: string
}

export default async function fetchLogin(data: ILogin) {
  const response = await fetchApi('login', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  const result = (await response.json()) as IResponse<DataLogin>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data
}
