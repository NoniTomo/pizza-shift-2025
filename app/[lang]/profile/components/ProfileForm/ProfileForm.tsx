'use client'

import { Button, UserData } from '@/src/shared/components'
import { ModalCancel } from '@/src/shared/components/Modal/Modal'
import { useLocale } from '@/src/shared/hooks'

import { useProfileForm } from './hooks/useProfileForm'

export function ProfileForm() {
  const { t } = useLocale()
  const { state, functions } = useProfileForm()

  return (
    <>
      <h1 className="hidden pb-5 text-xl font-bold md:block">{t('profile')}</h1>
      <div className="flex max-w-[600px] flex-col gap-5">
        <UserData form={state.form} id="userDataFormID" onSubmit={functions.onSubmit} />
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <ModalCancel
            open={state.openModal}
            setOpen={functions.setOpenModal}
            text={t('leaveModalQuestion')}
            buttonBottom={{ action: () => functions.setOpenModal(false), text: t('buttonCancel') }}
            buttonTop={{ action: functions.onLeave, text: t('buttonLeave') }}
          >
            <Button
              onClick={() => functions.setOpenModal(true)}
              className={`h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light ${state.openModal && 'hidden'}`}
            >
              {t('buttonLeave')}
            </Button>
          </ModalCancel>
          <Button
            disabled={state.isLoading}
            form="userDataFormID"
            type="submit"
            className="text-text-dark h-min w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-base shadow-none"
          >
            {t('buttonUpdateData')}
          </Button>
        </div>
      </div>
    </>
  )
}
