import { CREATE_ORDER_STAGES, HEADER_STAGES } from './constants/constants'
import { useStage } from './context/StageContext'

export function Stepper() {
  const stageContext = useStage()
  const CreateOrderStage = CREATE_ORDER_STAGES[stageContext.currentStage]
  const HeaderStage = HEADER_STAGES[stageContext.currentStage]

  return (
    <>
      <HeaderStage />
      <CreateOrderStage />
    </>
  )
}
