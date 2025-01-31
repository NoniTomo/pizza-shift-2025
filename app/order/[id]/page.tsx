import { Header, Main } from '@/app/(components)'
import { OrderCard } from '@/src/components'
import { getPizzaOrdersId } from '@/src/shared/api'
import { ROUTES } from '@/src/shared/constants'
import { getDictionary } from '@/src/shared/helpers'
import BackIcon from '@/static/icons/back.svg'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonReorder } from './components/ButtonReorder/ButtonReorder'

export type RootLayoutProps = Readonly<{
  params: Promise<{ id: string }>
}>

export default async function OrderId({ params }: RootLayoutProps) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  const dict = getDictionary(locale)

  const userRaw = cookieStore.get('user')?.value
  const user = userRaw ? JSON.parse(userRaw) as User : undefined

  const id = (await params).id
  const token = cookieStore.get('token')?.value
  const response = await getPizzaOrdersId({ params: { id }, config: { headers: { Authorization: `Bearer ${token}` } } })

  const order = response?.data.order

  return (
    <>
      <Header locale={locale} isAuth={!!user}>
        <div className="flex gap-4">
          <Link
            href={ROUTES.ORDER}
          >
            <Image
              className="hover:grey-dark-filter"
              priority
              src={BackIcon}
              height={32}
              width={32}
              alt={dict.buttonBack}
            />
          </Link>
          <h1>{dict.auth}</h1>
        </div>
      </Header>
      <Main className="mb-20 sm:mb-0 flex flex-col gap-5">
        <Link
          href={ROUTES.ORDER}
          className="hidden gap-4 sm:flex font-inter text-xl text-secondary items-center hover:grey-dark-filter"
        >
          <Image
            priority
            src={BackIcon}
            height={32}
            width={32}
            alt={dict.buttonBack}
          />

          <h1>{dict.buttonBack}</h1>
        </Link>
        <div className="flex flex-col gap-5 max-w-[600px]">
          <OrderCard order={order} variant="active">
            <div className="flex gap-3">
              <Link
                href={ROUTES.ORDER}
                className="text-text-dark text-center h-min w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-base shadow-none"
              >
                {dict.buttonBack}
              </Link>
              <ButtonReorder order={order} />
            </div>
          </OrderCard>
        </div>
      </Main>
    </>
  )
}
