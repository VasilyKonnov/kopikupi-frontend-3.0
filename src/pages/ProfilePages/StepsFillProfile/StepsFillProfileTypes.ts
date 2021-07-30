export type TStepOne = {
  handleNextStep: () => void
  setCompletedSteps: (val: TCompletedSteps) => void
  completedSteps: TCompletedSteps
  fullProfileInfo: TFullProfileInfo
  setFullProfileInfo: (val: TFullProfileInfo) => void
}

export type TStepTwo = {
  handleNextStep: () => void
  setCompletedSteps: (val: TCompletedSteps) => void
  completedSteps: TCompletedSteps
  fullProfileInfo: TFullProfileInfo
  setFullProfileInfo: (val: TFullProfileInfo) => void
}

export type TStepThree = {
  setCompletedSteps: (val: TCompletedSteps) => void
  completedSteps: TCompletedSteps
  fullProfileInfo: TFullProfileInfo
  setFullProfileInfo: (val: TFullProfileInfo) => void
  handleSave: () => void
  requestStatus?: TSaveProfileRequestStatus
}

export type TCompletedSteps = {
  fio: boolean
  passportData: boolean
  address: boolean
}

export enum TSteps {
  Fio,
  PassportData,
  Address,
}

export type TStepsFillProfileView = {
  children: JSX.Element[] | JSX.Element
  completedSteps: TCompletedSteps
  currentStep: TSteps
  setCurrentStep: (val: TSteps) => void
}

export type TStepsFillProfile = {
  userProfile: TFullProfileInfo
  requestSetFullProfileInfo: (val: TFullProfileInfo) => void
  saveFullProfileInfoSucceeded: (val: TFullProfileInfo) => void
  // помечаем, что запрос на сохранение профиля (полной информации о профиле) снова стал не активным
  deactivateSetFullProfileInfoRequest: () => void
  requestFullProfileInfo: () => void
}

export enum TSaveProfileRequestStatus {
  INACTIVE,
  PENDING,
  SUCCEED,
}

/**
 * Данные о профиле пользователя
 */
export type TFullProfileInfo = {
  email: string | null
  phone: string | null
  lastName: string | null
  firstName: string | null
  middleName: string | null
  birthday: string | null
  gender: string | null

  passportSeries: string | null
  passportNumber: string | null
  // кем выдан паспорт
  passportIssuingAuthority: string | null
  passportIssuingDate: string | null
  passportSubdivisionCode: string | null
  INN: string | null

  regAddress: string | null
  regAddressIndex: string | null
  citizenship: string | null
  countryLivingIn: string | null
  regionLivingIn: string | null
  factAddress: string | null
  factAddressIndex: string | null
  timezone: string | null
  requestStatus: TSaveProfileRequestStatus
}
