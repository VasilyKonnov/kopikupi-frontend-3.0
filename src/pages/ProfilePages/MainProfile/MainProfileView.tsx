import React from 'react'
import styles from './MainProfile.module.scss'
import '../style.scss'
import { TMainView } from './MainProfileTypes'
import { SpinnerInCenterBlock } from '../../../components'

export const MainProfileView: React.FC<TMainView> = ({
  handleFillBtnClick,
  isRequestPending,
}) => {
  const SpinOrButton = () => {
    if (isRequestPending) {
      return <SpinnerInCenterBlock />
    } else {
      return (
        <button
          className={'button-primary' + ' ' + styles.btnCenter}
          onClick={handleFillBtnClick}
        >
          Заполнить
        </button>
      )
    }
  }

  return (
    <div className="container">
      <h2 className={styles.titleCenter}>У вас пока нет копилок :(</h2>
      <div className={styles.info}>
        <p className={styles.p}>
          Для того чтобы накапливать в сервисе и пользоваться всеми
          преимуществами сервиса, необходимо заполнить данные профиля:
        </p>
      </div>
      <div className={styles.stepsWrap}>
        <div className={styles.line}></div>
        <div className={styles.steps}>
          <div className={styles.stap}>
            <span className={styles.stapNumber}>1</span>
            <span className={styles.stapTitle}>Ваши ФИО</span>
          </div>
          <div className={styles.stap}>
            <span className={styles.stapNumber}>2</span>
            <span className={styles.stapTitle}>Паспортные данные</span>
          </div>
          <div className={styles.stap}>
            <span className={styles.stapNumber}>3</span>
            <span className={styles.stapTitle}>Прописка</span>
          </div>
        </div>
      </div>
      <p className={styles.p + ' ' + styles.beforeBtn}>
        Так мы сможем помочь вам копить по выбранному графику
      </p>
      <SpinOrButton />
      <p className={styles.p + ' ' + styles.afterBtn}>
        Нажимая кнопку “Заполнить”, я даю свое согласие на обработку
        персональных данных и соглашаюсь с условиями договора-оферты и политикой
        конфиденциальности
      </p>
      <a
        className={styles.agreement}
        href="/docs/КопиКупи - политика конфиденциальности.pdf"
        target="_blank"
      >
        Политика защиты персональных данных
      </a>
      <a
        className={styles.agreement}
        href="/docs/КопиКупи - Пользовательское соглашение.pdf"
        target="_blank"
      >
        Пользовательское соглашение
      </a>
    </div>
  )
}
