import { ROUTES } from '@/src/shared/constants'
import { getDictionary } from '@/src/shared/helpers'
import BackSvg from '@/static/icons/back.svg'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Header, Main } from '../(components)'
import { OrderModal } from './components/OrderModal/OrderModal'
import { OrderModalProvider } from './components/OrderModal/OrderModalProvider'
import { PizzaList } from './components/PizzaList/PizzaList'

export default async function Home() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  const dict = getDictionary(locale)
  const token = cookieStore.get('token')?.value

  return (
    <>
      <Header locale={locale} isAuth={!!token}>
        <Link href={ROUTES.PIZZA}>
          <Image
            priority
            src={BackSvg}
            className="hover:grey-dark-filter"
            height={32}
            width={32}
            alt={dict['button.back']}
          />
        </Link>
        <h1>{dict.cart}</h1>
      </Header>
      <Main>
        <OrderModalProvider
          stage={{
            defaultStage: { currentStage: 'userDataForm', completedStages: [], modalState: false },
          }}
        >
          <PizzaList />
          <OrderModal />
        </OrderModalProvider>
      </Main>
    </>
  )
}
