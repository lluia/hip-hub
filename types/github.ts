export interface GithubResponse {
  data: GithubNotifications
}

export interface GithubNotifications {
  [key: string]: GithubNotification
}

export interface GithubNotification {
  unread: boolean
  subject: GithubNotificationSubject
}

export interface GithubNotificationSubject {
  title: string
  url: string
  type: string
}
