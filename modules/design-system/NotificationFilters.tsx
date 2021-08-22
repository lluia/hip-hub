import * as React from 'react'
import { useState } from 'react'
import { mapVariant, NOTIFICATION_VARIANT } from '../notification'

type Props = {
  onSelect(state: NOTIFICATION_VARIANT[]): void
}

interface FilterProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: NOTIFICATION_VARIANT
  isActive: boolean
}

const Filter: React.FC<FilterProps> = ({
  children,
  variant,
  isActive,
  ...rest
}) => {
  const variantType = mapVariant(variant)

  return (
    <button
      className={`text-xs text-white mr-5 cursor-pointer select-none bg-${
        variantType?.color
      } ${isActive ? '' : 'opacity-20'} py-1 px-3 rounded`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function NotificationFilters({ onSelect }: Props) {
  const [selected, setSelected] = useState<NOTIFICATION_VARIANT[]>([])
  const noneSelected = selected.length === 0

  const handleFilterSelect = (filter: NOTIFICATION_VARIANT) => {
    if (selected.includes(filter)) {
      setSelected(selected.filter((el: NOTIFICATION_VARIANT) => el !== filter))
    } else {
      setSelected(selected.concat([filter]))
    }
  }

  React.useEffect(() => {
    if (selected) onSelect(selected)
  }, [selected, onSelect])

  return (
    <div className="flex items-center justify-center">
      <span className="text-sm text-grey">Filter by:</span>
      <div className="flex flex-row my-4 ml-4">
        <Filter
          variant={NOTIFICATION_VARIANT.PR}
          onClick={() => handleFilterSelect(NOTIFICATION_VARIANT.PR)}
          isActive={selected.includes(NOTIFICATION_VARIANT.PR) || noneSelected}
        >
          PR
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Story}
          onClick={() => handleFilterSelect(NOTIFICATION_VARIANT.Story)}
          isActive={
            selected.includes(NOTIFICATION_VARIANT.Story) || noneSelected
          }
        >
          Story
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Release}
          onClick={() => handleFilterSelect(NOTIFICATION_VARIANT.Release)}
          isActive={
            selected.includes(NOTIFICATION_VARIANT.Release) || noneSelected
          }
        >
          Release
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Discussion}
          onClick={() => handleFilterSelect(NOTIFICATION_VARIANT.Discussion)}
          isActive={
            selected.includes(NOTIFICATION_VARIANT.Discussion) || noneSelected
          }
        >
          Discussion
        </Filter>
        <Filter
          variant={NOTIFICATION_VARIANT.Commit}
          onClick={() => handleFilterSelect(NOTIFICATION_VARIANT.Commit)}
          isActive={
            selected.includes(NOTIFICATION_VARIANT.Commit) || noneSelected
          }
        >
          Commit
        </Filter>
      </div>
    </div>
  )
}
