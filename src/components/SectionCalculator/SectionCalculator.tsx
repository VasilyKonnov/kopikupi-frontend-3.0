import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import { useHistory } from 'react-router'
import { SectionCalculatorView } from './SectionCalculatorView'
import Calculator from '../calculator/Calculator'
import { SelfAccumulationError } from '../calculator/errors'
import SliderValue from 'antd/lib/slider'
import { getResourceUrl } from '../../config'
import {
  MAX_KKA_PURCHASE_SUM,
  MAX_KKN_PURCHASE_SUM,
  MAX_KKA_INITIAL_PAYMENT,
  MAX_KKN_INITIAL_PAYMENT,
  MAX_KKA_MONTHLY_PAYMENT,
  MAX_KKN_MONTHLY_PAYMENT,
} from './SectionCalculatorConstants'
import PreloadWrapper from '../../pages/GuestPages/Main/PreloadWrapper'
import { TargetTypeEnum } from './SectionCalculatorTypes'

export const SectionCalculator = () => {
  const defaultMoneyBoxName = 'Новая копилка'

  const history = useHistory()
  // Входные параметры расчётов
  const [targetType, setTargetType] = useState<TargetTypeEnum>(
    TargetTypeEnum.KKN,
  )
  const [purchaseSum, setPurchaseSum] = useState<number | null>(700000)
  const [initialPayment, setInitialPayment] = useState<number | null>(70000)
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(10000)
  const [moneyBoxName, setMoneyBoxName] = useState<string>(defaultMoneyBoxName)
  // Результаты расчётов
  const [purchaseAcceleration, setPurchaseAcceleration] = useState<Date | null>(
    null,
  )
  const [accumulationDate, setAccumulationDate] = useState<Date | null>(null)
  const [periodAccumulation, setPeriodAccumulation] = useState('')
  const [purchaseDeadline, setPurchaseDeadline] = useState<null | string>(null)
  const [errorMessage, setErrorMessage] = useState('')
  // минимальное значение ежемесячного платежа, при котором необходимо показывать сообщение об ошибке
  const [showErrorMinVal, setShowErrorMinVal] = useState<number | null>(null)
  // предыдущее значение суммы покупки
  // нужна для того, чтобы сбросить showErrorMinVal, если вдруг сумма уменьшится
  const [prevPurchaseSum, setPrevPurchaseSum] = useState<any>(700000)
  const [prevInitialPayment, setPrevInitialPayment] = useState<any>(70000)

  const [firstPlaceKup, setFirstPlaceKup] = useState({ kkn: 0, kka: 0 })
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState<boolean>(
    false,
  )
  const moneyBoxParamsDelim = '|~|'

  /**
   * Все параметры копилки, входные и выходные, собираются в строку
   * @throws TypeError
   */
  function moneyBoxParamsToString(): string {
    if (accumulationDate !== null && purchaseAcceleration !== null) {
      let moneyBoxParams = ''
      moneyBoxParams += `targetType=${targetType}${moneyBoxParamsDelim}`
      moneyBoxParams += `purchaseSum=${purchaseSum}${moneyBoxParamsDelim}`
      moneyBoxParams += `initialPayment=${initialPayment}${moneyBoxParamsDelim}`
      moneyBoxParams += `monthlyPayment=${monthlyPayment}${moneyBoxParamsDelim}`
      moneyBoxParams += `periodAccumulation=${periodAccumulation}${moneyBoxParamsDelim}`
      moneyBoxParams += `accumulationDate=${accumulationDate.valueOf()}${moneyBoxParamsDelim}`
      moneyBoxParams += `purchaseDeadline=${purchaseDeadline}${moneyBoxParamsDelim}`
      moneyBoxParams += `purchaseAcceleration=${purchaseAcceleration.valueOf()}${moneyBoxParamsDelim}`

      let serializedMoneyBoxName
      if (moneyBoxName !== '') {
        serializedMoneyBoxName = moneyBoxName
      } else {
        serializedMoneyBoxName = defaultMoneyBoxName
      }
      moneyBoxParams += `name=${serializedMoneyBoxName}`

      return moneyBoxParams
    } else {
      throw new TypeError('Не указаны необходимые для сохранения параметры')
    }
  }

  // Обработка клика на кнопку завести копилку
  const onClickCreateMoneyBox = () => {
    try {
      const moneyBoxParams = moneyBoxParamsToString()
      localStorage.setItem('money-box-params', moneyBoxParams)
      history.push('/sign-up')
      message.warning(
        'Для заведения копилки необходимо зарегистрироваться и заплатить обязательные взносы или войти',
      )
    } catch (err) {
      if (err instanceof TypeError) {
        message.error(
          'Не указаны все необходимые для заведения копилки параметры!',
        )
      }
      console.error(err)
    }
  }

  const onChangeMoneyBoxName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMoneyBoxName = event.currentTarget.value
    setMoneyBoxName(newMoneyBoxName)
  }

  const toggleTargetTypeKkn = () => {
    setTargetType(TargetTypeEnum.KKN)
  }

  const toggleTargetTypeKka = () => {
    setTargetType(TargetTypeEnum.KKA)
  }

  const onChangePurchaseSum = (sum: number | null) => {
    setPrevPurchaseSum(purchaseSum)
    setPurchaseSum(sum)
  }

  const onChangeInitialPayment = (sum: number | null) => {
    setPrevInitialPayment(initialPayment)
    setInitialPayment(sum)
  }

  const onChangeInputPurchaseSum = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let sum: number | null = Number(event.currentTarget.value)
    if (targetType === TargetTypeEnum.KKN && sum > MAX_KKN_PURCHASE_SUM) {
      sum = MAX_KKN_PURCHASE_SUM
    }
    if (targetType === TargetTypeEnum.KKA && sum > MAX_KKA_PURCHASE_SUM) {
      sum = MAX_KKA_PURCHASE_SUM
    }
    if (sum === 0) {
      sum = null
    }
    onChangePurchaseSum(sum)
  }
  // @ts-ignore
  const onChangeSliderPurchaseSum = (value: typeof SliderValue) => {
    onChangePurchaseSum((value as unknown) as number)
  }

  const onChangeInputInitialPayment = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue: string = event.currentTarget.value
    let newInitPayment: number | null
    if (inputValue !== '') {
      newInitPayment = Number(inputValue)
      if (
        targetType === TargetTypeEnum.KKA &&
        newInitPayment > MAX_KKA_INITIAL_PAYMENT
      ) {
        newInitPayment = MAX_KKA_INITIAL_PAYMENT
      }
      if (
        targetType === TargetTypeEnum.KKN &&
        newInitPayment > MAX_KKN_INITIAL_PAYMENT
      ) {
        newInitPayment = MAX_KKN_INITIAL_PAYMENT
      }
    } else {
      newInitPayment = null
    }
    onChangeInitialPayment(newInitPayment)
  }

  const onChangeSliderInitialPayment = (value: typeof SliderValue) => {
    onChangeInitialPayment((value as unknown) as number)
  }

  const onChangeInputMonthlyPayment = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let sum: number | null = Number(event.currentTarget.value)
    if (targetType === TargetTypeEnum.KKN && sum > MAX_KKN_MONTHLY_PAYMENT) {
      sum = MAX_KKN_MONTHLY_PAYMENT
    }
    if (targetType === TargetTypeEnum.KKA && sum > MAX_KKA_MONTHLY_PAYMENT) {
      sum = MAX_KKA_MONTHLY_PAYMENT
    }
    if (sum === 0) {
      sum = null
    }
    // @ts-ignore
    onChangeMonthlyPayment(sum)
  }

  const onChangeMonthlyPayment = (value: typeof SliderValue | null) => {
    setMonthlyPayment((value as unknown) as number)
  }

  const getFirstPlaceKups = async () => {
    try {
      const response = await fetch(getResourceUrl('top-kups/'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      const data = await response.json()
      setFirstPlaceKup({ kkn: data.kkn, kka: data.kka })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!firstPlaceKup.kka && !firstPlaceKup.kkn) {
      getFirstPlaceKups()
    }
  }, [firstPlaceKup])

  useEffect(() => {
    if (targetType === TargetTypeEnum.KKA) {
      setPurchaseSum(350000)
      setInitialPayment(35000)
      setMonthlyPayment(5000)
    } else {
      setPurchaseSum(700000)
      setInitialPayment(70000)
      setMonthlyPayment(10000)
    }
  }, [targetType])

  useEffect(() => {
    try {
      if (
        purchaseSum !== null &&
        initialPayment !== null &&
        monthlyPayment !== null
      ) {
        const calculator: Calculator = new Calculator(
          purchaseSum,
          initialPayment,
          monthlyPayment,
          targetType === TargetTypeEnum.KKN
            ? firstPlaceKup.kkn
            : firstPlaceKup.kka,
        )
        setPurchaseAcceleration(calculator.purchaseAcceleration())
        setPurchaseDeadline(calculator.purchaseDeadline().toString())
        setAccumulationDate(calculator.moneyBox.accumulationDate())
        setPeriodAccumulation(
          calculator.moneyBox.accumulationPeriod().toString(),
        )
      } else {
        setPurchaseAcceleration(null)
        setAccumulationDate(null)
        setPeriodAccumulation('')
        setPurchaseDeadline(null)
      }
      // могут быть ситуации, в которых сообщение об ошибке "самостоятельного накопления"
      // то появляется, то исчезает.
      // чтобы не сбивать пользователя с толку, если один раз появилось это сообщение, то далее всё время его показываем
      if (
        showErrorMinVal === null ||
        (monthlyPayment !== null && monthlyPayment < showErrorMinVal) ||
        monthlyPayment === null
      ) {
        setErrorMessage('')
      }
      if (
        (purchaseSum !== null &&
          prevPurchaseSum !== null &&
          purchaseSum > prevPurchaseSum) ||
        (initialPayment !== null &&
          prevInitialPayment !== null &&
          initialPayment < prevInitialPayment) ||
        purchaseSum === null ||
        initialPayment === null
      ) {
        setShowErrorMinVal(null)
        // может получится ситуация,
        // что например первоначальный взнос уменьшился (initialPayment < prevInitialPayment),
        // затем ежемесячный платёж увеличился,
        // возникла ошибка,
        // затем ежемесячный платёж увеличился,
        // а initialPayment < prevInitialPayment по-прежнему,
        // и ошибка не будет показана, хотя должна
        if (purchaseSum !== null && purchaseSum !== prevPurchaseSum) {
          setPrevPurchaseSum(purchaseSum)
        } else if (
          initialPayment !== null &&
          initialPayment !== prevInitialPayment
        ) {
          setPrevInitialPayment(initialPayment)
        }
      }
    } catch (error) {
      setErrorMessage(error.message)
      if (error instanceof SelfAccumulationError) {
        if (
          showErrorMinVal === null ||
          (monthlyPayment !== null && monthlyPayment < showErrorMinVal)
        ) {
          setShowErrorMinVal(monthlyPayment)
        }
      } else {
        setShowErrorMinVal(null)
      }
    }
  }, [purchaseSum, initialPayment, monthlyPayment, firstPlaceKup])

  // if (!firstPlaceKup.kka && !firstPlaceKup.kkn) {
  //   return <PreloadWrapper />
  // }
  return (
    <SectionCalculatorView
      errorMessage={errorMessage}
      purchaseSum={purchaseSum}
      initialPayment={initialPayment}
      monthlyPayment={monthlyPayment}
      moneyBoxName={moneyBoxName}
      onChangeSliderPurchaseSum={onChangeSliderPurchaseSum}
      onChangeSliderInitialPayment={onChangeSliderInitialPayment}
      onChangeMonthlyPayment={onChangeMonthlyPayment}
      targetType={targetType}
      toggleTargetTypeKkn={toggleTargetTypeKkn}
      toggleTargetTypeKka={toggleTargetTypeKka}
      onChangeInputPurchaseSum={onChangeInputPurchaseSum}
      onChangeInputInitialPayment={onChangeInputInitialPayment}
      onChangeInputMonthlyPayment={onChangeInputMonthlyPayment}
      onChangeMoneyBoxName={onChangeMoneyBoxName}
      accumulationDate={accumulationDate}
      periodAccumulation={periodAccumulation}
      purchaseAcceleration={purchaseAcceleration}
      purchaseDeadline={purchaseDeadline}
      isQuestionModalVisible={isQuestionModalVisible}
      setIsQuestionModalVisible={setIsQuestionModalVisible}
      onClickCreateMoneyBox={onClickCreateMoneyBox}
    />
  )
}
