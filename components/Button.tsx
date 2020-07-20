import React, { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const buttonStyle =
  'bg-action-gradient text-white py-2 px-5 rounded font-bold text-sm cursor-pointer'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button className={`${buttonStyle} ${className}`} ref={ref} {...props} />
    )
  }
)

Button.displayName = 'Button'
