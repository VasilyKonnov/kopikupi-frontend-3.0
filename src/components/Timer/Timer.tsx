import React, { useEffect, useState } from 'react'
import { formatForTimer } from '../../util/common'
import './Timer.css'
import { TTimerProps } from './TimerTypes'

export const Timer: React.FC<TTimerProps> = ({ setIsSendPassAgain }) => {
  const [counter, setCounter] = useState(startingPoint)

  useEffect(() => {
    let timer: number
    if (counter > 0) {
      timer = window.setTimeout(
        () => setCounter((counter: number) => counter - 1),
        1000,
      )
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [counter])

  useEffect(() => {
    if (counter === 0) {
      setIsSendPassAgain(false)
    } else {
      setIsSendPassAgain(true)
    }
  }, [counter])

  return (
    <div className="timer-wrapper" aria-label="timer-wrap">
      <span>{formatForTimer(counter)}</span>
    </div>
  )
}

export const startingPoint = 180
