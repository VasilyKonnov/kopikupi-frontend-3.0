import { Dispatch } from 'react'

export type TUser = {
  fetchingState: string
  token: null | string
  errorText: string
}

export type TUserAction = {
  getToken: (token: string) => (dispatch: Dispatch<any>) => void
  remove: () => void
}
