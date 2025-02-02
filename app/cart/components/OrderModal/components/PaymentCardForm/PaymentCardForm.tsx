import { Main } from '@/app/(components)'
import { Button, TextField } from '@/src/shared/components'

import { filterInputOnlyNumbers, validateMask } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { useStage } from '../../context/StageContext'
import { StageLine } from '../StageLine/StageLine'
import { usePaymentCardForm } from './hooks/usePaymentCardForm'

export function PaymentCardForm() {
  const { back, numberCurrentStage } = useStage()
  const { t } = useLocale()

  const { state, functions } = usePaymentCardForm()
  return (
    <>
      <Main className="flex flex-col gap-3">
        <h1>
          <span>
            {t('stage')}
            {' '}
          </span>
          {numberCurrentStage}
        </h1>
        <StageLine className="w-1/2" />
        <h1 className="hidden pb-5 text-xl font-bold sm:block">{t('form.payment.name.long')}</h1>
        <div className="flex flex-col gap-5">
          <form
            className="flex max-w-[600px] flex-col gap-5"
            onSubmit={state.form.handleSubmit(functions.onSubmit)}
          >
            <div className="rounded-3xl bg-secondary p-8 flex flex-col gap-3">
              <TextField
                id="pan"
                register={state.form.register('pan', ['9999 9999'], {
                  required: true,
                  validate: value => validateMask(value) ? true : t('rule.full'),
                })}
                placeholder="0000 0000"
                error={state.form.formState.errors.pan?.message}
                label={t('field.pan')}
                isDisabled={false}
                isRequired={true}
                onKeyDown={filterInputOnlyNumbers}
              />
              <div className="box-border flex justify-between">
                <TextField
                  id="expireDate"
                  register={state.form.register('expireDate', ['99/99'], {
                    required: true,
                    validate: value => validateMask(value) ? true : t('rule.full'),
                  })}
                  className="box-border w-[48%]"
                  placeholder="00/00"
                  error={state.form.formState.errors.expireDate?.message}
                  label={t('field.expireDate')}
                  isDisabled={false}
                  isRequired={true}
                  onKeyDown={filterInputOnlyNumbers}
                />
                <TextField
                  id="cvv"
                  register={state.form.register('cvv', ['9999'], {
                    required: true,
                    validate: value => validateMask(value) ? true : t('rule.full'),
                  })}
                  className="box-border w-[48%]"
                  placeholder="0000"
                  error={state.form.formState.errors.cvv?.message}
                  label="CVV"
                  isDisabled={false}
                  isRequired={true}
                  onKeyDown={filterInputOnlyNumbers}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="text-text-dark hidden h-max w-full rounded-2xl border-2 border-solid border-text-light py-4 text-base shadow-none sm:flex bg-background hover:bg-secondary"
                onClick={() => back()}
              >
                {t('button.back')}
              </Button>
              <Button
                className="h-max w-full rounded-2xl bg-primary py-4 text-base text-primary-foreground hover:bg-secondary-primary-dark"
                type="submit"
                disabled={state.isLoading}
              >
                {t('button.payment')}
              </Button>
            </div>
          </form>
        </div>
      </Main>
    </>
  )
}
