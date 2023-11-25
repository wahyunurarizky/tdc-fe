const baseApi = 'http://localhost:8000/api/'

export const fetchApi = (path: string, opt: RequestInit) => {
  return fetch(new URL(path, baseApi), {
    ...opt,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      ...opt.headers
    }
  })
}
