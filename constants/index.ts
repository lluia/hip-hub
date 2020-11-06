export type NotificationVariant =
  | 'PullRequest'
  | 'Issue'
  | 'Release'
  | 'Discussion'

export const NOTIFICATION_VARIANTS = {
  PR: 'PullRequest',
  Story: 'Issue',
  Release: 'Release',
  Commit: 'Commit',
  Discussion: 'Discussion',
}
