export interface GithubResponse {
  data: GithubNotifications
}

export interface GithubNotifications {
  [key: string]: GithubNotification
}

export interface GithubNotification {
  unread: boolean
  subject: GithubNotificationSubject
  url: string
  repository: GithubNotificationRepository
}

export interface GithubNotificationSubject {
  title: string
  url: string
  type: string
}

export interface GithubNotificationRepository {
  id: number
  full_name: string
}
