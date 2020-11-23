import * as React from 'react'
import { Heading, HeadingProps } from './Heading'

interface DetailHeaderProps {
  children: React.ReactNode
}

const Title = (props: Omit<HeadingProps, 'as'>) => (
  <Heading as="h1" size="h3" {...props} />
)

DetailHeader.Title = Title

export function DetailHeader({ children }: DetailHeaderProps) {
  return (
    <div className="flex flex-row justify-center items-center relative">
      <div className="flex flex-row items-center mb-4">{children}</div>
    </div>
  )
}
