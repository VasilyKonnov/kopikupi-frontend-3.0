import React from 'react'
import { DatePicker } from 'antd'
import { TDatePicker } from './DatePickerTypes'
import styles from './DatePicker.module.scss'
import moment from 'moment'

export const CustomDatePicker: React.FC<TDatePicker> = ({
  onChange,
  date,
  label,
}) => {
  return (
    <div className={styles.datePickerWrap}>
      <p className={styles.datePickerLabel}>
        {date ? <span className="greenCheckIcon"></span> : '* '}
        {label}
      </p>
      <DatePicker
        className={styles.datePicker}
        onChange={onChange}
        placeholder={'дд.мм.гггг'}
        format="DD.MM.YYYY"
        defaultValue={date ? moment(date, 'DD.MM.YYYY') : undefined}
      />
    </div>
  )
}
