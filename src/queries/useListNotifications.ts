import { useQuery } from 'react-query'
import { listNotifications } from '../modules/api/notifications'

const QK_LIST_NOTIFICATIONS = 'QK_LIST_NOTIFICATIONS'

export function useListNotifications() {
  return useQuery(QK_LIST_NOTIFICATIONS, () => listNotifications())
}
