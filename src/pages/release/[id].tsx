import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Loading } from '../../components'
import { ReleaseScene } from '../../scenes/Release/ReleaseScene'

export default function ReleasePage() {
  const router = useRouter()
  const releaseId = router.query.id as string

  useEffect(() => {
    if (typeof releaseId !== 'string') {
      // TODO: notify error
      router.replace('/')
    }
  }, [releaseId, router])

  return releaseId ? <ReleaseScene releaseId={releaseId} /> : <Loading />
}
