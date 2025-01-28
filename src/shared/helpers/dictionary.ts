import englishMessages from '@/static/locales/en.json' assert { type: 'json' }
import russianMessages from '@/static/locales/ru.json' assert { type: 'json' }

const dictionaries = {
  ru: () => russianMessages,
  en: () => englishMessages,
}

export function getDictionary(locale: 'en' | 'ru') {
  return dictionaries[locale]()
}
