import { Header } from '@/app/[lang]/(components)'
import { Button } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import CancelIcon from '@/static/icons/cancel.svg'
import Image from 'next/image'
import { useStage } from '../../context/StageContext'

export function SuccessViewHeader() {
  const { set, setModalState } = useStage()
  const { t } = useLocale()
  return (
    <Header className="h-min w-full">
      <div className="flex w-full justify-end">
        <Button
          className="border-none bg-background shadow-none"
          onClick={() => {
            set('userDataForm')
            setModalState(false)
          }}
        >
          <Image
            className="hover:grey-dark-filter"
            priority
            src={CancelIcon}
            height={32}
            width={32}
            alt={t('buttonBack')}
          />
        </Button>
      </div>
    </Header>
  )
}
