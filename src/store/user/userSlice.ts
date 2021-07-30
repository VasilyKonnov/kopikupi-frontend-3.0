import { createSlice } from '@reduxjs/toolkit'
import { TUser } from './userTypes'
import { FetchingStateTypes } from '../types'

const initialState: TUser = {
  fetchingState: FetchingStateTypes.none,
  token: null,
  errorText: '',
}

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.token = payload
      state.fetchingState = FetchingStateTypes.success
    },
    removeUser: (state) => {
      state.token = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer
