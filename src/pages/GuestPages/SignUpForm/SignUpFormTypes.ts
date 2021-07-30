import React from 'react'

/**
 * Какой экран регистрации показывать
 */
export enum TScreen {
  SEND_CODE = 0,
  ENTER_CODE = 1,
  COMPLETE = 2,
}

/**
 * Параметра пользователя, нужные для регистрации.
 * Реализовали этот для хранения в состоянии компонента,
 * чтобы не дублировать код для множества параметров (onChange для email, onChange для phone и тд)
 */
export type TUserParams = {
  email: string | null
  phone: string | null
  password: string | null
}

export type TSignUpForm = {
  curScreen: TScreen
  onActionBtnClick: () => void
  onUserParamsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  userParams: TUserParams
  onBackLinkClick: () => void
  isTimer: boolean
  handlerIsTimer: () => void
  setIsSendPassAgain: (val: boolean) => void
  isSendPassAgain: boolean
  handlerIsSendPassAgain: () => void
  isLoading: boolean
}
