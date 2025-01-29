import { ROUTES } from '@/src/shared/constants'
import { useI18n } from '@/src/shared/context'
import PizzaLogoIcon from '@/static/icons/pizza.svg'
import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  const { value } = useI18n()
  return (
    <Link href={ROUTES.PIZZA(value)} className="flex gap-3">
      <h1 className="flex flex-col justify-start font-logo font-semibold uppercase">
        <span className="text-primary">шифт</span>
        <span className="text-primary">pizza</span>
      </h1>
      <Image
        priority
        src={PizzaLogoIcon}
        height={45}
        width={45}
        alt="шифт pizza"
        className="primary-filter"
      />
    </Link>
  )
}
