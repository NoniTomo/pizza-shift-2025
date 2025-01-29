import { getDictionary } from '@/src/shared/helpers'

export default async function Orders({ params }: PageParams) {
  const lang = (await params).lang
  const dict = getDictionary(lang)

  return (
    <div className="bg-red-400 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {dict.orders}
    </div>
  )
}
