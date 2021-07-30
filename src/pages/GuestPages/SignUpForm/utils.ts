/**
 * Нормализуем № телефона
 *
 * @param phone
 */
import {TUserParams} from "./SignUpFormTypes";

const normalizePhone = (phone: string): string => {
  return phone.replace(/[()\-\s]/g, '')
}

export const isUserParamsValid = (userParams: TUserParams): boolean => {
  let userParamsValid
  if (userParams.phone !== null && userParams.email !== null) {
    const emailRegExp = /^[\wа-яА-Я.\-]+@[\wа-яА-Я]+\.[\wа-яА-Я]{2,}$/i
    const isEmailValid = emailRegExp.test(userParams.email)
    const phoneRegExp = /^\+?\d\d{10}$/;
    // удаляем все ненужные символы - круглые скобки и дефисы
    const normalizedPhone = normalizePhone(userParams.phone)
    const isPhoneValid = phoneRegExp.test(normalizedPhone)
    userParamsValid = isEmailValid && isPhoneValid
  } else {
    userParamsValid = false
  }
  return userParamsValid
}