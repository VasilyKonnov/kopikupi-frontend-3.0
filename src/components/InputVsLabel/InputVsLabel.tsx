import { TInputVsLabel } from './InputVsLabelTypes'
import classNames from 'classnames'
import styles from './InputVsLabel.module.scss'
import React from 'react'

export const InputVsLabel: React.FC<TInputVsLabel> = ({
  classLabel,
  classInput,
  label,
  id,
  onChange,
  type,
  inputVal,
  isOptional,
  isValid,
  validationText,
}) => {
  const classesLabel = classNames(classLabel ? classLabel : '', styles.label)
  const classesInput = classNames(classInput ? classInput : '', styles.input)
  const labelMark =
    isOptional !== undefined && isOptional ? (
      <span>&nbsp;&nbsp;</span>
    ) : (
      <span>* </span>
    )

  if (validationText) {
    return (
      <div className={styles.wrap}>
        <label htmlFor={id} className={classesLabel}>
          {inputVal && !isValid ? (
            <span className="greenCheckIcon"></span>
          ) : (
            labelMark
          )}
          {label}
        </label>
        <input
          value={inputVal}
          type={type ? type : 'text'}
          id={id}
          className={classesInput}
          onChange={onChange}
        />
        {isValid ? (
          <p style={{ color: '#E7732C', position: 'absolute' }}>
            {validationText}
          </p>
        ) : null}
      </div>
    )
  } else {
    return (
      <div className={styles.wrap}>
        <label htmlFor={id} className={classesLabel}>
          {inputVal ? <span className="greenCheckIcon"></span> : labelMark}
          {label}
        </label>
        <input
          value={inputVal}
          type={type ? type : 'text'}
          id={id}
          className={classesInput}
          onChange={onChange}
        />
      </div>
    )
  }
}
