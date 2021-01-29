import * as React from 'react'
import cxs from 'classnames'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  renderHeader?(): React.ReactNode | null
}

const boxStyle = cxs('bg-white', 'shadow-xl', 'relative', 'flex')

export function Box({ renderHeader, children, ...rest }: BoxProps) {
  const headerCSS = renderHeader ? 'rounded-bl roundedbr' : 'rounded'

  return (
    <div {...rest}>
      {renderHeader && (
        <div
          className={cxs(
            boxStyle,
            'px-8',
            'py-4',
            'rounded-tl',
            'rounded-tr',
            'flex',
            'flex-row',
            'items-center',
            'justify-start',
            'border-b',
            'border-grey',
            'border-grey-light-x3',
            'border-solid'
          )}
        >
          {renderHeader()}
        </div>
      )}
      <div className={cxs(boxStyle, headerCSS, 'p-8', 'flex-col')}>
        {children}
      </div>
    </div>
  )
}
