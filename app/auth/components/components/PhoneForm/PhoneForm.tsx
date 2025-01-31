'use client'

import { Button, TextField } from '@/src/shared/components'
import { filterInputOnlyNumbers } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { usePhoneForm } from './hooks/usePhoneForm'

export function PhoneForm() {
  const { t } = useLocale()
  const { state, functions } = usePhoneForm()

  return (
    <>
      <h1 className="pb-5 text-xl font-bold hidden sm:block">{t('auth')}</h1>
      <p className="font-inter text-base text-text">{t('formAuthPhoneDescription')}</p>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <TextField
          id="phone"
          register={state.form.register('phone', {
            required: t('formRuleRequired'),
          })}
          placeholder={t('formAuthPhonePlaceholder')}
          error={state.form.formState.errors.phone?.message}
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <Button type="submit" className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light">{t('buttonNext')}</Button>
      </form>
    </>
  )
}
