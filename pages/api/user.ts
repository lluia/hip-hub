import { buildAutRoute, client } from '../../utils'

const route = buildAutRoute((token: string) =>
  client.get('/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  })
)

export default route
