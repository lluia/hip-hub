import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import type { JWTPayload } from '../types/'

export function buildAutRoute(fetcher: (token: string) => Promise<Response>) {
  return async function endpoint(req: NextApiRequest, res: NextApiResponse) {
    const { hhSessionToken } = req.cookies

    if (!hhSessionToken) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Please authenticate on Github' }))
    }

    try {
      const session = verify(
        hhSessionToken,
        process.env.JWT_SECRET!
      ) as JWTPayload

      const response = await fetcher(session.token)
      const data = await response.json()

      res.statusCode = 200
      res.end(JSON.stringify(data))
    } catch (e) {
      res.statusCode = 500
      res.end(JSON.stringify({ error: e.message }))
    }
  }
}

export const apiBase = 'https://api.github.com'
