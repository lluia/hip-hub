import {
  faBahai,
  faBong,
  faCodeBranch,
  faComments,
  faFlag,
} from '@fortawesome/free-solid-svg-icons'

export enum NOTIFICATION_VARIANT {
  PR = 'PullRequest',
  Story = 'Issue',
  Release = 'Release',
  Commit = 'Commit',
  Discussion = 'Discussion',
}

function getVariantTheme(variant: NOTIFICATION_VARIANT) {
  switch (variant) {
    case NOTIFICATION_VARIANT.PR:
      return {
        color: 'berry',
        text: 'Pull Request',
        icon: faCodeBranch,
      }
    case NOTIFICATION_VARIANT.Story:
      return {
        color: 'deepsea',
        text: 'Story',
        icon: faFlag,
      }
    case NOTIFICATION_VARIANT.Release:
      return {
        color: 'orange',
        text: 'Release',
        icon: faBong,
      }
    case NOTIFICATION_VARIANT.Commit:
      return {
        color: 'near-black',
        text: 'Commit',
        icon: faBahai,
      }
    case NOTIFICATION_VARIANT.Discussion:
      return {
        color: 'matcha',
        text: 'Discussion',
        icon: faComments,
      }
    default:
      return null
  }
}

export default {
  getVariantTheme,
}
