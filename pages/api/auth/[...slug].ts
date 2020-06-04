import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'

const options = {
  site: process.env.APP_URL,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope:
        'user public_repo repo repo_deployment repo:status read:repo_hook read:org read:public_key read:gpg_key',
    }),
  ],
  database: process.env.DATABASE_URL,
  jwt: true,
}

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, options)
}
