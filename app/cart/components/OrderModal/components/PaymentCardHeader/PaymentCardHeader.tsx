import { HeaderClient } from '@/app/(components)/Header/HeaderClient'
import { Button } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import BackSvg from '@/static/icons/back.svg'
import Image from 'next/image'
import { useStage } from '../../context/StageContext'

export function PaymentCardHeader() {
  const { back } = useStage()
  const { t } = useLocale()

  return (
    <HeaderClient>
      <Button className="border-none bg-background hover:bg-background shadow-none" onClick={() => back()}>
        <Image
          className="hover:grey-dark-filter"
          priority
          src={BackSvg}
          height={32}
          width={32}
          alt={t('buttonBack')}
        />
      </Button>
      <h1>{t('formPaymentShortName')}</h1>
    </HeaderClient>
  )
}
