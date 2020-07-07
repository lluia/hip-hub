import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import axios from 'axios'

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { code, state },
    } = req

    if (state !== process.env.AUTH_STATE)
      throw new Error('[HIP HUB]: Mismatch between client states on OAuth Flow')

    const { data: tokenResponse } = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&state=${process.env.AUTH_STATE}`,
      null,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    const { data: userResponse } = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `token ${tokenResponse.access_token}`,
        },
      }
    )

    const signedJWT = jwt.sign(
      {
        id: userResponse.id,
        name: userResponse.name,
        email: userResponse.email,
        token: tokenResponse.access_token,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '6h' }
    )

    res.statusCode = 302
    res.setHeader('Set-Cookie', `hhToken=${signedJWT}; HttpOnly`)
    res.setHeader('Location', `/`)
    res.end('Love ya 💚')
  } catch (e) {
    res.statusCode = 500
    res.end({ error: `[HIP HUB]: ${e.message}` })
  }
}
