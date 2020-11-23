import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from './'
import { useRouter } from 'next/router'

type BackProps = React.HTMLAttributes<HTMLAnchorElement>

export function Back({ className, ...rest }: BackProps) {
  const router = useRouter()
  return (
    <Link
      className={`text-action whitespace-nowrap text-sm ${className}`}
      onPress={router.back}
      {...rest}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-3" />
      Back
    </Link>
  )
}
