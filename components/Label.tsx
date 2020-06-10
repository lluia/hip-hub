import * as React from 'react'

type LabelVariants = 'pr' | 'issue' | 'release'

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: string
}

const variantMap = {
  pr: {
    color: 'bg-aux-purple',
    text: 'Pull Request',
  },
  issue: {
    color: 'bg-aux-blue',
    text: 'Issue',
  },
  release: {
    color: 'bg-aux-green',
    text: 'Release',
  },
}

export function Label({ className, variant, ...props }: LabelProps) {
  const actualVariant = mapVariant(variant)

  if (!actualVariant) return null

  const { color, text } = variantMap[actualVariant]

  return (
    <span
      className={`py-1 px-2 inline-block text-xxs text-white rounded-full ${color} ${className}`}
      {...props}
    >
      {text}
    </span>
  )
}

function mapVariant(variant: string) {
  switch (variant) {
    case 'PullRequest':
      return 'pr'
    case 'Issue':
      return 'issue'
    case 'Release':
      return 'release'
    default:
      return null
  }
}
