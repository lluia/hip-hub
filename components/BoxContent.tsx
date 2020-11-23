import * as React from 'react'

type BoxContentProps = React.HTMLAttributes<HTMLDivElement>

export function BoxContent({ className, ...rest }: BoxContentProps) {
  return (
    <div
      className={`p-8 bg-white shadow-xl rounded relative flex flex-col ${className}`}
      {...rest}
    />
  )
}
