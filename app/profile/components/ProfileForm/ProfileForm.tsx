'use client'

import { ModalCancel, UserDataFields } from '@/src/components'
import { Button } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'

import { SelectLocale } from './components/SelectLocale/SelectLocale'
import { SelectTheme } from './components/SelectTheme/SelectTheme'
import { useProfileForm } from './hooks/useProfileForm'

export function ProfileForm() {
  const { t } = useLocale()
  const { state, functions } = useProfileForm()

  return (
    <>
      <h1 className="hidden pb-5 text-xl font-bold md:block">{t('profile')}</h1>
      <div className="flex max-w-[600px] flex-col gap-5">
        <div className="flex gap-3">
          <div className="w-full">
            <h3>{t('language')}</h3>
            <SelectLocale />
          </div>
          <div className="w-full">
            <h3>{t('theme')}</h3>
            <SelectTheme />
          </div>
        </div>
        <UserDataFields form={state.form} id="userDataFormID" onSubmit={functions.onSubmit} />
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
              className={`h-max w-full rounded-2xl bg-primary text-primary-foreground hover:bg-secondary-primary-dark py-4 text-base ${state.openModal && 'hidden'}`}
            >
              {t('buttonLeave')}
            </Button>
          </ModalCancel>
          <Button
            disabled={state.isLoading}
            form="userDataFormID"
            type="submit"
            className="text-foreground h-min w-full rounded-2xl border-2 border-solid border-text-light bg-background hover:bg-secondary py-4 text-base shadow-none"
          >
            {t('buttonUpdateData')}
          </Button>
        </div>
      </div>
    </>
  )
}
