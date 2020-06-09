import * as React from 'react'
import { useSession } from 'next-auth/client'
import { Heading } from '../components'
import { useRequest } from '../hooks'
import { parseNotifications } from '../utils'

export default function Home() {
  const [session, sessionLoading] = useSession()
  const { data } = useRequest('/notifications')
  const notifications = parseNotifications(data)
  const isLoading = sessionLoading || (session && !data)

  return isLoading ? (
    '...'
  ) : notifications ? (
    <main className="mt-10">
      <ul>
        {notifications.map(({ title, type }) => (
          <li className="bg-white p-4 m-6 relative" key={title}>
            <h4>{title}</h4>
            <span className="absolute right-0 top-0 text-xs bg-brand p-1">
              {type}
            </span>
          </li>
        ))}
      </ul>
    </main>
  ) : (
    <>
      <img
        src="/hip-hub.png"
        className="max-w-xs w-full m-auto border-solid border-4 border-black"
        title="Main graphic a person programming"
        style={{ minHeight: 253 }}
      />
      <Heading className="text-center mt-6" as="h1">
        Welcome to Hip Hub
      </Heading>
      <p className="text-center text-lg">
        Sign-in to keep track of your Github notifications!.
      </p>
    </>
  )
}
