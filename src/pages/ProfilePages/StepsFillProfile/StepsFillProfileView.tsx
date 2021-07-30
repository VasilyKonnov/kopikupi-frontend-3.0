import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { TSteps, TStepsFillProfileView } from './StepsFillProfileTypes'
import styles from './StepsFillProfile.module.scss'

export const StepsFillProfileView: React.FC<TStepsFillProfileView> = ({
  children,
  completedSteps,
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="container">
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Заполнение профиля</h1>
        <Link to="restore-password">Изменить пароль</Link>
      </div>
      <p className={styles.notification}>
        Пройдите несколько шагов, чтобы пользоваться всеми преимуществами
        сервиса!
      </p>
      <div className={styles.stepsWrap}>
        <div className={styles.line}></div>
        <div className={styles.steps}>
          <div
            className={classNames(
              styles.step,
              completedSteps.fio && styles.stepComplete,
              currentStep === TSteps.Fio && styles.stepActive,
            )}
          >
            <span className={styles.stepTitle}>
              Ваши <br />
              ФИО
            </span>
            {completedSteps.fio ? (
              <span
                onClick={() => setCurrentStep(TSteps.Fio)}
                className={classNames(styles.stepNumber, styles.isPointer)}
              >
                1 шаг
              </span>
            ) : (
              <span className={styles.stepNumber}>1 шаг</span>
            )}
          </div>
          <div
            className={classNames(
              styles.step,
              completedSteps.passportData && styles.stepComplete,
              currentStep === TSteps.PassportData && styles.stepActive,
            )}
          >
            <span className={styles.stepTitle}>
              Паспортные <br />
              данные
            </span>

            {completedSteps.passportData ? (
              <span
                onClick={() => setCurrentStep(TSteps.PassportData)}
                className={classNames(styles.stepNumber, styles.isPointer)}
              >
                2 шаг
              </span>
            ) : (
              <span className={styles.stepNumber}>2 шаг</span>
            )}
          </div>
          <div
            className={classNames(
              styles.step,
              completedSteps.address && styles.stepComplete,
              currentStep === TSteps.Address && styles.stepActive,
            )}
          >
            <span className={styles.stepTitle}>Прописка</span>
            {completedSteps.address ? (
              <span
                onClick={() => setCurrentStep(TSteps.Address)}
                className={classNames(styles.stepNumber, styles.isPointer)}
              >
                3 шаг
              </span>
            ) : (
              <span className={styles.stepNumber}>3 шаг</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.wrapTabs}>{children}</div>
      <Link to="restore-password" className={styles.changePass}>
        Изменить пароль
      </Link>
    </div>
  )
}
