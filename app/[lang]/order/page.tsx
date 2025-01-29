import { AuthCheck } from '@/src/shared/components'
import { getDictionary } from '@/src/shared/helpers'
import { Header, Main } from '../(components)'
import { OrdersList } from './components/OrdersList/OrdersList'
import { OrderTabs } from './components/OrderTabs/OrderTabs'

export default async function Profile({ params }: PageParams) {
  const lang = (await params).lang
  const dict = getDictionary(lang)

  return (
    <AuthCheck>
      <Header>
        <h1>{dict.profile}</h1>
      </Header>
      <Main className="mb-20 sm:mb-0">
        <OrderTabs />
        <OrdersList />
      </Main>
    </AuthCheck>
  )
}
