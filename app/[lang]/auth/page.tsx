import { ROUTES } from '@/src/shared/constants'
import { getDictionary } from '@/src/shared/helpers'
import CancelIcon from '@/static/icons/cancel.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Header, Main } from '../(components)'
import { AuthPageProvider } from './components/AuthPageProvider'
import { Stepper } from './components/Stepper'

export default async function Auth({ params }: PageParams) {
  const lang = (await params).lang
  const dict = getDictionary(lang)

  return (
    <div className="h-screen z-50 bg-background relative">
      <Header className="h-min w-full">
        <div className="flex gap-4">
          <Link
            href={ROUTES.PIZZA(lang)}
          >
            <Image
              className="hover:grey-dark-filter"
              priority
              src={CancelIcon}
              height={32}
              width={32}
              alt={dict.buttonBack}
            />
          </Link>
          <h1>{dict.auth}</h1>
        </div>
      </Header>
      <Main className="mb-20 sm:mb-0">
        <AuthPageProvider stage={{ defaultStage: { currentStage: 'phoneForm' } }}>
          <Stepper />
        </AuthPageProvider>
      </Main>
    </div>
  )
}
