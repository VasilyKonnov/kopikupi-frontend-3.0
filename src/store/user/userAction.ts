import { setUser, removeUser } from './userSlice'
import { TUserAction } from './userTypes'

export const userAction: TUserAction = {
  getToken: (token: string) => (dispatch) => {
    dispatch(setUser(token))
  },
  remove: () => (dispatch: (arg0: any) => void) => {
    dispatch(removeUser())
  },
}
