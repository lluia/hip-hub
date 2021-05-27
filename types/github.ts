import { NOTIFICATION_VARIANT } from '../constants'
import { CommentAssociationVariant } from '../modules/comments'

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
  type: NOTIFICATION_VARIANT
}

export interface GithubNotificationRepository {
  id: number
  name: string
  owner: GithubUser
}

export interface GithubUser {
  type: 'Organization' | 'User'
  avatar_url?: string
  login: string
  url: string
}

export interface GithubStoryPayload {
  author_association: CommentAssociationVariant
  created_at: string
  title: string
  comments: number
  body: string
  user: GithubUser
}
