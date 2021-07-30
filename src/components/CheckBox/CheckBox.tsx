import React from 'react'
import { TCheckBox } from './CheckBoxTypes'
import styles from './CheckBox.module.scss'

export const CheckBox: React.FC<TCheckBox> = ({
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
        type="checkbox"
        id={htmlForChoice}
        name={nameWrap}
        value={value}
        onChange={onChange}
      />
      {labelTitle}
    </label>
  )
}
