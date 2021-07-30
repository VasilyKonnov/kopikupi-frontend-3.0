import React from 'react'
import { TBlureFonType } from './BlureFonType'
import './BlureFon.css'

export const BlureFon: React.FC<TBlureFonType> = ({ toggle }) => {
  return <div className="background-blure" onClick={toggle}></div>
}
