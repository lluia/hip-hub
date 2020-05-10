import React from 'react'

export default function App({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <Component {...pageProps} />
    </div>
  )
}
