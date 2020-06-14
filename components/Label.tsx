import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCodeBranch,
  faBolt,
  faCommentAlt,
} from '@fortawesome/free-solid-svg-icons'

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: string
}

export function Label({ className, variant, ...props }: LabelProps) {
  const actualVariant = mapVariant(variant)

  if (!actualVariant) return null

  const { color, text, icon } = actualVariant

  return (
    <span
      className={`inline-flex items-center text-xs ${color} ${className}`}
      {...props}
    >
      <span className="inline-block mr-2">{text}</span>
      {icon}
    </span>
  )
}

function mapVariant(variant: string) {
  switch (variant) {
    case 'PullRequest':
      return {
        color: 'text-aux-purple',
        text: 'Pull Request',
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      }
    case 'Issue':
      return {
        color: 'text-aux-blue',
        text: 'Story',
        icon: <FontAwesomeIcon icon={faCommentAlt} />,
      }
    case 'Release':
      return {
        color: 'text-aux-green',
        text: 'Release',
        icon: <FontAwesomeIcon icon={faBolt} />,
      }
    default:
      return null
  }
}
