import * as React from 'react'
import { Heading } from './Heading'
import Link from 'next/link'

interface LinkProps {
  url: string
  as?: string
}

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  goTo?: LinkProps | null
}

Card.Title = Heading
Card.Content = CardContent

export function Card({ className, goTo, ...props }: DivProps) {
  const content = (
    <div
      className={`bg-white p-6 relative border-b border-solid border-white shadow rounded mb-5 ${className}`}
      {...props}
    />
  )

  return goTo ? (
    isExternalUrl(goTo.url) ? (
      <a href={goTo.url} className="block cursor-pointer">
        {content}
      </a>
    ) : (
      <Link href={goTo.as || ''} as={goTo.url}>
        <a>{content}</a>
      </Link>
    )
  ) : (
    content
  )
}

function CardContent({ ...props }: DivProps) {
  return <div {...props} />
}

function isExternalUrl(url: string) {
  return url[0] !== '/'
}
