import * as React from 'react'
import { Link } from './'
import type { LinkProps } from './'

interface AuthorProps extends LinkProps {
  avatar: string
  name: string
  url: string
}

export function Author({ avatar, name, url, className }: AuthorProps) {
  return (
    <Link
      className={`inline-flex items-center ml-3  text-black font-extrabold ${className}`}
      href={url}
    >
      <img src={avatar} className="rounded-full w-8 mr-2" />
      {name}
    </Link>
  )
}
