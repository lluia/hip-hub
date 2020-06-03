import React from 'react'

interface ButtonProps {
  children: string
}

export const Button = ({ children }: ButtonProps) => {
  const buttonStyle =
    'bg-action-gradient text-white py-3 px-6 rounded-lg font-bold text-sm'
  return <button className={buttonStyle}>{children}</button>
}
