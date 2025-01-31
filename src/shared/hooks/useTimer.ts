'use client'

import React from 'react'

export function useTimer() {
  const [countdown, setСountdown] = React.useState(0)
  const [timer, setTimer] = React.useState<NodeJS.Timeout>()
  const [isEnding, setIsEnding] = React.useState<boolean>(false)

  const start = (time: number) => {
    if (!timer) {
      setСountdown(time)
      setIsEnding(false)
      setTimer(setInterval(() => setСountdown(prevCountdown => prevCountdown - 1), 1000))
    }
  }

  const stop = () => {
    clearInterval(timer)
    setTimer(undefined)
    setIsEnding(true)
  }

  React.useEffect(() => {
    if (countdown <= 0)
      stop()
  }, [countdown])

  return {
    seconds: countdown,
    start,
    stop,
    isEnding,
  }
}
