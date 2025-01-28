import { getDictionary } from '@/src/shared/helpers'
import { Header, Main } from '../(components)'
import { ProfileForm } from './components/ProfileForm/ProfileForm'

export default async function Profile({ params }: PageParams) {
  const lang = (await params).lang
  const dict = getDictionary(lang)

  return (
    <>
      <Header>
        <h1>{dict.profile}</h1>
      </Header>
      <Main className="mb-20 sm:mb-0">
        <ProfileForm />
      </Main>
    </>
  )
}
