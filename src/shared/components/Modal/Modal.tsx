'use client'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import CancelIcon from '@/static/icons/cancel.svg'

import QuestionImg from '@/static/images/question.png'
import Image from 'next/image'
import React from 'react'

export interface ModalCancelProps {
  open: boolean
  setOpen: (value: boolean) => void
  children: React.ReactNode
  text: string
  buttonTop: {
    action: () => void
    text: string
  }
  buttonBottom: {
    action: () => void
    text: string
  }
}

export function ModalCancel({
  open,
  setOpen,
  children,
  text,
  buttonTop,
  buttonBottom,
}: ModalCancelProps) {
  const { t } = useLocale()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        childrenCloseButton={(
          <Image
            className="hover:grey-dark-filter"
            priority
            src={CancelIcon}
            height={32}
            width={32}
            alt={t('buttonBack')}
          />
        )}
        className="flex flex-col gap-0 bg-background p-10"
      >
        <DialogTitle>
          <DialogClose />
        </DialogTitle>
        <div>
          <div className="flex w-full flex-col items-center justify-center gap-10 text-center">
            <Image priority src={QuestionImg} height={70} width={70} alt={text} />
            <p className="text-xl font-bold">{text}</p>
            <div className="flex w-full flex-col gap-5 sm:flex-row">
              <Button
                onClick={buttonTop.action}
                className="text-text-dark flex h-min w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-base shadow-none"
              >
                {buttonTop.text}
              </Button>
              <Button
                onClick={buttonBottom.action}
                className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light"
              >
                {buttonBottom.text}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
