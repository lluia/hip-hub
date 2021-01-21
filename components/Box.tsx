import * as React from 'react'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  renderHeader?(): React.ReactNode | null
}

const boxStyle = 'bg-white shadow-xl relative'

export function Box({ renderHeader, children, ...rest }: BoxProps) {
  return (
    <div {...rest}>
      {renderHeader && (
        <div
          className={`${boxStyle} px-8 py-4 rounded-tl rounded-tr flex flex-row items-center border-b border-grey-light-x3 border-solid`}
        >
          {renderHeader()}
        </div>
      )}
      <div
        className={`${boxStyle} ${
          renderHeader ? 'rounded-bl roundedbr' : 'rounded'
        } p-8`}
      >
        {children}
      </div>
    </div>
  )
}
