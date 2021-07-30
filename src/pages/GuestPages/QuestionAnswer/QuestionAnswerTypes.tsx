export type TQuestionAnswer = {
  groupedQAEntries: Array<Array<any>>
}

export type TQuestionAnswerEntry = {
  showModal: (answer: string) => void
  entry: {
    question: string
    answer: string
  }
}