import React, { HTMLAttributes } from 'react'

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  onPress: () => void
}

export function Link({ className, onPress, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onPress()
  }

  return (
    <a
      className={`text-link cursor-pointer ${className}`}
      onClick={handleClick}
      {...props}
    />
  )
}
