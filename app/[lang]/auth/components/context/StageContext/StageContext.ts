import React from 'react'

export type Stage = 'otpForm' | 'phoneForm'

export const COUNT_STAGE = 2

export interface StageContextProps {
  currentStage: Stage
  set: (stage: Stage) => void
  back: () => void
}

export const StageContext = React.createContext<StageContextProps>({
  currentStage: 'phoneForm',
  set: () => {},
  back: () => {},
})
