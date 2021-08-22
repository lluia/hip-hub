import httpProxyMiddleware from 'next-http-proxy-middleware'
import { handleAuth } from '../../../utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = handleAuth(req)

  res.setHeader('Content-Type', 'application/json')

  if (!session) res.status(401).send({ error: 'Client needs authentication' })

  return httpProxyMiddleware(req, res, {
    xfwd: true,
    target: 'https://api.github.com',
    pathRewrite: {
      '^/api/github': '/',
    },
    headers: {
      Authorization: `token ${session?.token}`,
    },
  })
}
