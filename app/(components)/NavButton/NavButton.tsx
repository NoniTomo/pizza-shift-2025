'use client'

import { NavLink } from '@/src/shared/components'
import Image from 'next/image'

interface NavButtonProps {
  iconSrc: string
  href: string
  type: 'row' | 'column'
  alt: string
  content?: string
  className?: string
}

export function NavButton({ iconSrc, href, content, alt, type, className }: NavButtonProps) {
  return (
    <NavLink
      href={href}
      className={`flex items-center justify-center font-inter text-lg ${type === 'column' ? 'flex-col ' : 'flex-row gap-3'} ${className}`}
    >
      {({ isActive }) => (
        <>
          <Image
            priority
            src={iconSrc}
            height={32}
            width={32}
            alt={alt}
            className={isActive ? 'primary-filter' : ''}
          />
          {!!content && <span className={isActive ? 'text-primary' : 'text-text'}>{content}</span>}
        </>
      )}
    </NavLink>
  )
}
