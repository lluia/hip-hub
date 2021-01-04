import * as React from 'react'

interface PageWrapProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export function PageWrap(props: PageWrapProps) {
  return (
    <main
      className={`bg-dot-pattern min-h-screen mt-32 mx-auto ${
        props.className || ''
      }`}
      {...props}
    />
  )
}
