import type { LinkProps } from 'next/link'
import Link from 'next/link'
import React from 'react'

export type NavLinkServerProps = {
  href: string
  children?: React.ReactNode | (({ isActive }: { isActive: boolean }) => React.ReactNode)
  className?: string
  isActive?: boolean
} & LinkProps

export function NavLinkServer({ children, href, className, isActive, ...props }: NavLinkServerProps) {
  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ isActive: isActive || false })
    }
    return children
  }

  return (
    <Link href={href} className={className} {...props}>
      {renderChildren()}
    </Link>
  )
}
