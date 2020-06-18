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
  type: 'PullRequest' | 'Issue' | 'Release'
}

export interface GithubNotificationRepository {
  id: number
  name: string
  owner: GithubNotificationRepositoryOwner
}

export interface GithubNotificationRepositoryOwner {
  type: 'Organization'
  avatar_url: string
}
