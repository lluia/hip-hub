import { buildAutRoute, apiBase } from '../../utils'

const route = buildAutRoute((token: string) =>
  fetch(`${apiBase}/user`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
)

export default route
