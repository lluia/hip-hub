import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: 'warning' | 'success' | 'error'
}

export function Badge({ variant, className, ...rest }: BadgeProps) {
  return (
    <span
      className={`text-xs bg-${variant}-light rounded-md py-1 px-2 text-black ${className} inline-flex`}
      {...rest}
    />
  )
}
