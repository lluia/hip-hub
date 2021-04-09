import * as React from 'react'
import { faDownload, faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Dropdown } from '../../components'
import { PopoverDisclosureProps } from 'reakit/ts'

interface DownloadDropdownProps extends PopoverDisclosureProps {
  zip: string
  tar: string
}

export function DownloadDropdown({ zip, tar, ...rest }: DownloadDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle icon={faDownload} label="Download" {...rest} />
      <Dropdown.Content>
        <>
          <Link
            className="uppercase text-xxs text-action font-bold flex flex-row mb-4"
            href={zip}
          >
            <FontAwesomeIcon
              icon={faFileArchive}
              aria-label="download icon"
              className="text-sm mr-2 text-action"
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
              className="text-sm mr-2 text-action"
            />
            Tar
          </Link>
        </>
      </Dropdown.Content>
    </Dropdown>
  )
}
