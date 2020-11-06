import { NOTIFICATION_VARIANTS } from '../../../constants'

export const notificationsMock = [
  // 1st
  {
    id: '11111111',
    unread: true,
    subject: {
      title: 'Notification 1',
      url: 'https://path/to/url',
      latest_comment_url: 'https://path/to/url',
      type: NOTIFICATION_VARIANTS.Release,
    },
    repository: {
      id: 70107786,
      name: 'Repo 1',
      full_name: 'repo/1',
      private: false,
      owner: {
        login: 'user-1',
        id: 14985020,
        avatar_url: 'https://path/to/url',
        url: 'https://path/to/url',
        html_url: 'https://path/to/url',
        type: 'Organization',
      },
      html_url: 'https://path/to/url',
      description: 'The React Framework',
      fork: false,
      url: 'https://path/to/url',
    },
    url: 'https://path/to/url',
    subscription_url: 'https://path/to/url',
  },
  // 2nd
  {
    id: '22222222',
    unread: true,
    subject: {
      title: 'Notification 2',
      url: 'https://path/to/url',
      latest_comment_url: 'https://path/to/url',
      type: NOTIFICATION_VARIANTS.Story,
    },
    repository: {
      id: 70107786,
      name: 'Repo 2',
      full_name: 'repo/2',
      private: false,
      owner: {
        login: 'user-2',
        id: 14985020,
        avatar_url: 'https://path/to/url',
        url: 'https://path/to/url',
        html_url: 'https://path/to/url',
        type: 'Organization',
      },
      html_url: 'https://path/to/url',
      description: 'The Vue Framework',
      fork: false,
      url: 'https://path/to/url',
    },
    url: 'https://path/to/url',
    subscription_url: 'https://path/to/url',
  },
  // 3rd
  {
    id: '333333333',
    unread: true,
    subject: {
      title: 'Notification 3',
      url: 'https://path/to/url',
      latest_comment_url: 'https://path/to/url',
      type: NOTIFICATION_VARIANTS.PR,
    },
    repository: {
      id: 70107786,
      name: 'Repo 3',
      full_name: 'repo/3',
      private: false,
      owner: {
        login: 'user-3',
        id: 14985020,
        avatar_url: 'https://path/to/url',
        url: 'https://path/to/url',
        html_url: 'https://path/to/url',
        type: 'Organization',
      },
      html_url: 'https://path/to/url',
      description: 'The Express Framework',
      fork: false,
      url: 'https://path/to/url',
    },
    url: 'https://path/to/url',
    subscription_url: 'https://path/to/url',
  },
]
