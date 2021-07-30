import React from 'react'
import { Input, message } from 'antd'
import { TScreen, TSignUpForm } from './SignUpFormTypes'
import { isUserParamsValid } from './utils'
import { Timer } from '../../../components'
import { SpinnerInCenterBlock } from '../../../components'

/**
 * Устанавливаем текст кнопки в зависимости от текущего экрана
 * @param curScreen
 */

const setBtnTitleFromCurScreen = (curScreen: TScreen): string => {
  let btnTitle

  switch (curScreen) {
    case TScreen.SEND_CODE:
      btnTitle = 'Отправить код'
      break
    case TScreen.ENTER_CODE:
      btnTitle = 'Ввести код'
      break
    case TScreen.COMPLETE:
      btnTitle = 'Завершить регистрацию'
      break
    default:
      throw TypeError(
        'Указан неверный экран регистрации. Обратитесь в службу поддержки',
      )
  }
  return btnTitle
}

const SignUpFormView: React.FC<TSignUpForm> = React.memo(
  ({
    curScreen,
    onActionBtnClick,
    userParams,
    onUserParamsChange,
    onBackLinkClick,
    isTimer,
    handlerIsTimer,
    setIsSendPassAgain,
    isSendPassAgain,
    handlerIsSendPassAgain,
    isLoading,
  }) => {
    let btnTitle
    try {
      btnTitle = setBtnTitleFromCurScreen(curScreen)
    } catch (err) {
      message.error(err.message)
      return (
        <div className="sign-up-wrap">
          <p>{err.message}</p>
        </div>
      )
    }

    const sendSmsCodeBtnEnabled = isUserParamsValid(userParams)

    const userPhoneVal =
      userParams.phone !== null ? userParams.phone : undefined
    const userEmailVal =
      userParams.email !== null ? userParams.email : undefined
    const userPassVal =
      userParams.password !== null ? userParams.password : undefined

    const inputDisabled = curScreen === TScreen.ENTER_CODE

    return (
      <>
        <div className="sign-up-wrap">
          <h1>Регистрация</h1>
          {curScreen === TScreen.SEND_CODE && (
            <p aria-label="sign-up-hint">
              Чтобы зарегистрироваться, введите свой номер телефона и почту
            </p>
          )}

          <div className="sign-up-form">
            {isLoading ? (
              <SpinnerInCenterBlock />
            ) : (
              <>
                {curScreen === TScreen.COMPLETE ? (
                  <>
                    <label>Код</label>
                    <Input
                      aria-label="sms-code"
                      name="password"
                      type="password"
                      value={userPassVal}
                      onChange={(event) => onUserParamsChange(event)}
                    />
                  </>
                ) : (
                  <>
                    <label>Телефон</label>
                    <Input
                      aria-label="phone"
                      placeholder="+7 --- --- -- --"
                      name="phone"
                      type="tel"
                      disabled={inputDisabled}
                      value={userPhoneVal}
                      onChange={(event) => onUserParamsChange(event)}
                    />
                    <label>Почта</label>
                    <Input
                      aria-label="email"
                      name="email"
                      type="email"
                      disabled={inputDisabled}
                      value={userEmailVal}
                      onChange={(event) => onUserParamsChange(event)}
                    />
                    {isTimer && curScreen === TScreen.ENTER_CODE ? (
                      <>
                        <Timer setIsSendPassAgain={setIsSendPassAgain} />
                        <button
                          aria-label="send-sms-again"
                          onClick={handlerIsSendPassAgain}
                          className="send-pass-again"
                          disabled={isSendPassAgain}
                        >
                          Отправить код повторно
                        </button>
                      </>
                    ) : null}
                  </>
                )}

                <button
                  className="action-button"
                  aria-label="send-code-btn"
                  disabled={!sendSmsCodeBtnEnabled}
                  onClick={() => {
                    onActionBtnClick()
                    handlerIsTimer()
                  }}
                >
                  {btnTitle}
                </button>
              </>
            )}
          </div>
          {curScreen === TScreen.COMPLETE && (
            <>
              <p className="back-link-label">
                Если код не пришёл, можно вернуться на предыдущий этап и
                отправить код повторно
              </p>
              <a href="#" className="back-link" onClick={onBackLinkClick}>
                &lt;Назад
              </a>
            </>
          )}
        </div>
      </>
    )
  },
)

export default SignUpFormView
