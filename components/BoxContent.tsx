import * as React from 'react'

type BoxContentProps = React.HTMLAttributes<HTMLDivElement>

export function BoxContent({ className, ...rest }: BoxContentProps) {
  return (
    <div className={` bg-white p-6 shadow rounded ${className}`} {...rest} />
  )
}
