import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json')

  try {
    const {
      query: { code, state },
    } = req

    if (state !== process.env.AUTH_STATE) {
      res.statusCode = 401
      res.send(JSON.stringify({ error: 'Failed auth state verification' }))
      return
    }

    const tokenResponse = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&state=${process.env.AUTH_STATE}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )

    const token = await tokenResponse.json()

    const userResponse = await fetch('https://api.github.com/user', {
      method: 'POST',
      headers: {
        Authorization: `token ${token.access_token}`,
      },
    })

    const user = await userResponse.json()

    const signedJWT = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token.access_token,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '6h' }
    )

    res.statusCode = 302
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('hhSessionToken', signedJWT, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // Sessions expire after 1 week of being idle
      })
    )

    res.setHeader('Location', `/`)
    res.end()
  } catch (e) {
    res.statusCode = 500
    res.end(JSON.stringify({ error: `[HIP HUB]: ${e.message}` }))
  }
}
