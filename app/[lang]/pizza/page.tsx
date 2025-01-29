import { getPizzaCatalog } from '@/src/shared/api'
import { getDictionary } from '@/src/shared/helpers'
import { Header, Main } from '../(components)'
import { PizzaCard } from './components/PizzaCard/PizzaCard'
import { PizzaCardModal } from './components/PizzaCardModal/PizzaCardModal'

export default async function Home({ params }: PageProps) {
  const lang = (await params).lang
  const dict = getDictionary(lang)
  const pizzaResponse = (await getPizzaCatalog({})).data

  return (
    <>
      <Header>
        <h1>{dict.pizza}</h1>
      </Header>
      <main>

        {!pizzaResponse.success && <p>{pizzaResponse.reason}</p>}
        {!!pizzaResponse.catalog && (

          <Main className="mb-20 w-full sm:mb-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {pizzaResponse.catalog.map((pizza, index) => (
                <div key={index}>
                  <PizzaCard className="hidden sm:flex" pizza={pizza} />
                  <PizzaCardModal pizza={pizza} className="block sm:hidden" triggerButton={<span><PizzaCard key={index} pizza={pizza} /></span>} />
                </div>
              ))}
            </div>
          </Main>
        )}
      </main>

    </>
  )
}
