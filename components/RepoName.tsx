import * as React from 'react'
import { GithubNotificationRepositoryOwner } from '../types/github'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

interface RepoNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  owner: GithubNotificationRepositoryOwner
}

export function RepoName({
  children,
  className = '',
  owner: { type: OwnerType, avatar_url },
  ...rest
}: RepoNameProps) {
  const isOrg = OwnerType === 'Organization'

  return (
    <span
      className={`text-blue-grey text-opacity-25 text-xs3 tracking-wide font-mono flex items-center ${className}`}
      {...rest}
    >
      {isOrg ? (
        <img
          src={avatar_url}
          className="rounded-full w-3 inline-block mr-2 opacity-50"
        />
      ) : (
        <FontAwesomeIcon icon={faCube} className="mr-2 inline-block w-4" />
      )}
      {children}
    </span>
  )
}
