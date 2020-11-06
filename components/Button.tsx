import React, { HTMLAttributes } from 'react'
import { Button as ReakitButton } from 'reakit/Button'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'text'
  size?: 'm' | 's'
}

const baseStyle = 'rounded font-bold cursor-pointer'

const styleMap = {
  primary: `${baseStyle} bg-action-gradient text-white`,
  neutral: `${baseStyle} bg-near-grey text-black border-none shadow-xs`,
  text: `text-link`,
}

const sizeMap = {
  m: 'py-2 px-5 text-sm',
  s: 'py-1 px-3 text-sm',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'm', ...props }, ref) => {
    return (
      <ReakitButton
        className={`${styleMap[variant]} ${sizeMap[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
