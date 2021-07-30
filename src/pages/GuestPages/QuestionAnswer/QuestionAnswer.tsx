import React, { useMemo, useState } from 'react'
import { QuestionAnswerView } from './QuestionAnswerView'
import { Modal } from 'antd'
import { constQuestionAnswer as questionAnswerData } from './constQuestionAnswer'
import { QuestionAnswerEntryView } from './QuestionAnswerEntryView'
import { groupArray } from '../../../util/common'
import './QuestionAnswer.css'

export const QuestionAnswer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const showModal = (answer: string) => {
    setAnswer(answer)
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const groupedQAEntries = useMemo(() => {
    const qaEntries = questionAnswerData.map((entry, id) => {
      return (
        <QuestionAnswerEntryView key={id} showModal={showModal} entry={entry} />
      )
    })
    return groupArray(qaEntries, 3)
  }, [questionAnswerData])

  return (
    <>
      <QuestionAnswerView groupedQAEntries={groupedQAEntries} />
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={false}>
        <div className="question-answer-modal-text">{answer}</div>
      </Modal>
    </>
  )
}
