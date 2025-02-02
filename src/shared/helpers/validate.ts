import type { ClipboardEvent, KeyboardEvent } from 'react'

function testClipboardEvent(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>,
): asserts e is ClipboardEvent<HTMLInputElement> {
  if (!Object.prototype.hasOwnProperty.call(e, 'clipboardData'))
    throw new Error('The ClipboardEvent type was expected for the event')
}
function testKeyboardEvent(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>,
): asserts e is KeyboardEvent<HTMLInputElement> {
  if (Object.prototype.hasOwnProperty.call(e, 'clipboardData'))
    throw new Error('The testKeyboardEvent type was expected for the event')
}

const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape']

function check(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>,
  testRegex: RegExp,
) {
  if (Object.prototype.hasOwnProperty.call(e, 'clipboardData')) {
    testClipboardEvent(e)
    if (
      !e.clipboardData
        .getData('text')
        .split('')
        .reduce((res, symbol) => res && testRegex.test(symbol), true)
    ) {
      e.preventDefault()
    }
  }
  else {
    testKeyboardEvent(e)
    if (!(testRegex.test(e.key) || allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey)) {
      e.preventDefault()
    }
  }
}

export function filterInputOnlyNumbers(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>,
) {
  const testRegex = /\d/

  check(e, testRegex)
}

export function filterInputAlphabet(
  e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>,
) {
  // eslint-disable-next-line regexp/no-obscure-range
  const testRegex = /[a-zA-Zа-яА-ЯёЁ‘`\-\s]/

  check(e, testRegex)
}

export function filterInputEmail(e: KeyboardEvent<HTMLInputElement> | ClipboardEvent<HTMLInputElement>) {
  const testRegex = /[ \S]/

  check(e, testRegex)
}

// eslint-disable-next-line regexp/no-obscure-range
const cyrillicRegex = /^[а-яА-ЯёЁ\s`-]+$/
const latinRegex = /^[a-z\s`-]+$/i
// eslint-disable-next-line regexp/no-contradiction-with-assertion
const specialCharRegexEndBeginTest = /^(?![`-])(?!.*[`-]$).*$/
const specialCharRegexRepeatTest = /^(?!.*`.*`)(?!.*-.*-).*$/
const emailRegex
  = /\S[^\s@]*@\S(?:(?:[^\s.]*\.[^\s.A-Z])*[^\s.]*\.[.A-Z][^\s.A-Z])*(?:[^\s.]*\.[^\s.A-Z])*[^\s.]*\.[.A-Z]{2,}(?:[^\s.A-Z](?:(?:[^\s.]*\.[^\s.A-Z])*[^\s.]*\.[.A-Z][^\s.A-Z])*(?:[^\s.]*\.[^\s.A-Z])*[^\s.]*\.[.A-Z]{2,})*$/i

export function validateAlphabetAndSpecialSymbols(value: string) {
  if (
    (cyrillicRegex.test(value) || latinRegex.test(value))
    && specialCharRegexEndBeginTest.test(value)
    && specialCharRegexRepeatTest.test(value)
  ) {
    return true
  }
  return 'Некорректный формат'
}

export function validateEmail(value: string) {
  if (
    emailRegex.test(value)
    && specialCharRegexEndBeginTest.test(value)
    && specialCharRegexRepeatTest.test(value)
  ) {
    return true
  }
  return 'Некорректный формат почты'
}

export function validateMonth(value: string) {
  if (+value % 100 <= 12 && +value - (+value % 100) / 100 <= 99 && +value - (+value % 100) / 100 <= 19) {
    return true
  }
  return 'Некорректный срок действия'
}

export function validateMask(value: string, props?: string[]) {
  if (value.includes('_') || props?.some(char => value.includes(char)))
    return false
  return true
}
