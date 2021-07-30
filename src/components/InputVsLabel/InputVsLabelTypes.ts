import React from 'react'

export type TInputVsLabel = {
  classLabel?: string
  classInput?: string
  label?: any
  id: string
  inputVal: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  isOptional?: boolean
  isValid: boolean
  validationText?: string
}
