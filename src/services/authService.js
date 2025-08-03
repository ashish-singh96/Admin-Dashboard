import API from './axios'

export const loginUser = (credentials) => {
  return API.post('/login', credentials)
}
