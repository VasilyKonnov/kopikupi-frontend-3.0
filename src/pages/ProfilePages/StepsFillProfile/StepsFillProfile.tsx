import React, { useEffect, useState } from 'react'
import { StepsFillProfileView } from './StepsFillProfileView'
import { StepOne } from './Tabs/StepOne'
import {
  TCompletedSteps,
  TFullProfileInfo,
  TSaveProfileRequestStatus,
  TSteps,
  TStepsFillProfile,
} from './StepsFillProfileTypes'
import { StepTwo } from './Tabs/StepTwo'
import { StepThree } from './Tabs/StepThree'
import { Modal } from 'antd'
import complete from '../../../assets/images/complete.png'
import styles from './StepsFillProfile.module.scss'
// import { connect } from 'react-redux'
// import {
//   fullProfileInfoRequested,
//   saveFullProfileInfoDeactivated,
//   saveFullProfileInfoRequested,
//   saveFullProfileInfoSucceeded,
// } from '~/redux/actions/actions'
// import { Action, Dispatch } from 'redux'
import { useHistory } from 'react-router'

const initCompletedSteps: TCompletedSteps = {
  fio: false,
  passportData: false,
  address: false,
}

export const StepsFillProfile: React.FC<TStepsFillProfile> = ({
  userProfile,
  requestSetFullProfileInfo,
  deactivateSetFullProfileInfoRequest,
  requestFullProfileInfo,
}) => {
  const history = useHistory()
  const [completedSteps, setCompletedSteps] = useState<TCompletedSteps>(
    initCompletedSteps,
  )
  const [currentStep, setCurrentStep] = useState<TSteps>(TSteps.Fio)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // текущее состояние значений в полях ввода компонента, не сохранённое в API
  const [fullProfileInfo, setFullProfileInfo] = useState<TFullProfileInfo>(
    userProfile,
  )

  const handleNextStep = () => {
    switch (currentStep) {
      case TSteps.Fio:
        // saveFullProfileInfoSucceeded(fullProfileInfo)
        setCurrentStep(TSteps.PassportData)
        break
      case TSteps.PassportData:
        setCurrentStep(TSteps.Address)
        break
      case TSteps.Address:
        break
    }
  }

  // useEffect(() => {
  //   // phone - обязательный при регистрации параметр,
  //   // поэтому при получении данных из API phone точно должен быть
  //   if (userProfile.phone !== null) {
  //     if (userProfile.requestStatus === TSaveProfileRequestStatus.SUCCEED) {
  //       showModal()
  //     }
  //     setFullProfileInfo(userProfile)
  //   } else {
  //     requestFullProfileInfo()
  //   }
  // }, [userProfile])

  const handleSave = () => {
    requestSetFullProfileInfo(fullProfileInfo)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    deactivateSetFullProfileInfoRequest()
    history.push('/')
  }

  return (
    <StepsFillProfileView
      completedSteps={completedSteps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    >
      <>
        {currentStep === TSteps.Fio && (
          <StepOne
            handleNextStep={handleNextStep}
            setCompletedSteps={setCompletedSteps}
            completedSteps={completedSteps}
            fullProfileInfo={fullProfileInfo}
            setFullProfileInfo={setFullProfileInfo}
          />
        )}
        {currentStep === TSteps.PassportData && (
          <StepTwo
            handleNextStep={handleNextStep}
            setCompletedSteps={setCompletedSteps}
            completedSteps={completedSteps}
            fullProfileInfo={fullProfileInfo}
            setFullProfileInfo={setFullProfileInfo}
          />
        )}
        {currentStep === TSteps.Address && (
          <StepThree
            setCompletedSteps={setCompletedSteps}
            completedSteps={completedSteps}
            fullProfileInfo={fullProfileInfo}
            setFullProfileInfo={setFullProfileInfo}
            handleSave={handleSave}
            // requestStatus={userProfile.requestStatus}
          />
        )}
      </>
      <Modal
        visible={isModalOpen}
        onCancel={closeModal}
        footer={false}
        width={800}
      >
        <div className={styles.modalComplete}>
          <h3>Заполнение профиля</h3>
          <p className={styles.beforeImg}>Ура! Вы всё заполнили</p>
          <img src={complete} alt="Ура! Вы все заполнили" />
          <p className={styles.afterImg}>
            Теперь мы сможем помочь вам накопить на что-то важное
          </p>
        </div>
      </Modal>
    </StepsFillProfileView>
  )
}

// const mapStateToProps = (state: any) => {
//   return {
//     userProfile: state.userProfile,
//   }
// }

// const mapStateToDispatch = (dispatch: Dispatch<Action>) => ({
//   requestSetFullProfileInfo: (fullProfileInfo: TFullProfileInfo) =>
//     dispatch(saveFullProfileInfoRequested(fullProfileInfo)),
//   deactivateSetFullProfileInfoRequest: () =>
//     dispatch(saveFullProfileInfoDeactivated()),
//   requestFullProfileInfo: () => dispatch(fullProfileInfoRequested()),
// })

// export const ConnectedStepsFillProfile = connect(
//   mapStateToProps,
//   mapStateToDispatch,
// )(StepsFillProfile)
