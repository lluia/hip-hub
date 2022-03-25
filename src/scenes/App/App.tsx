import React from 'react'
import { Loading, Navbar } from '../../components'
import { useApp } from './useApp'

interface Props {
  children: React.ReactNode
}

export function App({ children }: Props) {
  const { sessionStatus, redirecting } = useApp()

  if (sessionStatus === 'loading' || redirecting) {
    return <Loading />
  }

  return (
    <div className="min-h-screen max-w-screen-lg m-auto px-4">
      <Navbar />
      {children}
    </div>
  )
}
