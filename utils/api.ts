import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import type { JWTPayload } from '../types/'

export function buildAutRoute(fetcher: (token: string) => Promise<Response>) {
  return async function endpoint(req: NextApiRequest, res: NextApiResponse) {
    const { hhSessionToken } = req.cookies

    res.setHeader('Content-Type', 'application/json')

    if (!hhSessionToken) {
      res.statusCode = 401
      res.send(JSON.stringify({ error: 'Client needs authentication' }))
      return
    }

    try {
      const session = verify(
        hhSessionToken,
        process.env.JWT_SECRET!
      ) as JWTPayload

      const response = await fetcher(session.token)
      const data = await response.json()

      res.statusCode = 200
      res.send(JSON.stringify(data))
    } catch (e) {
      res.statusCode = 500
      res.send(JSON.stringify({ error: e.message }))
    }
  }
}

export const apiBase = 'https://api.github.com'

export const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json())
