// import { AuthCheck } from '@/src/components'
import { getDictionary } from '@/src/shared/helpers'
import { cookies } from 'next/headers'
import { Header, Main } from '../(components)'
import { ProfileForm } from './components/ProfileForm/ProfileForm'

export default async function Profile() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  const dict = getDictionary(locale)
  const token = cookieStore.get('token')?.value

  return (
    <>
      <Header locale={locale} isAuth={!!token}>
        <h1>{dict.profile}</h1>
      </Header>
      <Main className="mb-20 sm:mb-0">
        <ProfileForm />
      </Main>
    </>
  )
}
