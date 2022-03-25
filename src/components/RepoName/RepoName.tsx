import * as React from 'react'
import { GithubUser } from '../../types/github'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

interface RepoNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  owner: GithubUser
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
      className={`text-blue-grey text-opacity-25 text-xxs font-mono flex items-center ${className}`}
      {...rest}
    >
      {isOrg ? (
        <img
          src={avatar_url}
          className="rounded-full w-5 inline-block mr-2 opacity-50"
          data-testid="ORG_AVATAR"
          alt="Repository avatar"
        />
      ) : (
        <FontAwesomeIcon
          icon={faCube}
          className="mr-2 inline-block w-4"
          data-testid="DEFAULT_AVATAR"
        />
      )}
      {children}
    </span>
  )
}
