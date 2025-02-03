'use client'

import { Main } from '@/app/(components)'
import { AddressSuggestionsSSR } from '@/src/components'
import { Button, TextField } from '@/src/shared/components'
import { filterInputAlphabet, filterInputEmail, filterInputOnlyNumbers, validateAlphabetAndSpecialSymbols, validateEmail, validateMask } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { Controller } from 'react-hook-form'
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
      <h1 className="hidden pb-5 text-xl font-bold md:block">{t('form.yourData.name.long')}</h1>
      <div className="flex max-w-[600px] flex-col gap-5">
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
          <Controller
            control={state.form.control}
            rules={{
              required: t('rule.required'),
            }}
            name="city"
            render={({
              field: { onChange, value },
            }) => (
              <AddressSuggestionsSSR
                onChange={onChange}
                value={value}
                defaultQuery={state.form.getValues('city')}
                error={state.form.formState.errors.city?.message}
              />
            )}
          >
          </Controller>
        </form>
        <div className="flex gap-3">
          <Button
            className="text-text-dark h-full hidden w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-base shadow-none sm:flex"
            onClick={() => setModalState(false)}
          >
            {t('button.back')}
          </Button>
          <Button
            form="userDataFormID"
            type="submit"
            className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light zbg-primary text-primary-foreground hover:bg-secondary-primary-dark"
          >
            {t('button.next')}
          </Button>
        </div>
      </div>
    </Main>
  )
}
