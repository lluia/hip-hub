import httpProxyMiddleware from 'next-http-proxy-middleware'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({
    req,
  })

  res.setHeader('Content-Type', 'application/json')

  return httpProxyMiddleware(req, res, {
    xfwd: true,
    target: 'https://api.github.com',
    pathRewrite: {
      '^/api/github': '/',
    },
    headers: {
      Authorization: `token ${session?.accessToken}`,
    },
  })
}
