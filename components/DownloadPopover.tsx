import * as React from 'react'
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from 'reakit/Popover'
import { css } from 'emotion'
import { faDownload, faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from './Button'
import { Link } from './Link'

interface DownloadPopoverProps extends React.HTMLAttributes<HTMLButtonElement> {
  zip: string
  tar: string
}

const popoverStyle = css`
  svg path:nth-of-type(1) {
    fill: #e9e9e9;
  }
  svg path:nth-of-type(2) {
    fill: #fafafa;
  }
`

export function DownloadPopover({ zip, tar, ...rest }: DownloadPopoverProps) {
  const popover = usePopoverState()

  return (
    <>
      <PopoverDisclosure {...popover} {...rest}>
        <Button variant="neutral" size="s">
          <FontAwesomeIcon
            icon={faDownload}
            aria-label="download icon"
            className="text-base mr-2"
          />
          Download
        </Button>
      </PopoverDisclosure>
      <Popover
        {...popover}
        className="z-20 bg-white p-4 border border-near-grey flex justify-center rounded w-32 shadow"
        aria-label="Welcome"
      >
        <PopoverArrow {...popover} className={`${popoverStyle}`} />
        <div>
          <Link
            className="uppercase text-xxs text-action font-bold flex flex-row mb-4"
            href={zip}
          >
            <FontAwesomeIcon
              icon={faFileArchive}
              aria-label="download icon"
              className="text-sm mr-2 text-link"
            />
            Zip
          </Link>
          <Link
            className="uppercase text-xxs text-action font-bold flex flex-row "
            href={tar}
          >
            <FontAwesomeIcon
              icon={faFileArchive}
              aria-label="download icon"
              className="text-sm mr-2 text-link"
            />
            Tar
          </Link>
        </div>
      </Popover>
    </>
  )
}
