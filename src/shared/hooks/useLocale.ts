import { useI18n } from '../context'
import { getDictionary } from '../helpers'

export function useLocale() {
  const { value } = useI18n()
  const dictionary = getDictionary(value)

  const t = (key: keyof typeof dictionary, variables: Record<string, string> = {}) => {
    let translation = dictionary[key]

    Object.keys(variables).forEach((variable) => {
      translation = translation.replace(`{${variable}}`, variables[variable])
    })

    return translation
  }

  return { t }
}
