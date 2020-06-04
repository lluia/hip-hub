import React, { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

const baseStyle = 'text-5xl font-extrabold'

const tagToStyleMap: { [k in HeadingProps['as']]: string } = {
  h1: 'text-5xl leading-none mb-8',
  h2: 'text-4xl leading-tight mb-8',
  h3: 'text-3xl leading-tight mb-6',
  h4: 'text-2xl leading-snug mb-6',
  h5: 'text-xl leading-snug mb-5',
  h6: 'text-lg leading-snug mb-5',
  span: 'text-lg leading-normal mb-3',
}

export const Heading = ({ className, ...props }: HeadingProps) => {
  const Tag = props.as

  return (
    <Tag
      className={`${baseStyle} ${tagToStyleMap[props.as]}  ${className}`}
      {...props}
    />
  )
}
