'use client'

import { AUTH_STAGES } from './constants/auth'
import { useStage } from './context/StageContext'

export function Stepper() {
  const stageContext = useStage()
  const AuthStage = AUTH_STAGES[stageContext.currentStage]

  return <AuthStage />
}
