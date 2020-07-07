import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(302)
    .setHeader(
      'Location',
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&state=${process.env.AUTH_STATE}`
    )

  res.end()
}
