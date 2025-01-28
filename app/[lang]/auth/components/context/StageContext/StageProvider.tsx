import type { Stage } from './StageContext'

import React from 'react'
import { StageContext } from './StageContext'

export interface StageProviderProps {
  children: React.ReactNode
  defaultStage: { currentStage?: Stage, completedStages?: Stage[] }
}

export function StageProvider({
  children,
  defaultStage: {
    currentStage: defaultCurrentStage = 'phoneForm',
    completedStages: defaultCompletedStages = [],
  },
}: StageProviderProps) {
  const [currentStage, setCurrentStage] = React.useState<Stage>(defaultCurrentStage)
  const [completedStages, setCompletedStages] = React.useState<Stage[]>(defaultCompletedStages)

  const set = (stage: Stage) => {
    setCurrentStage(stage)
    setCompletedStages([...completedStages, currentStage])
  }

  const back = () => {
    const lastStage = completedStages[completedStages.length - 1]
    setCurrentStage(lastStage)
    setCompletedStages(completedStages.slice(0, -1))
  }

  const value = React.useMemo(
    () => ({
      currentStage,
      completedStages,
      set,
      back,
    }),
    [currentStage, completedStages],
  )
  return <StageContext.Provider value={value}>{children}</StageContext.Provider>
}
