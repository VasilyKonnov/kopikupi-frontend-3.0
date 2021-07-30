import axios from 'axios'
import { BACKEND_API_URL } from '../../config'
import {
  getAccessToken,
  getRefreshToken,
  setAccessRefreshTokens,
} from '../../util/cookieHelper'

const templateAxios = axios.create({
  baseURL: BACKEND_API_URL,
})

export default templateAxios

// const authAxios = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     'X-Api-Factory-Application-Id': xApiFactory,
//   },
// })

// authAxios.interceptors.request.use((config) => ({
//   ...config,
//   data: {
//     ...config.data,
//     client_secret: secret,
//     client_id: '111111',
//   },
// }))

// const updateToken = (requestBody: any) => {
//   return authAxios.post(routes.REFRESH, requestBody)
// }

// const crudAxios = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     'X-Api-Factory-Application-Id': xApiFactory,
//   },
// })

// crudAxios.interceptors.request.use(async (config) => ({
//   ...config,
//   data: {
//     ...config.data,
//     client_secret: secret,
//   },
//   headers: {
//     ...config.headers,
//     authorization: `Bearer ${getAccessToken()}`,
//   },
// }))

// crudAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true
//       const response = await updateToken({ refresh_token: getRefreshToken() })
//       const { access_token, refresh_token, expires_in } = response.data
//       setAccessRefreshTokens(access_token, refresh_token, expires_in)
//       return crudAxios(originalRequest)
//     }
//     return Promise.reject(error)
//   },
// )

// export { authAxios, updateToken, crudAxios }
