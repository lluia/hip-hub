import { buildAutRoute, client } from '../../utils'

const route = buildAutRoute((token: string) =>
  client.get('/notifications', {
    headers: {
      Authorization: `token ${token}`,
    },
  })
)

export default route
