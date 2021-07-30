import React from 'react'
import { TTextArea } from './TextAreaTypes'
import styles from './TextArea.module.scss'

export const TextArea: React.FC<TTextArea> = ({
  label,
  id,
  innerText,
  onChange,
}) => {
  return (
    <div className={styles.wrap}>
      <label htmlFor={id} className={styles.label}>
        {innerText !== null ? (
          <span className="greenCheckIcon" />
        ) : (
          <span>* </span>
        )}
        {label}
      </label>
      <textarea
        id={id}
        onChange={onChange}
        className={styles.textarea}
        value={innerText ? innerText : ''}
      />
    </div>
  )
}
