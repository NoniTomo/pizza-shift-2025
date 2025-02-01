'use client'

import { Main } from '@/app/(components)'
import { UserDataFields } from '@/src/components'
import { Button } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import { useStage } from '../../context/StageContext'
import { StageLine } from '../StageLine/StageLine'
import { useUserDataForm } from './hooks/useUserDataForm'

export function UserDataForm() {
  const { setModalState, numberCurrentStage } = useStage()
  const { t } = useLocale()
  const { state, functions } = useUserDataForm()

  return (
    <Main className="flex flex-col gap-3">
      <h1>
        <span>
          {t('stage')}
          {' '}
        </span>
        {numberCurrentStage}
      </h1>
      <StageLine className="w-0" />
      <h1 className="hidden pb-5 text-xl font-bold md:block">{t('formYourDataLongName')}</h1>
      <div className="flex max-w-[600px] flex-col gap-5">
        <UserDataFields form={state.form} id="userDataFormID" onSubmit={functions.onSubmit} />
        <div className="flex gap-3">
          <Button
            className="text-text-dark h-full hidden w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-base shadow-none sm:flex"
            onClick={() => setModalState(false)}
          >
            {t('buttonBack')}
          </Button>
          <Button
            form="userDataFormID"
            type="submit"
            className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light zbg-primary text-primary-foreground hover:bg-secondary-primary-dark"
          >
            {t('buttonNext')}
          </Button>
        </div>
      </div>
    </Main>
  )
}
