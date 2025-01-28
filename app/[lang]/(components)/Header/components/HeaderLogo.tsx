import { ROUTES } from '@/src/shared/constants'
import PizzaLogoIcon from '@/static/icons/pizza.svg'
import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  return (
    <Link href={ROUTES.PIZZA} className="flex gap-3">
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
