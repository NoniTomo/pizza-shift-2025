'use client'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export type NavLinkProps = {
  href: string
  children?: React.ReactNode | (({ isActive }: { isActive: boolean }) => React.ReactNode)
  className?: string
} & LinkProps

export function NavLink({ children, href, className, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ isActive })
    }
    return children
  }

  return (
    <Link href={href} className={className} {...props}>
      {renderChildren()}
    </Link>
  )
}
