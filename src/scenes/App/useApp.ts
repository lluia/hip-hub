import React from 'react'
import highlightCode from 'highlight.js'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export function useApp() {
  const router = useRouter()
  const { status: sessionStatus } = useSession()
  const isSignInRoute = router.pathname.includes('sign-in')

  const signInRedirect = sessionStatus === 'unauthenticated' && !isSignInRoute
  const loggedInRedirect = sessionStatus === 'authenticated' && isSignInRoute
  const shouldRedirect = signInRedirect || loggedInRedirect

  React.useEffect(() => {
    highlightCode.highlightAll()
  }, [])

  React.useEffect(() => {
    if (signInRedirect) {
      router.replace('/sign-in')
    }

    if (loggedInRedirect) {
      router.replace('/')
    }
  }, [sessionStatus, router, signInRedirect, loggedInRedirect])

  return {
    sessionStatus,
    redirecting: shouldRedirect,
  }
}
