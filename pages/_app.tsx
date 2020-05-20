import React from 'react'
import { AppProps } from 'next/app'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
      <Component {...pageProps} />
    </div>
  )
}
