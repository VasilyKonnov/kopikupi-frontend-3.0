import React from 'react'
import { Spin } from 'antd'
import './SpinnerInCenterBlock.scss'

export const SpinnerInCenterBlock = () => {
  return (
    <div className="spinner-center-block">
      <Spin size="small" />
    </div>
  )
}
