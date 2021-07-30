import React, { useEffect, useState } from 'react'
import { TSaveProfileRequestStatus, TStepThree } from '../StepsFillProfileTypes'
import { Checkbox, Select } from 'antd'
import moment from 'moment'
import classNames from 'classnames'
import styles from './Step.module.scss'
import './styledAnt.scss'
import { SpinnerInCenterBlock, InputVsLabel } from '../../../../components'

export const StepThree: React.FC<TStepThree> = ({
  setCompletedSteps,
  completedSteps,
  fullProfileInfo,
  setFullProfileInfo,
  handleSave,
  //TODO: везде разкоментировать и вернуть его в работу, в типах сделать этот пропс обязательным
  // requestStatus,
}) => {
  const [citizenship, setCitizenship] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [addressResidence, setAddressResidence] = useState<string | null>(null)
  const [addressRegistration, setAddressRegistration] = useState<string | null>(
    null,
  )
  const [registrationIndex, setRegistrationIndex] = useState<string | null>(
    null,
  )
  const [residenceIndex, setResidenceIndex] = useState<string | null>(null)
  const [timeZone, setTimeZone] = useState<string | null>(null)
  const [addressVsRegistration, setAddressVsRegistration] = useState<
    string | null
  >(null)
  const [region, setRegion] = useState<string | null>(null)

  const SpinOrButton = () => {
    // TODO: вернуть в работу после подключения сервера
    // if (requestStatus === TSaveProfileRequestStatus.PENDING) {
    //   return <SpinnerInCenterBlock />
    // } else {
    return (
      <button
        className={classNames(
          'button-primary',
          styles.btnCenter,
          styles.btnSubmit,
        )}
        type="button"
        onClick={handleSave}
        disabled={
          country &&
          timeZone &&
          citizenship &&
          residenceIndex &&
          registrationIndex &&
          addressResidence &&
          addressRegistration
            ? false
            : true
        }
      >
        Сохранить
      </button>
    )
    // }
  }

  const handlerCitizenship = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setCitizenship(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      citizenship: val,
    })
  }
  const handlerCountry = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setCountry(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      countryLivingIn: val,
    })
  }
  const handlerRegion = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setRegion(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      regionLivingIn: val,
    })
  }
  const handlerAddressResidence = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setAddressResidence(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      factAddress: val,
    })
  }
  const handlerAddressRegistration = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setAddressRegistration(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      regAddress: val,
    })
  }
  const handlerRegistrationIndex = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setRegistrationIndex(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      regAddressIndex: val,
    })
  }
  const handlerResidenceIndex = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setResidenceIndex(val)
    setFullProfileInfo({
      ...fullProfileInfo,
      factAddressIndex: val,
    })
  }

  const handleCheckBox = (e: { target: { checked: any } }) => {
    setAddressVsRegistration(e.target.checked)
    if (!e.target.checked) {
      setAddressResidence('')
      setResidenceIndex('')
      setFullProfileInfo({
        ...fullProfileInfo,
        factAddress: null,
        factAddressIndex: null,
      })
    }
  }

  const handleTimeZone = (value: string) => {
    setTimeZone(value)
    setFullProfileInfo({
      ...fullProfileInfo,
      timezone: value,
    })
  }

  useEffect(() => {
    if (addressVsRegistration) {
      setAddressResidence(addressRegistration)
      setResidenceIndex(registrationIndex)
      setFullProfileInfo({
        ...fullProfileInfo,
        factAddress: addressRegistration,
        factAddressIndex: registrationIndex,
      })
    }
  }, [
    addressVsRegistration,
    addressResidence,
    addressRegistration,
    residenceIndex,
    registrationIndex,
    setResidenceIndex,
    setFullProfileInfo,
    fullProfileInfo,
  ])

  useEffect(() => {
    const stepComplete = Boolean(
      country &&
        timeZone &&
        citizenship &&
        residenceIndex &&
        registrationIndex &&
        addressResidence &&
        addressRegistration,
    )
    setCompletedSteps({
      ...completedSteps,
      address: stepComplete,
    })
  }, [
    citizenship,
    country,
    addressResidence,
    residenceIndex,
    registrationIndex,
    timeZone,
    addressRegistration,
  ])

  useEffect(() => {
    if (fullProfileInfo.citizenship && !citizenship) {
      setCitizenship(fullProfileInfo.citizenship)
    }
    if (fullProfileInfo.countryLivingIn && !country) {
      setCountry(fullProfileInfo.countryLivingIn)
    }
    if (fullProfileInfo.regionLivingIn && !region) {
      setRegion(fullProfileInfo.regionLivingIn)
    }
    if (fullProfileInfo.regAddress && !addressRegistration) {
      setAddressRegistration(fullProfileInfo.regAddress)
    }
    if (fullProfileInfo.factAddress && !addressResidence) {
      setAddressResidence(fullProfileInfo.factAddress)
    }
    if (fullProfileInfo.regAddressIndex && !registrationIndex) {
      setRegistrationIndex(fullProfileInfo.regAddressIndex)
    }
    if (fullProfileInfo.factAddressIndex && !residenceIndex) {
      setResidenceIndex(fullProfileInfo.factAddressIndex)
    }
    if (fullProfileInfo.timezone && !timeZone) {
      setTimeZone(fullProfileInfo.timezone)
    }
  }, [
    fullProfileInfo,
    citizenship,
    country,
    region,
    addressResidence,
    registrationIndex,
    residenceIndex,
    timeZone,
  ])

  const getSelectorOptions = (getDefault = false) => {
    moment.locale('ru')

    // @ts-ignore: Property 'unpack' does not exist on type 'MomentTimezone'
    let c = moment.tz()

    if (getDefault)
      return `${c.tz('Europe/Moscow').format('Z')} ${'Europe/Moscow'}: ${c
        .tz('Europe/Moscow')
        .format('lll')}`

    interface ITimeZone {
      [key: string]: string[][]
    }

    let timeZoneDict: ITimeZone = {}
    // @ts-ignore: Property 'unpack' does not exist on type 'MomentTimezone'
    const timeZoneArray = moment.tz
      .names()
      .map((zoneName: any) => {
        let result = [
          zoneName,
          `${c.tz(zoneName).format('Z')} ${zoneName}: ${c
            .tz(zoneName)
            .format('lll')}`,
        ]

        if (timeZoneDict[c.tz(zoneName).format('Z')] !== undefined)
          timeZoneDict[c.tz(zoneName).format('Z')].push(result)
        else timeZoneDict[c.tz(zoneName).format('Z')] = Array.of(result)

        return result
      })
      .sort((first: string[], second: string[]) => {
        const extractOffset = (Tz: string) => {
          const temp = Tz.slice(0, 6)
          const offset =
            ((temp.substring(1, 3) as unknown) as number) * 60 +
            ((temp.substring(temp.length - 2) as unknown) as number)

          if (temp[0] === '-') return offset * -1
          return offset
        }

        const firstOffset = extractOffset(first[1])
        const secondOffset = extractOffset(second[1])

        return firstOffset - secondOffset
      })

    const makeGroup = () => {
      let selectGroup = []
      for (let key in timeZoneDict) {
        selectGroup.push(
          timeZoneDict[key].map((zone) => (
            <Select.Option value={zone[0]}>{zone[1]}</Select.Option>
          )),
        )
      }

      selectGroup = selectGroup
        .sort((first, second) => {
          const extractOffset = (Tz: string) => {
            const temp = Tz.slice(0, 6)
            const offset =
              ((temp.substring(1, 3) as unknown) as number) * 60 +
              ((temp.substring(temp.length - 2) as unknown) as number)

            if (temp[0] === '-') return offset * -1
            return offset
          }

          const firstOffset = extractOffset(first[0].props.children as string)
          const secondOffset = extractOffset(second[0].props.children as string)

          return firstOffset - secondOffset
        })
        .map((selectOptions) => (
          <Select.OptGroup
            label={(selectOptions[0].props.children as string).slice(0, 6)}
          >
            {/* TODO: Вернуть в работу, и убрать фейки */}
            {/* {selectOptions} */}
            <Select.Option value="123">123</Select.Option>
            <Select.Option value="456">456</Select.Option>
            <Select.Option value="789">789</Select.Option>
          </Select.OptGroup>
        ))

      return selectGroup
    }

    return makeGroup()
  }

  return (
    <>
      <div className={styles.greedWrapAddress}>
        <div className={styles.greedColAddress}>
          <InputVsLabel
            label={'Гражданство'}
            id="id-1"
            onChange={handlerCitizenship}
            inputVal={citizenship}
            isValid={true}
          />
          <InputVsLabel
            label={'Страна проживания'}
            id="id-2"
            onChange={handlerCountry}
            inputVal={country}
            isValid={true}
          />
          <InputVsLabel
            label={'Регион'}
            id="id-2-1"
            onChange={handlerRegion}
            inputVal={region}
            isValid={true}
          />
          <div className={styles.wrapSelect}>
            <p className={styles.selectLabel}>
              {timeZone ? <span className="greenCheckIcon"></span> : '*'}{' '}
              Часовой пояс
            </p>
            <Select
              className={'select-fill-profile'}
              onChange={handleTimeZone}
              showArrow={false}
              defaultValue={timeZone ? timeZone : ''}
            >
              {/* {getSelectorOptions()} */}
            </Select>
          </div>
        </div>
        <div className={styles.greedColAddress}>
          <InputVsLabel
            label={'Адрес регистрации'}
            id="id-5"
            onChange={handlerAddressRegistration}
            inputVal={addressRegistration}
            isValid={true}
          />

          <InputVsLabel
            label={'Индекс регистрации'}
            id="id-4"
            onChange={handlerRegistrationIndex}
            inputVal={registrationIndex}
            isValid={true}
          />
          <Checkbox
            className={classNames('custom-check-box', styles.checkBoxWrap)}
            onChange={handleCheckBox}
          >
            <span className={styles.wrapLabelCheckBox}>
              Мой адрес совпадает
              <br /> с адресом регистрации
            </span>
          </Checkbox>
        </div>
        <div className={styles.greedColAddress}>
          <>
            <InputVsLabel
              label={'Адрес проживания'}
              id="id-3"
              onChange={handlerAddressResidence}
              inputVal={addressResidence}
              isValid={true}
            />
            <InputVsLabel
              label={'Индекс проживания'}
              id="id-4"
              onChange={handlerResidenceIndex}
              inputVal={residenceIndex}
              isValid={true}
            />
          </>
        </div>
      </div>
      <SpinOrButton />
    </>
  )
}
