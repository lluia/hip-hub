import { useQuery } from 'react-query'
import apiClientService from '../services/api-client'

const QK_NOTIFICATIONS = 'QK_NOTIFICATIONS'

export function useFetchNotification(id: string) {
  return useQuery([QK_NOTIFICATIONS, id], ({ queryKey: [, id] }) =>
    apiClientService.notifications.get(id)
  )
}

export function useListNotifications() {
  return useQuery([QK_NOTIFICATIONS], () =>
    apiClientService.notifications.list()
  )
}
