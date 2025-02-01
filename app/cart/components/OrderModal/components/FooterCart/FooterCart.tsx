'use client'

import { Button } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import { useMediaQuery } from '@siberiacancode/reactuse'
import React from 'react'
import { useStage } from '../../context/StageContext'

export interface FooterCartProps {
  cost: number
}

export function FooterCart({ cost }: FooterCartProps) {
  const { setModalState } = useStage()
  const { t } = useLocale()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const onClick = () => setModalState(true)
  if (isDesktop) {
    return (
      <div className="text-inter flex items-center justify-between p-4">
        <p className="text-lg font-semibold">{t('orderCost', { cost: String(cost) })}</p>
        <Button
          onClick={onClick}
          className="h-max rounded-xl bg-primary px-16 py-4 text-lg hover:bg-secondary-primary-dark text-primary-foreground"
        >
          {t('buttonPlaceAnOrder')}
        </Button>
      </div>
    )
  }

  return (
    <div className="text-inter inset-shadow-lg fixed bottom-0 left-0 right-0 flex flex-col gap-2 rounded-t-xl bg-background p-4 pb-24 shadow-2xl shadow-black">
      <p className="text-lg font-extralight">{t('orderCost', { cost: String(cost) })}</p>
      <Button
        onClick={onClick}
        className="h-max rounded-xl bg-primary px-8 py-4 text-lg hover:bg-secondary-primary-dark text-primary-foreground"
      >
        {t('buttonPlaceAnOrder')}
      </Button>
    </div>
  )
}
