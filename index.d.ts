import type { ConnectionOptions } from 'typeorm'
import type { NextApiRequest, NextApiResponse } from 'next'

declare module 'next-auth' {
  declare function NextAuth(
    req: NextApiRequest,
    res: NextApiResponse,
    options?: InitOptions
  ): Promise<void>

  interface InitOptions {
    site: string
    // TODO: type providers
    providers: unknown[]
    databse: ConnectionOptions
    secret?: string
    jwt?: boolean
    jwtSecret?: string
    sessionMaxAge?: number
    sessionUpdateAge?: number
    verificationMaxAge?: number
    pages?: PageOptions
    debug?: boolean
    basePath?: string
    // TODO: type options
    callbackUrlHandler?: (url: string, options: unknown) => Promise<void>
    // TODO: type adapters
    adapter?: unknown[]
    useSecureCookies?: boolean
    cookies?: Cookies
  }
}
