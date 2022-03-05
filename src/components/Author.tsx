import * as React from 'react'
import { Link } from '.'
import type { LinkProps } from '.'

interface AuthorProps extends LinkProps {
  name: string
  avatar?: string
  size?: 'base' | 'small'
}

export function Author({
  avatar,
  name,
  href,
  size = 'base',
  className,
}: AuthorProps) {
  const avatarSize = size === 'small' ? 'w-4' : 'w-8'
  const textSize = size === 'small' ? 'text-sm' : 'text-base'

  return (
    <Link
      className={`inline-flex items-center text-black font-extrabold ${textSize} ${className}`}
      href={href}
    >
      {avatar && (
        <img
          src={avatar}
          alt="avatar"
          className={`rounded-full ${avatarSize} mr-2`}
        />
      )}
      <span>{name}</span>
    </Link>
  )
}
