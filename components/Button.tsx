import React, { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const buttonStyle =
  'bg-action-gradient text-white py-2 px-5 rounded font-bold text-sm cursor-pointer'

export const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={`${buttonStyle} ${className}`} {...props} />
}
