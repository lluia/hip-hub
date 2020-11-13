import { cache } from 'swr'
import 'isomorphic-fetch'

/**
 * SWR cache clean-up
 */
beforeEach(() => {
  cache.clear()
})
