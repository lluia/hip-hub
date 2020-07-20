import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCodeBranch,
  faCheck,
  faFlag,
} from '@fortawesome/free-solid-svg-icons'
import { GithubNotificationSubject } from '../types/github'

interface VariantProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: GithubNotificationSubject['type']
}

export function Variant({ className, children, ...props }: VariantProps) {
  const actualVariant = mapVariant(children)

  if (!actualVariant) return null

  const { color, text, icon } = actualVariant

  return (
    <span
      className={`inline-flex items-center text-xxs py-1 px-2 rounded-full ${color} ${className}`}
      {...props}
    >
      {icon}
      <span className="inline-block ml-1">{text}</span>
    </span>
  )
}

function mapVariant(variant: string) {
  switch (variant) {
    case 'PullRequest':
      return {
        color: 'text-aux-purple',
        text: 'Pull Request',
        icon: <FontAwesomeIcon icon={faCodeBranch} className="w-2" />,
      }
    case 'Issue':
      return {
        color: 'text-aux-blue',
        text: 'Story',
        icon: <FontAwesomeIcon icon={faFlag} className="w-2" />,
      }
    case 'Release':
      return {
        color: 'text-aux-green',
        text: 'Released',
        icon: <FontAwesomeIcon icon={faCheck} className="w-2" />,
      }
    default:
      return null
  }
}
