import React from 'react'
import { TRadioButton } from './RadioButtonTypes'
import styles from './RadioButton.module.scss'

export const RadioButton: React.FC<TRadioButton> = ({
  valueState,
  value,
  onChange,
  labelTitle,
  htmlForChoice,
  nameWrap,
}) => {
  return (
    <label
      htmlFor={htmlForChoice}
      className={
        value === valueState ? styles.radioButtonActive : styles.radioButton
      }
    >
      <span className={styles.simulator}></span>
      <input
        type="radio"
        id={htmlForChoice}
        name={nameWrap}
        value={value}
        onChange={onChange}
      />
      {labelTitle}
    </label>
  )
}
