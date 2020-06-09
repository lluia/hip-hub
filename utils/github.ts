import axios from 'axios'
import type { GithubNotificationSubject, GithubResponse } from '../types/github'

async function getGithubToken() {
  const {
    data: {
      account: { accessToken },
    },
  } = await axios.get('/api/github/get-token')
  return accessToken
}

function parseNotifications(data: GithubResponse | null) {
  if (!data) return null
  const { data: notifications } = data

  return Object.keys(notifications).reduce<GithubNotificationSubject[]>(
    (acc, key) => {
      const { subject } = notifications[key]
      return [...acc, subject]
    },
    []
  )
}

export { getGithubToken, parseNotifications }
