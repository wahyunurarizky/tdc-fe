import { fetchApi } from '../Helpers/fetchApi'
import { IUser } from '../Types/model'
import { IResponse } from '../Types/response'

interface IRegister {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface DataLogin {
  user: IUser
}

export default async function fetchRegister(data: IRegister) {
  const response = await fetchApi('register', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  const result = (await response.json()) as IResponse<DataLogin>
  if (!response.ok) {
    throw new Error(result.message)
  }

  return result.data.user
}
