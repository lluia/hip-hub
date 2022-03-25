import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { IssueScene } from '../../scenes/Issue/IssueScene'

export default function IssuePage() {
  const router = useRouter()
  const issueId = router.query.id as string

  useEffect(() => {
    if (typeof issueId !== 'string') {
      // TODO: notify error
      router.replace('/')
    }
  }, [issueId, router])

  return <IssueScene issueId={issueId} />
}
