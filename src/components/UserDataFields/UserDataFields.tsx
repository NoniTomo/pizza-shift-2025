import type { UseFormReturn } from 'react-hook-form'
import { TextField } from '@/src/shared/components/TextField'
import {
  filterInputAlphabet,
  filterInputEmail,
  filterInputOnlyNumbers,
  validateAlphabetAndSpecialSymbols,
  validateEmail,
} from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'

export interface UserDataFieldsProps {
  form: UseFormReturn<User, any, undefined>
  onSubmit: (data: User) => void
  id: string
}

export function UserDataFields({ form, onSubmit, id }: UserDataFieldsProps) {
  const { t } = useLocale()
  return (
    <form id={id} className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <TextField
        id="middlename"
        register={form.register('middlename', {
          required: t('rule.required'),
          maxLength: { value: 60, message: t('rule.maxLength', { length: String(String(60)) }) },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder={t('field.middlename')}
        error={form.formState.errors.middlename?.message}
        label={t('field.middlename')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
        onPaste={filterInputAlphabet}
      />
      <TextField
        id="firstname"
        register={form.register('firstname', {
          required: t('rule.required'),
          maxLength: { value: 60, message: t('rule.maxLength', { length: String(String(60)) }) },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder={t('field.firstname')}
        error={form.formState.errors.firstname?.message}
        label={t('field.firstname')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
        onPaste={filterInputAlphabet}
      />
      <TextField
        id="lastname"
        register={form.register('lastname', {
          required: t('rule.required'),
          maxLength: { value: 60, message: t('rule.maxLength', { length: String(60) }) },
          validate: value =>
            value.split('').length > 0 ? validateAlphabetAndSpecialSymbols(value) : true,
        })}
        placeholder={t('field.lastname')}
        error={form.formState.errors.lastname?.message}
        label={t('field.lastname')}
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
        onPaste={filterInputAlphabet}
      />
      <TextField
        id="phone"
        register={form.register('phone')}
        placeholder={t('field.phone.placeholder')}
        error={form.formState.errors.phone?.message}
        label={t('field.phone')}
        isDisabled={true}
        isRequired={true}
        onKeyDown={filterInputOnlyNumbers}
        onPaste={filterInputOnlyNumbers}
      />
      <TextField
        id="email"
        register={form.register('email', {
          validate: value => value.split('').length > 0 ? validateEmail(value) : true,
        })}
        placeholder={t('field.email.placeholder')}
        error={form.formState.errors.email?.message}
        label={t('field.email')}
        isDisabled={false}
        isRequired={false}
        onKeyDown={filterInputEmail}
        onPaste={filterInputEmail}
      />
      <TextField
        id="city"
        register={form.register('city', {
          required: t('rule.required'),
          maxLength: { value: 100, message: t('rule.maxLength', { length: String(60) }) },
        })}
        placeholder={t('field.city.placeholder')}
        error={form.formState.errors.city?.message}
        label={t('field.city')}
        isDisabled={false}
        isRequired={true}
      />
    </form>
  )
}
