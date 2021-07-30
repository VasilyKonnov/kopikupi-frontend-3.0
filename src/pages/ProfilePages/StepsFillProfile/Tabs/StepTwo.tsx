import React, { ChangeEvent, useEffect, useState } from 'react'
import { TStepTwo } from '../StepsFillProfileTypes'
import classNames from 'classnames'
import styles from './Step.module.scss'
import { InputVsLabel, DatePicker, TextArea } from '../../../../components'

export const StepTwo: React.FC<TStepTwo> = ({
  handleNextStep,
  setCompletedSteps,
  completedSteps,
  fullProfileInfo,
  setFullProfileInfo,
}) => {
  const [series, setSeries] = useState<string | null>(null)
  const [num, setNum] = useState<string | null>(null)
  // кем выдан
  const [issuingAuthority, setIssuingAuthority] = useState<string | null>(null)
  const [issuingDate, setIssuingDate] = useState<string | null>(null)
  const [subDivisionCode, setSubDivisionCode] = useState<string | null>(null)
  const [INN, setINN] = useState<string | null>(null)

  const [innError, setInnError] = useState(false)

  const [stepComplete, setStepComplete] = useState<boolean>(false)

  const handleSeries = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value.replace(/\D/g, '').substr(0, 4)
    setSeries(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      passportSeries: val,
    })
  }
  const handleNum = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value.replace(/\D/g, '').substr(0, 6)
    setNum(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      passportNumber: val,
    })
  }
  const handleIssuingAuthority = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const val = event.currentTarget.value
    setIssuingAuthority(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      passportIssuingAuthority: val,
    })
  }
  const handleIssuingDate = (date: any, dateString: string) => {
    setIssuingDate(dateString)
    setFullProfileInfo({
      ...fullProfileInfo,
      passportIssuingDate: dateString,
    })
  }
  const handleSubdivisionCode = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    setSubDivisionCode(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      passportSubdivisionCode: val,
    })
  }
  const handleINN = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value.replace(/\D/g, '').substr(0, 12)
    if (val.length < 12) {
      setInnError(true)
    } else {
      setInnError(false)
    }
    setINN(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      INN: val,
    })
  }

  useEffect(() => {
    const _stepComplete = Boolean(num && issuingAuthority && issuingDate && INN)
    setCompletedSteps({
      ...completedSteps,
      passportData: _stepComplete,
    })
    setStepComplete(_stepComplete)
  }, [series, num, issuingAuthority, issuingDate, subDivisionCode, INN])

  useEffect(() => {
    if (fullProfileInfo.passportSeries && !series) {
      setSeries(fullProfileInfo.passportSeries)
    }
    if (fullProfileInfo.passportNumber && !num) {
      setNum(fullProfileInfo.passportNumber)
    }
    if (fullProfileInfo.passportIssuingAuthority && !issuingAuthority) {
      setIssuingAuthority(fullProfileInfo.passportIssuingAuthority)
    }
    if (fullProfileInfo.passportIssuingDate && !issuingDate) {
      setIssuingDate(fullProfileInfo.passportIssuingDate)
    }
    if (fullProfileInfo.passportSubdivisionCode && !subDivisionCode) {
      setSubDivisionCode(fullProfileInfo.passportSubdivisionCode)
    }
    if (fullProfileInfo.INN && !subDivisionCode) {
      setINN(fullProfileInfo.INN)
    }
  }, [
    fullProfileInfo,
    series,
    num,
    issuingAuthority,
    issuingDate,
    subDivisionCode,
    INN,
  ])

  return (
    <>
      <div className={styles.greedWrap}>
        <div className={styles.greedCol}>
          <InputVsLabel
            label={'Серия'}
            id={'series'}
            onChange={handleSeries}
            inputVal={series}
            isOptional={true}
            isValid={true}
          />
          <InputVsLabel
            label={'Номер'}
            id={'num'}
            onChange={handleNum}
            inputVal={num}
            isValid={true}
          />
          <TextArea
            label={'Кем выдан'}
            id={'issuingAuthority'}
            onChange={handleIssuingAuthority}
            innerText={issuingAuthority}
          />
        </div>
        <div className={styles.greedCol}>
          <DatePicker
            date={issuingDate}
            onChange={handleIssuingDate}
            label="Дата выдачи"
          />
          <InputVsLabel
            label={'Код подразделения'}
            id={'subdivisionCode'}
            onChange={handleSubdivisionCode}
            inputVal={subDivisionCode}
            isOptional={true}
            isValid={true}
          />
          <InputVsLabel
            label={'ИНН'}
            id={'INN'}
            inputVal={INN}
            onChange={handleINN}
            isValid={innError}
            validationText="Введите 12 цифр ИНН"
          />
        </div>
      </div>
      <button
        className={classNames('button-primary', styles.btnCenter)}
        type="button"
        onClick={handleNextStep}
        disabled={stepComplete && !innError ? false : true}
      >
        Продолжить
      </button>
    </>
  )
}
