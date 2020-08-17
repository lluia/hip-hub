import { buildAutRoute, apiBase } from '../../../utils'
import type { FetchContext } from '../../../utils'

const route = buildAutRoute(async (token: string, ctx: FetchContext) => {
  const {
    query: { id },
  } = ctx.req

  const threadResponse = await fetch(`${apiBase}/notifications/threads/${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })

  const releaseThread = await threadResponse.json()

  const release = await fetch(releaseThread.subject.url, {
    headers: {
      Authorization: `token ${token}`,
    },
  })

  return release
})

export default route
