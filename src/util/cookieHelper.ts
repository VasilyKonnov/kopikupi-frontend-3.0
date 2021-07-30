import Cookies from 'js-cookie'

const ONE_WEEK = 604800

const setAccessToken = (token: string | object, expires: Date) => {
  Cookies.set('accessToken', token, {
    secure: true,
    samesite: 'strict',
    expires,
  })
}

const setRefreshToken = (token: string | object, expires: Date) => {
  Cookies.set('refreshToken', token, {
    secure: true,
    samesite: 'strict',
    expires,
  })
}

const setAccessRefreshTokens = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
) => {
  const expiresAccessToken = new Date(Date.now() + (expiresIn - 600) * 1000)
  const expiresRefreshToken = new Date(Date.now() + ONE_WEEK * 1000)
  setAccessToken(accessToken, expiresAccessToken)
  setRefreshToken(refreshToken, expiresRefreshToken)
}

const getAccessToken = () => {
  return Cookies.get('accessToken')
}

const removeAccessToken = () => {
  Cookies.remove('accessToken')
}

const getRefreshToken = () => {
  return Cookies.get('refreshToken')
}

const removeRefreshToken = () => {
  Cookies.remove('refreshToken')
}

export {
  setAccessToken,
  setAccessRefreshTokens,
  getAccessToken,
  removeAccessToken,
  getRefreshToken,
  removeRefreshToken,
}
