import { buildAutRoute, apiBase } from '../../../utils'
import type { FetchContext } from '../../../utils'

const route = buildAutRoute(async (token: string, ctx: FetchContext) => {
  const {
    query: { id },
  } = ctx.req

  const response = await fetch(`${apiBase}/notifications/threads/${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })

  const thread = await response.json()

  const notification = await fetch(thread.subject.url, {
    headers: {
      Authorization: `token ${token}`,
    },
  })

  return notification
})

export default route
