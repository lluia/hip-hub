import * as React from 'react'
import { useState } from 'react'
import { mapVariant, NOTIFICATION_VARIANT } from '../constants'

type Props = {
  onSelect(state: NOTIFICATION_VARIANT[]): void
}

interface FilterProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: NOTIFICATION_VARIANT
}

const Filter: React.FC<FilterProps> = ({ children, variant, ...rest }) => {
  const variantType = mapVariant(variant)

  return (
    <button
      className={`text-xs text-white mr-5 cursor-pointer select-none bg-${variantType?.color} py-1 px-3 rounded`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function NotificationFilters({ onSelect }: Props) {
  const [selected, setSelected] = useState<NOTIFICATION_VARIANT[]>([])
  const setSelectedFilters = (filter: NOTIFICATION_VARIANT) =>
    setSelected(selected.concat([filter]))

  React.useEffect(() => {
    if (selected) onSelect(selected)
  }, [selected, onSelect])

  return (
    <div className="flex items-center justify-center">
      <span className="text-sm text-grey">Filter by:</span>
      <div className="flex flex-row my-4 ml-4">
        <Filter
          variant={NOTIFICATION_VARIANT.PR}
          onClick={() => setSelectedFilters(NOTIFICATION_VARIANT.PR)}
        >
          PR
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Story}
          onClick={() => setSelectedFilters(NOTIFICATION_VARIANT.Story)}
        >
          Story
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Release}
          onClick={() => setSelectedFilters(NOTIFICATION_VARIANT.Release)}
        >
          Release
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Discussion}
          onClick={() => setSelectedFilters(NOTIFICATION_VARIANT.Discussion)}
        >
          Discussion
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Commit}
          onClick={() => setSelectedFilters(NOTIFICATION_VARIANT.Commit)}
        >
          Commit
        </Filter>
      </div>
    </div>
  )
}
