'use server'

import { ROUTES } from '@/src/shared/constants'
import { getDictionary } from '@/src/shared/helpers'
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
  isAuth: boolean
  locale: Locale
}

export async function Header({ children, locale, isAuth }: HeaderProps) {
  const dict = getDictionary(locale)
  return (
    <>
      <header
        className={`h-min w-full bottom-secondary bg-background sticky left-0 right-0 top-0 z-10 hidden justify-center border-b-2 sm:flex `}
      >
        <div className="flex w-full justify-between p-4 text-secondary-secondary-2 sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1200px]">
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
            {isAuth && (
              <>
                <NavButton
                  iconSrc={ProfileIcon}
                  content={dict.profile}
                  alt={dict.profile}
                  href={ROUTES.PROFILE}
                  type="row"
                />
                <NavButton
                  iconSrc={OrderIcon}
                  content={dict.orders}
                  alt={dict.orders}
                  href={ROUTES.ORDER}
                  type="row"
                />
              </>
            )}
          </div>
          {isAuth && (
            <NavButton
              iconSrc={CartIcon}
              content={dict.cart}
              alt={dict.cart}
              href={ROUTES.CART}
              type="row"
            />
          )}
          {!isAuth && (
            <NavButton
              iconSrc={LogInIcon}
              content={dict['button.logIn']}
              alt={dict.auth}
              href={ROUTES.AUTH}
              type="row"
            />
          )}
        </div>
      </header>

      <header className="sticky left-0 right-0 top-0  z-10 flex w-full justify-center border-none bg-background sm:hidden">
        <div className="flex w-full justify-start gap-4 p-4 font-inter text-3xl font-bold">
          {children}
        </div>
      </header>
    </>
  )
}
