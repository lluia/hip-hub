import * as React from 'react'

type BoxContentProps = React.HTMLAttributes<HTMLDivElement>

export function BoxContent({ className, ...rest }: BoxContentProps) {
  return (
    <div
      className={` bg-white p-8 shadow rounded relative ${className}`}
      {...rest}
    />
  )
}
