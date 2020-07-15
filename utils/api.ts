import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import axios from 'axios'
import type { JWTPayload } from '../types/'
import type { AxiosResponse } from 'axios'

export function buildAutRoute(
  fetcher: (token: string) => Promise<AxiosResponse<unknown>>
) {
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

      res.statusCode = 200
      res.end(JSON.stringify(response.data))
    } catch (e) {
      res.statusCode = 500
      res.end(JSON.stringify({ error: e.message }))
    }
  }
}

export const client = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
})
