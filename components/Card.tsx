import * as React from 'react'
import { Heading } from './Heading'

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  goTo?: string
}

Card.Title = Heading
Card.Content = CardContent

export function Card({ className, goTo, ...props }: DivProps) {
  const content = (
    <div
      className={`bg-white p-8 relative border-b border-solid border-near-white ${className}`}
      {...props}
    />
  )

  return goTo ? (
    <a href={goTo} className="block cursor-pointer">
      {content}
    </a>
  ) : (
    content
  )
}

function CardContent({ ...props }: DivProps) {
  return <div {...props} />
}
