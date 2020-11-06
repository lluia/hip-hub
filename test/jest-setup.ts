import { cache } from 'swr'
import { server } from './server/server'
import 'isomorphic-fetch'

/**
 * Mock server
 */
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

/**
 * SWR cache clean-up
 */
beforeEach(() => {
  cache.clear()
})
