'use client'

import { ROUTES } from '@/src/shared/constants'
import { useLocale } from '@/src/shared/hooks'
import CartIcon from '@/static/icons/cart.svg'
import OrderIcon from '@/static/icons/order.svg'
import PizzaIcon from '@/static/icons/pizza.svg'
import ProfileIcon from '@/static/icons/profile.svg'
import { NavButton } from '../NavButton/NavButton'

export function Footer() {
  const { t } = useLocale()
  return (
    <footer className="bottom-secondary fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t-2 bg-background px-5 py-2 text-secondary sm:hidden">
      <NavButton content={t('pizza')} alt={t('pizza')} href={ROUTES.PIZZA} iconSrc={PizzaIcon} type="column" />
      <NavButton content={t('orders')} alt={t('orders')} href={ROUTES.ORDER} iconSrc={OrderIcon} type="column" />
      <NavButton content={t('cart')} alt={t('cart')} href={ROUTES.CART} iconSrc={CartIcon} type="column" />
      <NavButton content={t('profile')} alt={t('profile')} href={ROUTES.PROFILE} iconSrc={ProfileIcon} type="column" />
    </footer>
  )
}
