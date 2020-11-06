import { rest } from 'msw'
import * as mocks from './mocks'

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/notifications`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mocks.notificationsMock))
    }
  ),
]
