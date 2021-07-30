import React, { useEffect, useState } from 'react'
import { TStepOne } from '../StepsFillProfileTypes'
import { DatePicker, InputVsLabel } from '../../../../components'
import { Radio } from 'antd'
import classNames from 'classnames'
import styles from './Step.module.scss'
import './styledAnt.scss'

export const StepOne: React.FC<TStepOne> = ({
  handleNextStep,
  setCompletedSteps,
  completedSteps,
  fullProfileInfo,
  setFullProfileInfo,
}) => {
  const [surname, setSurname] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [middleName, setMiddleName] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [mail, setMail] = useState<string | null>(null)
  const [birthDate, setBirthDate] = useState<string | null>(null)
  const [genderVal, setGenderVal] = useState<string | null>(null)

  const [mailError, setMailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  function handleBirthDate(date: any, dateString: string) {
    setBirthDate(dateString)
    setFullProfileInfo({
      ...fullProfileInfo,
      birthday: dateString,
    })
  }
  const handleSurname = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setSurname(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      lastName: val,
    })
  }
  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setName(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      firstName: val,
    })
  }
  const handleMiddleName = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setMiddleName(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      middleName: val,
    })
  }
  const handlePhone = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value.replace(/\D/g, '').substr(0, 11)
    if (val.length < 11) {
      setPhoneError(true)
    } else {
      setPhoneError(false)
    }
    setPhone(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      phone: val,
    })
  }
  const handleMail = (e: React.FormEvent<HTMLInputElement>) => {
    const emailRegExp = /^[\wа-яА-Я.\-]+@[\wа-яА-Я]+\.[\wа-яА-Я]{2,}$/i
    const val = e.currentTarget.value
    if (emailRegExp.test(val)) {
      setMailError(false)
    } else {
      setMailError(true)
    }
    setMail(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      email: val,
    })
  }
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setGenderVal(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      gender: val,
    })
  }

  useEffect(() => {
    const stepComplete = Boolean(
      surname && name && middleName && phone && mail && genderVal && birthDate,
    )
    setCompletedSteps({
      ...completedSteps,
      fio: stepComplete,
    })
  }, [surname, name, middleName, phone, mail, genderVal, birthDate])

  // useEffect(() => {
  //   if (fullProfileInfo.birthday && !birthDate) {
  //     setBirthDate(fullProfileInfo.birthday)
  //   }
  //   if (fullProfileInfo.lastName && !surname) {
  //     setSurname(fullProfileInfo.lastName)
  //   }
  //   if (fullProfileInfo.firstName && !name) {
  //     setName(fullProfileInfo.firstName)
  //   }
  //   if (fullProfileInfo.middleName && !middleName) {
  //     setMiddleName(fullProfileInfo.middleName)
  //   }
  //   if (fullProfileInfo.phone && !phone) {
  //     setPhone(fullProfileInfo.phone)
  //   }
  //   if (fullProfileInfo.email && !mail) {
  //     setMail(fullProfileInfo.email)
  //   }
  //   if (fullProfileInfo.gender && !genderVal) {
  //     setGenderVal(fullProfileInfo.gender)
  //   }
  // }, [fullProfileInfo, birthDate, surname, middleName, phone, mail, genderVal])

  return (
    <>
      <div className={styles.greedWrap}>
        <div className={styles.greedCol}>
          <InputVsLabel
            label={'Фамилия'}
            id="surname"
            onChange={handleSurname}
            inputVal={surname}
            isValid={true}
          />
          <InputVsLabel
            label={'Имя'}
            id="name"
            onChange={handleName}
            inputVal={name}
            isValid={true}
          />
          <InputVsLabel
            label={'Отчество'}
            id="middleName"
            onChange={handleMiddleName}
            inputVal={middleName}
            isValid={true}
          />
        </div>
        <div className={styles.greedCol}>
          <InputVsLabel
            label={'Номер телефона'}
            id="phone"
            type="tel"
            onChange={handlePhone}
            inputVal={phone}
            isValid={phoneError}
            validationText="Введите 11 цифр номера телефона"
          />
          <InputVsLabel
            label={'Почта'}
            type={'email'}
            id="mail"
            onChange={handleMail}
            inputVal={mail}
            isValid={mailError}
            validationText="Введите корректный Email"
          />
          <DatePicker
            onChange={handleBirthDate}
            date={birthDate}
            label="Дата рождения"
          />
        </div>
      </div>
      <div className={styles.genderWrap}>
        <p className={styles.labelRadios}>
          {genderVal ? <span className={'greenCheckIcon'}></span> : '* '}
          Пол
        </p>
        <Radio.Group onChange={(e: any) => handleGender(e)} value={genderVal}>
          <Radio className="custom-radio-button" value={'м'}>
            Мужской
          </Radio>
          <Radio className="custom-radio-button" value={'ж'}>
            Женский
          </Radio>
        </Radio.Group>
      </div>
      <button
        className={classNames('button-primary', styles.btnCenter)}
        type="button"
        onClick={handleNextStep}
        disabled={
          surname &&
          name &&
          middleName &&
          phone &&
          mail &&
          genderVal &&
          birthDate &&
          !mailError &&
          !phoneError
            ? false
            : true
        }
      >
        Продолжить
      </button>
    </>
  )
}
