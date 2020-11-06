import * as React from 'react'
import { useCheckboxState, Checkbox, CheckboxProps } from 'reakit/Checkbox'
import { css } from 'emotion'
import { NotificationVariant, NOTIFICATION_VARIANTS } from '../constants'

interface NotificationFiltersProps {
  onSelect(state: NotificationVariant[]): void
}

const FilterLabel: React.FC = ({ children }) => {
  return (
    <label className="text-xs text-dark mr-5 cursor-pointer select-none">
      {children}
    </label>
  )
}

const FilterCheck: React.FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      className={`bg-white border border-grey rounded shadow-inner mr-1 cursor-pointer ${checkBoxResetStyle}`}
    />
  )
}

export function NotificationFilters({ onSelect }: NotificationFiltersProps) {
  const checkbox = useCheckboxState({ state: [] })
  const checkboxState = checkbox.state as NotificationVariant[]

  React.useEffect(() => {
    onSelect(checkboxState)
  }, [checkboxState, onSelect])

  return (
    <div className="flex flex-row my-4">
      <FilterLabel>
        <FilterCheck {...checkbox} value={NOTIFICATION_VARIANTS.PR} />
        PR
      </FilterLabel>
      <FilterLabel>
        <FilterCheck {...checkbox} value={NOTIFICATION_VARIANTS.Story} />
        Story
      </FilterLabel>
      <FilterLabel>
        <FilterCheck {...checkbox} value={NOTIFICATION_VARIANTS.Release} />
        Release
      </FilterLabel>
      <FilterLabel>
        <FilterCheck {...checkbox} value={NOTIFICATION_VARIANTS.Discussion} />
        Discussion
      </FilterLabel>
      <FilterLabel>
        <FilterCheck {...checkbox} value={NOTIFICATION_VARIANTS.Commit} />
        Commit
      </FilterLabel>
    </div>
  )
}

const checkBoxResetStyle = css`
  width: 15px;
  height: 15px;
  appearance: none;
  outline: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    width: 65%;
    height: 60%;
    opacity: 0;
    background-color: grey;
    transition: 0.1s ease opacity;
    border-radius: 2px;
  }
  &:checked {
    &:after {
      opacity: 1;
    }
  }
`
