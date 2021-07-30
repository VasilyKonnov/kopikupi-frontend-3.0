import React, { useEffect, useState } from 'react'
import SignUpFormView from './SignUpFormView'
import './SignUpForm.css'

import { TScreen, TUserParams } from './SignUpFormTypes'
import { message } from 'antd'
import { getResourceUrl } from '../../../config'
import { handleResponseWithErrors } from '../../../util/common'
// import {requestLogin} from '~/auth'
// import {TLoginOption} from "~/auth/types";
import { useHistory } from 'react-router'
import { titlePrefix } from '../../../constants'

/**
 * Компонент который отвечает за форму регистрации
 *
 * @constructor
 */

export const SignUpForm = () => {
  const history = useHistory()
  const [curScreen, setCurScreen] = useState<TScreen>(TScreen.SEND_CODE)
  const [isLoading, setIsLoading] = useState(false)
  const initUserParams = {
    email: null,
    phone: null,
    password: null,
  }
  const [isTimer, setIsTimer] = useState<boolean>(false)
  const [isSendPassAgain, setIsSendPassAgain] = useState<boolean>(true)

  const [userParams, setUserParams] = useState<TUserParams>(initUserParams)

  useEffect(() => {
    document.title = `${titlePrefix}Регистрация`
  }, [])

  const onUserParamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target === null) return
    const { name, value } = event.target
    setUserParams({
      ...userParams,
      [name]: value,
    })
  }

  const onSendCodeBtnClick = async () => {
    const userParamsJSON = JSON.stringify(userParams)
    setIsLoading(true)
    const response = await fetch(
      getResourceUrl('external-apis/sms-messages/'),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: userParamsJSON,
      },
    )
    if (response.ok) {
      setCurScreen(TScreen.ENTER_CODE)
      setIsLoading(false)
      message.success(
        'На указанный телефон придёт 6-значный код, который будет вашим паролем. \n' +
          'Изменить пароль можно будет в личном кабинете после регистрации',
        30,
      )
    } else {
      setIsLoading(false)
      await handleResponseWithErrors(response)
    }
  }

  const onEnterCodeBtnClick = () => {
    setCurScreen(TScreen.COMPLETE)
  }

  const onCompleteBtnClick = async () => {
    if (userParams.phone !== null && userParams.password !== null) {
      const signUpUserJSON = JSON.stringify(userParams)
      setIsLoading(true)
      const signUpResp = await fetch(getResourceUrl('user/sign-up/'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: signUpUserJSON,
      })
      if (signUpResp.ok) {
        // TODO: Подключить и настроить
        // const response = await requestLogin(
        //   userParams.phone,
        //   userParams.password,
        //   TLoginOption.PHONE,
        // )
        // if (response.ok) {
        //   history.push('/')
        //   message.success('Вы успешно зарегистрировались и вошли в систему')
        // } else if (response.status === 400) {
        //   message.error('Введён неправильный код!')
        // } else {
        //   message.error('Во время входа в систему произошла ошибка')
        // }
      } else {
        await handleResponseWithErrors(signUpResp)
      }
    } else {
      message.error('Не введены № телефона или пароль!')
    }
    setIsLoading(false)
  }

  const onActionBtnClick = () => {
    switch (curScreen) {
      case TScreen.SEND_CODE:
        onSendCodeBtnClick()
        break
      case TScreen.ENTER_CODE:
        onEnterCodeBtnClick()
        break
      case TScreen.COMPLETE:
        onCompleteBtnClick()
        break
      default:
        message.error('Указан неизвестный экран. Обратитесь в службу поддержки')
    }
  }

  const onBackLinkClick = () => {
    setUserParams(initUserParams)
    setCurScreen(TScreen.SEND_CODE)
  }
  const handlerIsTimer = () => {
    setIsTimer(true)
  }

  const handlerIsSendPassAgain = () => {
    onSendCodeBtnClick()
    setIsSendPassAgain(false)
  }

  return (
    <SignUpFormView
      curScreen={curScreen}
      onActionBtnClick={onActionBtnClick}
      userParams={userParams}
      onUserParamsChange={onUserParamsChange}
      onBackLinkClick={onBackLinkClick}
      handlerIsTimer={handlerIsTimer}
      isTimer={isTimer}
      setIsSendPassAgain={setIsSendPassAgain}
      isSendPassAgain={isSendPassAgain}
      handlerIsSendPassAgain={handlerIsSendPassAgain}
      isLoading={isLoading}
    />
  )
}
