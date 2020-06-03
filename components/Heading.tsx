import React from 'react'

interface HeadingProps {
  children: string
}

export const Heading = ({ children }: HeadingProps) => {
  const headingStyle = 'text-5xl font-extrabold'
  return <h1 className={headingStyle}>{children}</h1>
}
