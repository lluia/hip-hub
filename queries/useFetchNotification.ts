import { useQuery } from 'react-query'
import { fetchNotification } from '../modules/api/notifications'

const QK_FETCH_NOTIFICATION = 'QK_FETCH_NOTIFICATION'

export function useFetchNotification(id: string) {
  return useQuery([QK_FETCH_NOTIFICATION, id], ({ queryKey: [, id] }) =>
    fetchNotification(id)
  )
}
