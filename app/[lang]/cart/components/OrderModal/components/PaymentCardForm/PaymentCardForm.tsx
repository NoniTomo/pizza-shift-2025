import { Main } from '@/app/[lang]/(components)'
import { Button, TextField } from '@/src/shared/components'

import { filterInputOnlyNumbers } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import { useStage } from '../../context/StageContext'
import { usePaymentCardForm } from './hooks/usePaymentCardForm'

export function PaymentCardForm() {
  const { back } = useStage()
  const { t } = useLocale()

  const { state, functions } = usePaymentCardForm()
  return (
    <>
      <Main>
        <h1 className="hidden pb-5 text-xl font-bold sm:block">{t('formPaymentLongName')}</h1>
        <div className="flex flex-col gap-5">
          <form
            className="flex max-w-[500px] flex-col gap-5"
            onSubmit={state.form.handleSubmit(functions.onSubmit)}
          >
            <div className="rounded-3xl bg-text-light p-8">
              <TextField
                id="pan"
                register={state.form.register('pan', ['9999 9999'], {
                  required: true,
                })}
                placeholder="0000 0000"
                error={state.form.formState.errors.pan?.message}
                label={t('formPaymentPan')}
                isDisabled={false}
                isRequired={true}
                onKeyDown={filterInputOnlyNumbers}
              />
              <div className="box-border flex justify-between">
                <TextField
                  id="expireDate"
                  register={state.form.register('expireDate', ['99/99'], {
                    required: true,
                  })}
                  className="box-border w-[48%]"
                  placeholder="00/00"
                  error={state.form.formState.errors.expireDate?.message}
                  label={t('formPaymentExpireDate')}
                  isDisabled={false}
                  isRequired={true}
                  onKeyDown={filterInputOnlyNumbers}
                />
                <TextField
                  id="cvv"
                  register={state.form.register('cvv', ['9999'], {
                    required: true,
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
                className="text-text-dark hidden h-max w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-base shadow-none sm:flex"
                onClick={() => back()}
              >
                {t('buttonBack')}
              </Button>
              <Button
                className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light"
                type="submit"
                disabled={state.isLoading}
              >
                {t('buttonPayment')}
              </Button>
            </div>
          </form>
        </div>
      </Main>
    </>
  )
}
