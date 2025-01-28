'use client'
import { ROUTES } from '@/src/shared/constants'
import { useUser } from '@/src/shared/context'
import { useLocale } from '@/src/shared/hooks'
import CartIcon from '@/static/icons/cart.svg'
import LogInIcon from '@/static/icons/login.svg'
import OrderIcon from '@/static/icons/order.svg'
import ProfileIcon from '@/static/icons/profile.svg'
import React from 'react'
import { NavButton } from '../NavButton/NavButton'
import { HeaderLogo } from './components/HeaderLogo'

export interface HeaderProps {
  className?: string
  children: React.ReactNode
}

export function Header({ className, children }: HeaderProps) {
  const { t } = useLocale()
  const { value } = useUser()
  return (
    <>
      <header
        className={`bottom-secondary sticky left-0 right-0 top-0 z-10 hidden w-full justify-center border-b-2 bg-white sm:flex ${className}`}
      >
        <div className="flex w-full justify-between p-4 text-secondary sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1200px]">
          <div className="flex gap-10">
            <HeaderLogo />
            {value && (
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
          {value && (
            <NavButton
              iconSrc={CartIcon}
              content={t('cart')}
              alt={t('cart')}
              href={ROUTES.CART}
              type="row"
            />
          )}
          {!value && (
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
