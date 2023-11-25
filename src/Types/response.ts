export interface IResponse<T> {
  status: 'Success' | 'Error' | 'Failed'
  message?: string
  data: T
}
