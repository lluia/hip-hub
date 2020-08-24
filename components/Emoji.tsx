import * as React from 'react'

interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  ['aria-label']: string
}

export function Emoji({ children, ...rest }: EmojiProps) {
  return (
    <span role="img" className="inline-block mx-1" {...rest}>
      {children}
    </span>
  )
}
