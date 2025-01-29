'use client'

import { Button, TextField } from '@/src/shared/components'
import { filterInputOnlyNumbers } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { useOtpForm } from './hooks/useOtpForm'

export function OtpForm() {
  const { t } = useLocale()
  const { state, functions } = useOtpForm()

  return (
    <div className="flex flex-col gap-5">
      <h1 className="pb-5 text-xl font-bold ">{t('auth')}</h1>
      <p className="font-inter text-base text-text">{t('formAuthOtpsDescription')}</p>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <TextField
          id="phone"
          register={state.form.register('phone')}
          placeholder={t('formAuthPhonePlaceholder')}
          error={state.form.formState.errors.phone?.message}
          isDisabled={true}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <TextField
          id="otp"
          register={state.form.register('otp')}
          placeholder={t('formAuthOtpsPlaceholder')}
          error={state.form.formState.errors.phone?.message}
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <Button type="submit" className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light">{t('buttonLogIn')}</Button>
      </form>
      {!!state.isEnding && <Button onClick={() => functions.handleGetOtp()} className="font-inter text-base text-text bg-background font-bold hover:underline shadow-none border-none">{t('buttonGetOtp')}</Button>}
      {!state.isEnding && <p className="font-inter text-sm text-secondary">{t('formAuthOtpsDelayMessage', { seconds: String(state.seconds) })}</p>}
    </div>
  )
}
