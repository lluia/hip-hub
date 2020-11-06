export interface GithubNotifications {
  [key: string]: GithubNotification
}

export interface GithubNotification {
  unread: boolean
  subject: GithubNotificationSubject
  url: string
  repository: GithubNotificationRepository
  id: string
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
  type: 'Organization' | 'User'
  avatar_url?: string
  login: string
}
