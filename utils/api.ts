import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import type { JWTPayload } from '../types/'

export interface FetchContext {
  req: NextApiRequest
  res: NextApiResponse
}

type Fetcher = (token: string, ctx: FetchContext) => Promise<Response>

export function buildAutRoute(fetcher: Fetcher) {
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

      const response = await fetcher(session.token, { req, res })
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

export const fetcher = async (
  input: RequestInfo,
  init?: RequestInit | undefined
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}${input}`, init)
  const data = res.json()
  return data
}
