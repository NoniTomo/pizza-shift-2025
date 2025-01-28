import { getPizzaCatalog } from '@/src/shared/api'
import { getDictionary } from '@/src/shared/helpers'
import { Header, Main } from '../(components)'
import { PizzaCard } from './components/PizzaCard/PizzaCard'

export default async function Home({ params }: PageProps) {
  const lang = (await params).lang
  const dict = getDictionary(lang)
  const pizzaResponse = (await getPizzaCatalog({})).data

  return (
    <>
      <Header>
        <h1>{dict.pizza}</h1>
      </Header>
      {!pizzaResponse.success && <p>{pizzaResponse.reason}</p>}
      {!!pizzaResponse.catalog && (
        <Main className="mb-20 w-full sm:mb-0">
          <div className="grid gap-10 p-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {pizzaResponse.catalog.map((pizza, index) => (
              <PizzaCard key={index} pizza={pizza} />
            ))}
          </div>
        </Main>
      )}
    </>
  )
}
