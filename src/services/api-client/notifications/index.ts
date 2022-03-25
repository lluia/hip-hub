import { log } from '../../logger'
import { getUrlPath, isFailedRequest } from '../utils'

export async function get(id: string) {
  const threadResponse = await fetch(`/api/github/notifications/threads/${id}`)

  if (isFailedRequest(threadResponse))
    log({
      message: `An issue happened trying to fetch notification thread with id: ${id}`,
      variant: 'error',
    })

  const {
    subject: { url: notificationUrl },
    repository: { url: repositoryId },
  } = await threadResponse.json()

  const notificationResponse = await fetch(
    `/api/github${getUrlPath(notificationUrl)}`
  )

  if (isFailedRequest(notificationResponse))
    log({
      message: `An issue happened trying to fetch notification detail with id: ${id}`,
      variant: 'error',
    })

  const notification = await notificationResponse.json()
  const markdown = await getMarkdown(notification.body, repositoryId)

  return { ...notification, body: markdown }
}

export async function getMarkdown(text: string, repoId: string) {
  const markdownResponse = await fetch('/api/github/markdown', {
    method: 'POST',
    body: JSON.stringify({
      text,
      context: repoId,
    }),
  })

  if (isFailedRequest(markdownResponse))
    log({
      message: `An issue happened happened trying to parse markdown for notification with id: ${repoId}`,
      variant: 'error',
    })

  const markdown = await markdownResponse.text()

  return markdown
}

export async function list() {
  const notificationsResponse = await fetch('/api/github/notifications')

  if (isFailedRequest(notificationsResponse))
    log({
      message: 'An issue happened trying to fetch the notifications list',
      variant: 'error',
    })

  const notifications = await notificationsResponse.json()

  return notifications
}
