import { getDictionary } from '@/src/shared/helpers'
import { cookies } from 'next/headers'
import { Header, Main } from '../(components)'
import { OrdersList } from './components/OrdersList/OrdersList'
import { OrderTabs } from './components/OrderTabs/OrderTabs'

export default async function Order() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  const dict = getDictionary(locale)
  const token = cookieStore.get('token')?.value

  return (
    <>
      <Header locale={locale} isAuth={!!token}>
        <h1>{dict.profile}</h1>
      </Header>
      <Main className="mb-20 sm:mb-0 ">
        <div className="flex flex-col gap-5 max-w-[600px]">
          <OrderTabs />
          <OrdersList />
        </div>
      </Main>
    </>
  )
}
