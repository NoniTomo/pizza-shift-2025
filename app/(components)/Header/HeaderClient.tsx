'use client'

import { ROUTES } from '@/src/shared/constants'
import { useUser } from '@/src/shared/context'
import { useLocale } from '@/src/shared/hooks'
import CartIcon from '@/static/icons/cart.svg'
import LogInIcon from '@/static/icons/login.svg'
import OrderIcon from '@/static/icons/order.svg'
import PizzaLogoIcon from '@/static/icons/pizza.svg'
import ProfileIcon from '@/static/icons/profile.svg'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { NavButton } from '../NavButton/NavButton'

export interface HeaderProps {
  children: React.ReactNode
  className?: React.ReactNode
}

export function HeaderClient({ children, className }: HeaderProps) {
  const { t } = useLocale()
  const userContext = useUser()
  return (
    <>
      <header
        className={`h-min w-full bottom-secondary sticky left-0 right-0 top-0 z-10 hidden justify-center border-b-2 bg-white sm:flex ${className}`}
      >
        <div className="flex w-full justify-between p-4 text-secondary sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1200px]">
          <div className="flex gap-10">
            <Link href={ROUTES.PIZZA} className="flex gap-3 cursor-pointer">
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
            {userContext.value && (
              <>
                <NavButton
                  iconSrc={ProfileIcon}
                  content={t('profile')}
                  alt={t('profile')}
                  href={ROUTES.PROFILE}
                  type="row"
                />
                <NavButton
                  iconSrc={OrderIcon}
                  content={t('orders')}
                  alt={t('orders')}
                  href={ROUTES.ORDER}
                  type="row"
                />
              </>
            )}
          </div>
          {userContext.value && (
            <NavButton
              iconSrc={CartIcon}
              content={t('cart')}
              alt={t('cart')}
              href={ROUTES.CART}
              type="row"
            />
          )}
          {!userContext.value && (
            <NavButton
              iconSrc={LogInIcon}
              content={t('buttonLogIn')}
              alt={t('auth')}
              href={ROUTES.AUTH}
              type="row"
            />
          )}
        </div>
      </header>

      <header className="bottom-secondary {className} sticky left-0 right-0 top-0 z-10 flex w-full justify-center border-b-2 bg-white sm:hidden">
        <div className="flex w-full justify-start gap-4 p-4 font-inter text-3xl font-bold text-text">
          {children}
        </div>
      </header>
    </>
  )
}
