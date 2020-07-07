import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hhToken } = req.cookies

  res.setHeader('Content-Type', 'application/json')

  if (!hhToken) {
    res.statusCode = 401
    res.end(JSON.stringify({ error: 'Please authenticate on Github' }))
  }

  try {
    const result = jwt.verify(hhToken, process.env.JWT_SECRET!)
    const response = await axios.get('https://api.github.com/notifications', {
      headers: {
        Authorization: `token ${result.token}`,
      },
    })
    res.statusCode = 200
    res.end(JSON.stringify(response.data))
  } catch (e) {
    res.statusCode = 500
    res.end(JSON.stringify({ error: 'ups' }))
  }
}
