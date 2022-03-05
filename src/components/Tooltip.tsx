import * as React from 'react'
import {
  Tooltip as ReakitTooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip'
import { Button } from 'reakit/Button'
import { css } from 'emotion'

interface TooltipProps {
  children: React.ReactElement | string
  target: React.ReactElement
}

const arrowStyle = css`
  svg path:nth-of-type(1) {
    fill: transparent;
  }
  svg path:nth-of-type(2) {
    fill: #263238;
  }
`

export function Tooltip({ children, target }: TooltipProps) {
  const tooltip = useTooltipState()

  return (
    <div className="relative">
      <TooltipReference {...tooltip} className="cursor-default" as={Button}>
        {target}
      </TooltipReference>
      <ReakitTooltip {...tooltip}>
        <div className="bg-black text-xxs text-grey rounded px-2 py-1">
          <TooltipArrow {...tooltip} className={arrowStyle} />
          {children}
        </div>
      </ReakitTooltip>
    </div>
  )
}
