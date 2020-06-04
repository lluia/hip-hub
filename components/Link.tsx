import React, { HTMLAttributes } from 'react'

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {}

const baseStyle = 'text-link'

export function Link({ className, ...props }: LinkProps) {
  return <a className={`${baseStyle} ${className}`} {...props} />
}
