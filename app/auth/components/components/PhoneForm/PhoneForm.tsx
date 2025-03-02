'use client'

import { Button, TextField } from '@/src/shared/components'
import { filterInputOnlyNumbers, validateMask } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { usePhoneForm } from './hooks/usePhoneForm'

export function PhoneForm() {
  const { t } = useLocale()
  const { state, functions } = usePhoneForm()

  return (
    <>
      <h1 className="pb-5 text-xl font-bold hidden sm:block">{t('auth')}</h1>
      <p className="font-inter text-base text-text">{t('page.auth.phone.description')}</p>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <TextField
          id="phone"
          register={state.form.register('phone', '+7 999 999 99 99', {
            required: t('rule.required'),
            validate: value => validateMask(value) ? true : t('rule.isMobilePhone'),
          })}
          type="email"
          placeholder={t('field.phone.placeholder')}
          error={state.form.formState.errors.phone?.message}
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <Button type="submit" className="h-max w-full rounded-2xl bg-primary py-4 text-base hover:bg-secondary-primary-dark text-primary-foreground">{t('button.next')}</Button>
      </form>
    </>
  )
}
