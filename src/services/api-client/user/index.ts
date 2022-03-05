import { log } from '../../logger'
import { isFailedRequest } from '../utils'

export async function fetchUser() {
  const response = await fetch('/api/github/user')
  console.log(response.status !== 200)
  if (isFailedRequest(response))
    log({
      message: `An error happened trying to fetch user details`,
      variant: 'error',
    })

  const user = response.json()
  return user
}
