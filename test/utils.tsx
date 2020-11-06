import * as React from 'react'
import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { fetcher } from '../utils'

const Providers = ({ children }: any) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, fetcher }}>{children}</SWRConfig>
  )
}

export const renderPage = (ui: any, options?: any) =>
  render(ui, { wrapper: Providers, ...options })
