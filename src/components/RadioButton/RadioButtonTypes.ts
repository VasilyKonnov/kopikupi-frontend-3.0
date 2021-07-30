export type TRadioButton = {
  valueState: string | number
  value: string | number
  onChange: (e: { target: { value: any } }) => void
  labelTitle: string
  htmlForChoice: string
  nameWrap: string
}
