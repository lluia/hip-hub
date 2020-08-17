import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCodeBranch,
  faBong,
  faFlag,
  faBahai,
} from '@fortawesome/free-solid-svg-icons'
import { GithubNotificationSubject } from '../types/github'

interface NotificationVariantProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: GithubNotificationSubject['type']
}

export function NotificationVariant({
  className,
  children,
  ...props
}: NotificationVariantProps) {
  const actualVariant = mapVariant(children)

  if (!actualVariant) return null

  const { color, icon, text } = actualVariant

  return (
    <span
      className={`inline-flex text-xs items-center ${color} ${className}`}
      {...props}
    >
      {icon} <span className="ml-2 text-xxs">{text}</span>
    </span>
  )
}

function mapVariant(variant: string) {
  switch (variant) {
    case 'PullRequest':
      return {
        color: 'text-aux-purple',
        text: 'PR',
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      }
    case 'Issue':
      return {
        color: 'text-aux-blue',
        text: 'story',
        icon: <FontAwesomeIcon icon={faFlag} />,
      }
    case 'Release':
      return {
        color: 'text-aux-yellow',
        text: 'release',
        icon: <FontAwesomeIcon icon={faBong} />,
      }
    case 'Commit':
      return {
        color: 'text-dark',
        text: 'Commit',
        icon: <FontAwesomeIcon icon={faBahai} />,
      }
    default:
      return null
  }
}
