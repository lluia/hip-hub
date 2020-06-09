import * as React from 'react'
import useSWR from 'swr'
import type { ConfigInterface } from 'swr'
import { TokenContext } from '../context'

export function useRequest(path: string, config?: ConfigInterface) {
  const token = React.useContext(TokenContext)
  return useSWR(token ? path : null, config)
}
