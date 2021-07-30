import SliderValue from 'antd/lib/slider'
import React from 'react'

export enum TargetTypeEnum {
  KKN = 1,
  KKA = 2,
}

export type TSectionCalculatorProps = {
  errorMessage: string
  purchaseSum: number | null
  initialPayment: number | null
  monthlyPayment: number | null
  moneyBoxName: string
  onChangeSliderPurchaseSum: (value: typeof SliderValue) => void
  onChangeSliderInitialPayment: (value: typeof SliderValue) => void
  onChangeMonthlyPayment: (value: typeof SliderValue) => void
  targetType: TargetTypeEnum
  toggleTargetTypeKkn: () => void
  toggleTargetTypeKka: () => void
  onChangeInputPurchaseSum: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeInputInitialPayment: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onChangeInputMonthlyPayment: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
  onChangeMoneyBoxName: (event: React.ChangeEvent<HTMLInputElement>) => void
  // дата, когда вся сумма будет накоплена
  accumulationDate: Date | null
  periodAccumulation: string | number | Date
  purchaseAcceleration: Date | null
  // расчётный срок покупки
  purchaseDeadline: null | string
  // показывать либо же нет модальное кокно
  isQuestionModalVisible: boolean
  setIsQuestionModalVisible: (isQuestionModalVisible: boolean) => void
  onClickCreateMoneyBox: () => void
}
