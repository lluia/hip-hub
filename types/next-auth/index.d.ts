/**
 * @note While types for 'next-auth' are being worked on: DefinitelyTyped/pull/45775, add manual declarations here to make the CI pass
 */
import { ConnectionOptions } from 'typeorm'
import { NextApiRequest, NextApiResponse } from 'next'

interface InitOptions {
  site: string
  providers: ReturnType<unknown>[]
  database?: ConnectionOptions | string
}

declare function NextAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  options?: InitOptions
): Promise<void>

export default NextAuth
