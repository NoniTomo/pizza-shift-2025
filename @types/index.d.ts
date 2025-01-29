interface PageParams {
  params: Promise<{ lang: 'en' | 'ru' }>
}

type Locale = 'en' | 'ru'

type PageProps = Readonly<{
  children: React.ReactNode
}> &
PageParams

interface CartPizza {
  count: number
  pizza: OrderedPizza & {
    imgSrc: string
    description: string
    price: number
  }
}
