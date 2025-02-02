'use client'

import { Button, TextField } from '@/src/shared/components'
import { filterInputOnlyNumbers } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { useOtpForm } from './hooks/useOtpForm'

export function OtpForm() {
  const { t } = useLocale()
  const { state, functions } = useOtpForm()

  return (
    <>
      <h1 className="pb-5 text-xl font-bold hidden sm:block">{t('auth')}</h1>
      <p className="font-inter text-base text-text">{t('page.auth.otps.description')}</p>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <TextField
          id="phone"
          register={state.form.register('phone')}
          placeholder={t('field.phone.placeholder')}
          error={state.form.formState.errors.phone?.message}
          isDisabled={true}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <TextField
          id="otp"
          register={state.form.register('otp')}
          placeholder={t('field.otps.placeholder')}
          error={state.form.formState.errors.phone?.message}
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <Button type="submit" className="h-max w-full rounded-2xl bg-primary py-4 hover:bg-secondary-primary-dark text-primary-foreground">{t('button.logIn')}</Button>
      </form>
      {!!state.isEnding && (
        <Button
          onClick={() => functions.handleGetOtp()}
          className="font-inter text-base text-text bg-transparent font-bold hover:underline shadow-none border-none"
        >
          {t('button.getOtp')}
        </Button>
      )}
      {!state.isEnding && (
        <p
          className="font-inter text-sm text-secondary-secondary-2"
        >
          {t('page.auth.delayMessage', { seconds: String(state.seconds) })}
        </p>
      )}
    </>
  )
}
