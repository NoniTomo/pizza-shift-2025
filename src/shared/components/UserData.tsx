import type { UseFormReturn } from 'react-hook-form'
import {
  filterInputAlphabet,
  filterInputCity,
  filterInputEmail,
  filterInputOnlyNumbers,
  validateAlphabetAndSpecialSymbols,
  validateEmail,
} from '../helpers'
import { useLocale } from '../hooks'
import { TextField } from './TextField'

export interface UserDataFormProps {
  form: UseFormReturn<User, any, undefined>
  onSubmit: (data: User) => void
  id: string
}

export function UserData({ form, onSubmit, id }: UserDataFormProps) {
  const { t } = useLocale()
  return (
    <form id={id} className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <TextField
        id="firstname"
        register={form.register('firstname', {
          required: t('formRuleRequired'),
          maxLength: { value: 60, message: 'Максимум один символ' },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder="Иван"
        error={form.formState.errors.firstname?.message}
        label={t('formYourDataFirstname')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
        onPaste={filterInputAlphabet}
      />
      <TextField
        id="middlename"
        register={form.register('middlename', {
          required: t('formRuleRequired'),
          maxLength: { value: 60, message: t('formRuleMaxLength', { length: String(String(60)) }) },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder={t('formYourDataMiddlename')}
        error={form.formState.errors.middlename?.message}
        label={t('formYourDataMiddlename')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
        onPaste={filterInputAlphabet}
      />
      <TextField
        id="lastname"
        register={form.register('lastname', {
          required: t('formRuleRequired'),
          maxLength: { value: 60, message: t('formRuleMaxLength', { length: String(60) }) },
          validate: value =>
            value.split('').length > 0 ? validateAlphabetAndSpecialSymbols(value) : true,
        })}
        placeholder={t('formYourDataLastname')}
        error={form.formState.errors.lastname?.message}
        label={t('formYourDataLastname')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
        onPaste={filterInputAlphabet}
      />
      <TextField
        id="phone"
        register={form.register('phone')}
        placeholder={t('formYourDataPhonePlaceholder')}
        error={form.formState.errors.phone?.message}
        label={t('formYourDataPhone')}
        isDisabled={true}
        isRequired={true}
        onKeyDown={filterInputOnlyNumbers}
        onPaste={filterInputOnlyNumbers}
      />
      <TextField
        id="email"
        register={form.register('email', {
          required: t('formRuleRequired'),
          validate: validateEmail,
        })}
        placeholder={t('formYourDataEmailPlaceholder')}
        error={form.formState.errors.email?.message}
        label={t('formYourDataEmail')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputEmail}
        onPaste={filterInputEmail}
      />
      <TextField
        id="city"
        register={form.register('city', {
          required: t('formRuleRequired'),
          maxLength: { value: 60, message: t('formRuleMaxLength', { length: String(60) }) },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder={t('formYourDataCityPlaceholder')}
        error={form.formState.errors.city?.message}
        label={t('formYourDataCity')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputCity}
      />
    </form>
  )
}
