'use client'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
            className="hover:grey-dark-filter hidden sm:block"
            priority
            src={CancelIcon}
            height={32}
            width={32}
            alt={t('buttonBack')}
          />
        )}
        className="flex flex-col  max-w-screen sm:max-w-lg bg-background p-5 sm:p-10 fixed bottom-0 left-0 right-0 rounded-t-3xl sm:rounded-3xl sm:relative "
      >
        <DialogTitle>
          <DialogClose />
        </DialogTitle>
        <div>
          <div className="flex w-full flex-col  gap-5">
            <DialogDescription className="flex w-full flex-col items-center justify-center gap-5 text-center">
              <Image priority src={QuestionImg} height={70} width={70} alt={text} />
              <span className="text-xl font-bold">{text}</span>
            </DialogDescription>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
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
