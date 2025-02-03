'use client'

import type { DaDataAddress, DaDataSuggestion } from 'react-dadata'
import { DADATA_API } from '@/security/dadata'
import { TextField } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import React from 'react'
import { AddressSuggestions } from 'react-dadata'

export interface AddressSuggestionsSSRProps {
  onChange: (...event: any[]) => void
  value: DaDataSuggestion<DaDataAddress> | string
  defaultQuery: string
  error?: string
}

export function AddressSuggestionsSSR({ onChange, value, defaultQuery, error }: AddressSuggestionsSSRProps) {
  const { t } = useLocale()

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <TextField
        id="city"
        placeholder={t('field.city.placeholder')}
        label={t('field.city')}
        isDisabled={true}
        isRequired={true}
      />
    )
  }

  return (
    <AddressSuggestions
      token={DADATA_API}
      inputProps={{ placeholder: 'Поиск только городов' }}
      defaultQuery={defaultQuery}
      onChange={value => onChange(value)}
      delay={200}
      count={5}
      customInput={props => (
        <TextField
          id="city"
          value={value}
          placeholder={t('field.city.placeholder')}
          error={error}
          label={t('field.city')}
          isDisabled={false}
          isRequired={true}
          {...props}
        />
      )}
    />
  )
}
