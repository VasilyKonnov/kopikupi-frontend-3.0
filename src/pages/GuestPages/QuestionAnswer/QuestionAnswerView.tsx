import React from 'react'
import { Col, Row } from 'antd'
import imgPig from '../../../assets/images/pig.svg'
import { TQuestionAnswer } from './QuestionAnswerTypes'

const responsiveThreeCol = { xs: 32, sm: 12, md: 8, lg: 8 }
export const QuestionAnswerView: React.FC<TQuestionAnswer> = React.memo(
  ({ groupedQAEntries }) => {
    return (
      <div className="container">
        <img
          src={imgPig}
          className="question-answer-pig-icon"
          alt="Картинка копилки"
        />
        <h1 className="question-answer-h1">Вопрос-ответ</h1>
        <Row gutter={32} className="wrapper-question-answer">
          <Col {...responsiveThreeCol} className="question-answer-col">
            {groupedQAEntries[0]}
          </Col>

          <Col {...responsiveThreeCol} className="question-answer-col">
            {groupedQAEntries[1]}
          </Col>

          <Col {...responsiveThreeCol} className="question-answer-col">
            {groupedQAEntries[2]}
          </Col>
        </Row>
      </div>
    )
  },
)
