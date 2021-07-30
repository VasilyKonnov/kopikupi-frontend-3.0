import React from 'react'

import { TQuestionAnswerEntry } from './QuestionAnswerTypes'
import imgIcon from '../../../assets/images/iconQuestion.svg'

/**
 * Компонент "Представление вхождения в раздел вопрос-ответ"
 * @param showModal
 * @param question
 * @constructor
 */
export const QuestionAnswerEntryView: React.FC<TQuestionAnswerEntry> = ({
  showModal,
  entry,
}) => {
  return (
    <p aria-label="label-question" onClick={() => showModal(entry.answer)}>
      <img src={imgIcon} alt="иконка для списка" />
      <span>{entry.question}</span>
    </p>
  )
}
