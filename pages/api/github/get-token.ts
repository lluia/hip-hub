import { getConnection } from 'typeorm'
import Adapters from 'next-auth/adapters'
import * as NextAuth from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

interface SessionConnection {
  userId: string
}

export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let account = null,
    error = null

  try {
    const connection = getConnection()
    const session = await NextAuth.getSession({ req })
    const { model: accountModel } = Adapters.TypeORM.Models.Account
    const { model: sessionModel } = Adapters.TypeORM.Models.Session

    const sessionConnection = await connection
      .getRepository(sessionModel)
      .findOne({ accessToken: session?.accessToken })

    account = await connection
      .getRepository(accountModel)
      .findOne({ userId: (sessionConnection as SessionConnection).userId })
  } catch (e) {
    error = e.message
  }

  res.status(200).send({ account, error })
}
