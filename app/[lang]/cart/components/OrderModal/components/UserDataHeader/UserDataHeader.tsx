import { Header } from '@/app/[lang]/(components)'
import { Button } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import BackSvg from '@/static/icons/back.svg'
import Image from 'next/image'
import { useStage } from '../../context/StageContext'

export function UserDataHeader() {
  const { setModalState } = useStage()
  const { t } = useLocale()
  return (
    <Header className="h-min">
      <Button className="border-none bg-background shadow-none" onClick={() => setModalState(false)}>
        <Image
          className="hover:grey-dark-filter"
          priority
          src={BackSvg}
          height={32}
          width={32}
          alt={t('buttonBack')}
        />
      </Button>
      <h1>{t('formYourDataShortName')}</h1>
    </Header>
  )
}
