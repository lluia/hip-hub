import React, { HTMLAttributes } from 'react'
import { Button as ReakitButton } from 'reakit/Button'

type ButtonProps = HTMLAttributes<HTMLButtonElement>

const buttonStyle =
  'bg-action-gradient text-white py-2 px-5 rounded font-bold text-sm cursor-pointer'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <ReakitButton
        className={`${buttonStyle} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
