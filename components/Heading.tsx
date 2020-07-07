import React, { HTMLAttributes } from 'react'

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as: HeadingTags | 'span'
  size?: HeadingTags
}

const tagToStyleMap: { [k in HeadingProps['as']]: string } = {
  h1: 'text-5xl leading-none mb-8 font-extrabold',
  h2: 'text-4xl leading-tight mb-8 font-extrabold',
  h3: 'text-3xl leading-tight mb-6 font-bold',
  h4: 'text-2xl leading-snug mb-6 font-bold',
  h5: 'text-xl leading-snug mb-5 font-bold',
  h6: 'text-lg leading-snug mb-5 font-bold',
  span: 'text-lg leading-normal mb-3 font-bold',
}

export const Heading = ({ className, ...props }: HeadingProps) => {
  const Tag = props.as || 'h1'
  const style = tagToStyleMap[props.size || props.as]

  return <Tag className={`${style} ${className}`} {...props} />
}
