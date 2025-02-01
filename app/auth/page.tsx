import { ROUTES } from '@/src/shared/constants'
import { getDictionary } from '@/src/shared/helpers'
import CancelIcon from '@/static/icons/back.svg'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Header, Main } from '../(components)'
import { AuthPageProvider } from './components/AuthPageProvider'
import { Stepper } from './components/Stepper'

export default async function Auth() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  const token = cookieStore.get('token')?.value
  const dict = getDictionary(locale)

  return (
    <>
      <Header locale={locale} isAuth={!!token}>
        <div className="flex gap-4">
          <Link
            href={ROUTES.PIZZA}
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
    </>
  )
}
