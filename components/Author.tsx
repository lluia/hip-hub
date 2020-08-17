import * as React from 'react'
import { Link } from './'

interface AuthorProps {
  avatar: string
  name: string
  url: string
}

export function Author({ avatar, name, url }: AuthorProps) {
  return (
    <Link className="inline-flex items-center ml-3" href={url}>
      <img src={avatar} className="rounded-full w-8 mr-2" />
      {name}
    </Link>
  )
}
