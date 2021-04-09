import * as React from 'react'
import { css } from 'emotion'
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
  PopoverStateReturn,
  PopoverDisclosureOptions,
} from 'reakit/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from './Button'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import type { ReactChildren } from '../types/react'

type RandomShape = Record<string, unknown>
type ButtonProps = React.HTMLAttributes<HTMLButtonElement>
type DropdownProps<T = RandomShape> = T & ButtonProps
type DropdownStateProps = { state?: PopoverStateReturn }

type DropdownToggleProps = ReactChildren &
  DropdownStateProps &
  PopoverDisclosureOptions & { icon?: IconDefinition; label?: string }

type DropdownContentProps = ReactChildren & DropdownStateProps

const popoverStyle = css`
  svg path:nth-of-type(1) {
    fill: #e9e9e9;
  }
  svg path:nth-of-type(2) {
    fill: #fafafa;
  }
`

Dropdown.Toggle = DropdownToggle
Dropdown.Content = DropdownContent

export function Dropdown({ children }: DropdownProps<ReactChildren>) {
  const dropdownState = usePopoverState()

  return children ? (
    <>
      {/* @ts-ignore */}
      {React.Children.map(children, (child: React.ReactElement) => {
        const isDropdownChild =
          React.isValidElement(child) &&
          (child.type === DropdownToggle || child.type === DropdownContent)

        if (isDropdownChild) {
          const currentProps =
            typeof child.props === 'object' ? child.props : {}

          const cloneProps = {
            ...currentProps,
            state: dropdownState,
          }

          return React.cloneElement(child, cloneProps)
        }
      })}
    </>
  ) : null
}

function DropdownToggle({
  children,
  state,
  icon,
  label,
  ...rest
}: DropdownToggleProps) {
  const iconProps = icon || {}
  return (
    <PopoverDisclosure {...state} {...rest}>
      {label ? (
        <Button variant="primary" size="s">
          <FontAwesomeIcon
            aria-label="download icon"
            className="text-base mr-2"
            {...iconProps}
          />
          {label}
        </Button>
      ) : (
        children
      )}
    </PopoverDisclosure>
  )
}

function DropdownContent({ children, state }: DropdownContentProps) {
  return (
    <Popover
      {...state}
      className="z-20 bg-white p-4 border border-grey-light flex justify-center rounded w-32 shadow-lg"
      aria-label="Welcome"
    >
      <PopoverArrow {...state} className={`${popoverStyle}`} />
      <div>{children}</div>
    </Popover>
  )
}
