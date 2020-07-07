import axios from 'axios'
import type {
  GithubNotificationSubject,
  GithubResponse,
  GithubNotificationRepository,
} from '../types/github'

interface ParsedNotification {
  subject: GithubNotificationSubject
  repository: GithubNotificationRepository
}

async function getGithubToken() {
  try {
    const {
      data: {
        account: { accessToken },
      },
    } = await axios.get('/api/github/get-token')
    return accessToken
  } catch (e) {
    return undefined
  }
}

function parseNotifications(data: GithubResponse | null) {
  if (!data) return null
  const { data: notifications } = data

  return Object.keys(notifications).reduce<ParsedNotification[]>((acc, key) => {
    const { subject, repository } = notifications[key]
    return [...acc, { subject, repository }]
  }, [])
}

export { getGithubToken, parseNotifications }
