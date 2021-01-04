import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCodeBranch,
  faBong,
  faFlag,
  faBahai,
  faComments,
} from '@fortawesome/free-solid-svg-icons'
import { GithubNotificationSubject } from '../types/github'
import { css } from 'emotion'
import { NOTIFICATION_VARIANTS } from '../constants'

interface NotificationVariantProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: GithubNotificationSubject['type']
}

const customStyle = css`
  min-width: 5.5rem;
`

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
      className={`inline-flex text-xs items-center font-light ${color} ${customStyle} ${className} `}
      {...props}
    >
      {icon} <span className="ml-2 text-xs">{text}</span>
    </span>
  )
}

export function mapVariant(variant: string) {
  switch (variant) {
    case NOTIFICATION_VARIANTS.PR:
      return {
        color: 'text-berry',
        text: 'Pull Request',
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      }
    case NOTIFICATION_VARIANTS.Story:
      return {
        color: 'text-deepsea',
        text: 'Story',
        icon: <FontAwesomeIcon icon={faFlag} />,
      }
    case NOTIFICATION_VARIANTS.Release:
      return {
        color: 'text-orange',
        text: 'Release',
        icon: <FontAwesomeIcon icon={faBong} />,
      }
    case NOTIFICATION_VARIANTS.Commit:
      return {
        color: 'text-near-black',
        text: 'Commit',
        icon: <FontAwesomeIcon icon={faBahai} />,
      }
    case NOTIFICATION_VARIANTS.Discussion:
      return {
        color: 'text-matcha',
        text: 'Discussion',
        icon: <FontAwesomeIcon icon={faComments} />,
      }
    default:
      return null
  }
}
