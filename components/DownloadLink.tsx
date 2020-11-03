import * as React from 'react'
import { faParachuteBox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, LinkProps } from './Link'

export function DownloadLink({ children, ...rest }: LinkProps) {
  return (
    <Link
      className="uppercase text-xxs text-black font-bold ml-4 inline-flex items-center"
      {...rest}
    >
      {children}{' '}
      <FontAwesomeIcon
        icon={faParachuteBox}
        aria-label="cardboard box emoji"
        className="text-lg text-action ml-1"
      />
    </Link>
  )
}
