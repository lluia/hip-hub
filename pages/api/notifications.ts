import { buildAutRoute, apiBase } from '../../utils'

const route = buildAutRoute((token: string) =>
  fetch(`${apiBase}/notifications`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
)

export default route
