import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { hhSessionToken } = req.cookies
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('hhSessionToken', hhSessionToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0, // Delete the cookie
      })
    )
  } catch (e) {
    // do nothing...
  }

  res.status(302).setHeader('Location', `/`)

  res.end()
}
