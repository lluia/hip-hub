import React from 'react'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <Component {...pageProps} />
    </div>
  )
}
