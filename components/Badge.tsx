import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: 'warning' | 'success' | 'error'
}

export function Badge({ variant, className, ...rest }: BadgeProps) {
  return (
    <span
      className={`text-sm bg-${variant}-light rounded-full py-1 px-3 ${className}`}
      {...rest}
    />
  )
}
