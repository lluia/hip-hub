import React, { HTMLAttributes } from 'react'

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as: HeadingTags | 'span'
  size?: HeadingTags
}

const tagToStyleMap: { [k in HeadingProps['as']]: string } = {
  h1: 'text-5xl leading-tight font-bold font-display',
  h2: 'text-4xl leading-tight font-bold font-display',
  h3: 'text-3xl leading-tight font-bold font-display',
  h4: 'text-2xl leading-snug font-bold font-display',
  h5: 'text-lg leading-snug font-bold font-display',
  h6: 'text-base leading-snug font-bold font-display',
  span: 'text-base leading-normal font-bold font-display',
}

export const Heading = ({ className, ...props }: HeadingProps) => {
  const Tag = props.as || 'h1'
  const style = tagToStyleMap[props.size || props.as]

  return <Tag className={`${className} ${style}`} {...props} />
}
