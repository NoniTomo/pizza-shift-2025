'use client'

import { ModalCancel } from '@/src/components'
import { Button, TextField } from '@/src/shared/components'
import { filterInputAlphabet, filterInputEmail, filterInputOnlyNumbers, validateAlphabetAndSpecialSymbols, validateEmail, validateMask } from '@/src/shared/helpers'
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
        <form id="userDataFormID" className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
          <TextField
            id="middlename"
            register={state.form.register('middlename', '', {
              required: t('rule.required'),
              maxLength: { value: 60, message: t('rule.maxLength', { length: String(String(60)) }) },
              validate: validateAlphabetAndSpecialSymbols,
            })}
            placeholder={t('field.middlename')}
            error={state.form.formState.errors.middlename?.message}
            label={t('field.middlename')}
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputAlphabet}
            onPaste={filterInputAlphabet}
          />
          <TextField
            id="firstname"
            register={state.form.register('firstname', '', {
              required: t('rule.required'),
              maxLength: { value: 60, message: t('rule.maxLength', { length: String(String(60)) }) },
              validate: validateAlphabetAndSpecialSymbols,
            })}
            placeholder={t('field.firstname')}
            error={state.form.formState.errors.firstname?.message}
            label={t('field.firstname')}
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputAlphabet}
            onPaste={filterInputAlphabet}
          />
          <TextField
            id="lastname"
            register={state.form.register('lastname', '', {
              required: t('rule.required'),
              maxLength: { value: 60, message: t('rule.maxLength', { length: String(60) }) },
              validate: value =>
                value.split('').length > 0 ? validateAlphabetAndSpecialSymbols(value) : true,
            })}
            placeholder={t('field.lastname')}
            error={state.form.formState.errors.lastname?.message}
            label={t('field.lastname')}
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputAlphabet}
            onPaste={filterInputAlphabet}
          />
          <TextField
            id="phone"
            register={state.form.register('phone', '+7 999 999 99 99', {
              required: t('rule.required'),
              validate: value => validateMask(value) ? true : t('rule.isMobilePhone'),
            })}
            placeholder={t('field.phone.placeholder')}
            error={state.form.formState.errors.phone?.message}
            label={t('field.phone')}
            isDisabled={true}
            isRequired={true}
            onKeyDown={filterInputOnlyNumbers}
            onPaste={filterInputOnlyNumbers}
          />
          <TextField
            id="email"
            register={state.form.register('email', '', {
              validate: value => value.split('').length > 0 ? validateEmail(value) : true,
            })}
            placeholder={t('field.email.placeholder')}
            error={state.form.formState.errors.email?.message}
            label={t('field.email')}
            isDisabled={false}
            isRequired={false}
            onKeyDown={filterInputEmail}
            onPaste={filterInputEmail}
          />
          <TextField
            id="city"
            register={state.form.register('city', '', {
              required: t('rule.required'),
              maxLength: { value: 100, message: t('rule.maxLength', { length: String(60) }) },
            })}
            placeholder={t('field.city.placeholder')}
            error={state.form.formState.errors.city?.message}
            label={t('field.city')}
            isDisabled={false}
            isRequired={true}
          />
        </form>
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <ModalCancel
            open={state.openModal}
            setOpen={functions.setOpenModal}
            text={t('page.profile.leaveQuestion')}
            buttonBottom={{ action: () => functions.setOpenModal(false), text: t('button.cancel') }}
            buttonTop={{ action: functions.onLeave, text: t('button.leave') }}
          >
            <Button
              onClick={() => functions.setOpenModal(true)}
              className={`h-max w-full rounded-2xl bg-primary text-primary-foreground hover:bg-secondary-primary-dark py-4 text-base ${state.openModal && 'hidden'}`}
            >
              {t('button.leave')}
            </Button>
          </ModalCancel>
          <Button
            disabled={state.isLoading}
            form="userDataFormID"
            type="submit"
            className="text-foreground h-min w-full rounded-2xl border-2 border-solid border-text-light bg-background hover:bg-secondary py-4 text-base shadow-none"
          >
            {t('button.updateData')}
          </Button>
        </div>
      </div>
    </>
  )
}
