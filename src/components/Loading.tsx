import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export function Loading() {
  return (
    <div
      className="spinner absolute top-0 left-0 w-full h-full flex items-center justify-center"
      data-testid="LOADING_SPINNER"
    >
      <FontAwesomeIcon icon={faSpinner} size="2x" spin pulse />
    </div>
  )
}
