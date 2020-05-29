import { getConnection } from 'typeorm'
import Adapters from 'next-auth/adapters'
import NextAuth from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let account = null,
    error = null
  try {
    const connection = getConnection()
    const { accessToken } = await NextAuth.session({ req })
    const { model: accountModel } = Adapters.TypeORM.Models.Account
    const { model: sessionModel } = Adapters.TypeORM.Models.Session

    const { userId } = await connection
      .getRepository(sessionModel)
      .findOne({ accessToken: accessToken })

    account = await connection
      .getRepository(accountModel)
      .findOne({ userId: userId })
  } catch (e) {
    error = e.message
  }

  res.status(200).send({ account, error })
}
