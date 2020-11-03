import React, { HTMLAttributes } from 'react'

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  onPress?: () => void
  href?: string
}

export function Link({ className, onPress, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onPress && onPress()
  }

  return (
    <a
      className={`text-link cursor-pointer ${className}`}
      onClick={onPress ? handleClick : undefined}
      {...props}
    />
  )
}
