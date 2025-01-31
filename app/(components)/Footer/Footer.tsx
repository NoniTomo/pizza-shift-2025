'use server'

import { ROUTES } from '@/src/shared/constants'
import { getDictionary } from '@/src/shared/helpers'
import CartIcon from '@/static/icons/cart.svg'
import LoginIcon from '@/static/icons/login.svg'
import OrderIcon from '@/static/icons/order.svg'
import PizzaIcon from '@/static/icons/pizza.svg'
import ProfileIcon from '@/static/icons/profile.svg'
import { NavButton } from '../NavButton/NavButton'

export interface FooterProps {
  locale: Locale
  user?: User
}

export async function Footer({ locale, user }: FooterProps) {
  const dict = getDictionary(locale)
  return (
    <footer className="bottom-secondary fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t-2 bg-background px-5 py-2 text-secondary sm:hidden">
      { user && (
        <>
          <NavButton content={dict.pizza} alt={dict.pizza} href={ROUTES.PIZZA} iconSrc={PizzaIcon} type="column" />
          <NavButton content={dict.orders} alt={dict.orders} href={ROUTES.ORDER} iconSrc={OrderIcon} type="column" />
          <NavButton content={dict.cart} alt={dict.cart} href={ROUTES.CART} iconSrc={CartIcon} type="column" />
          <NavButton content={dict.profile} alt={dict.profile} href={ROUTES.PROFILE} iconSrc={ProfileIcon} type="column" />
        </>
      )}
      { !user && (<NavButton content={dict.auth} alt={dict.auth} href={ROUTES.AUTH} iconSrc={LoginIcon} type="column" />)}
    </footer>
  )
}
