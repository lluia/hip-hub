import * as React from 'react'

interface PageWrapProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export function PageWrap(props: PageWrapProps) {
  return (
    <main
      className={`min-h-screen max-w-screen-lg mt-10 pt-8 ${
        props.className || ''
      }`}
      {...props}
    />
  )
}
