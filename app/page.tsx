import { PizzaCardModal } from '@/src/components'
import { getPizzaCatalog } from '@/src/shared/api'
import { getDictionary } from '@/src/shared/helpers'
import { cookies } from 'next/headers'
import { Header, Main } from './(components)'
import { PizzaCard } from './(components)/PizzaCard/PizzaCard'

export default async function Home() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  const dict = getDictionary(locale)
  const pizzaResponse = (await getPizzaCatalog()).data
  const token = cookieStore.get('token')?.value

  return (
    <>
      <Header locale={locale} isAuth={!!token}>
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
                  <PizzaCardModal
                    type="add"
                    pizza={{
                      choosenDough: pizza.doughs[0],
                      choosenSize: pizza.sizes[0],
                      choosenToppings: [],
                      id: pizza.id,
                      img: pizza.img,
                      name: pizza.name,
                      dough: pizza.doughs,
                      sizes: pizza.sizes,
                      toppings: pizza.toppings,
                      price: pizza.sizes[0].price,
                    }}
                    className="block sm:hidden"
                    triggerButton={(
                      <span>
                        <PizzaCard className="cursor-pointer" key={index} pizza={pizza} />
                      </span>
                    )}
                  />
                </div>
              ))}
            </div>
          </Main>
        )}
      </main>
    </>
  )
}
