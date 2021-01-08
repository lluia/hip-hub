import * as React from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'

export function Markdown({ className, ...props }: ReactMarkdownProps) {
  return <ReactMarkdown className={`markdown-body ${className}`} {...props} />
}
