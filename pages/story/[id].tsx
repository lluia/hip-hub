import { useRouter } from 'next/router'
import * as React from 'react'
import useSWR from 'swr'
import { Back, Heading, Loading, PageWrap } from '../../components'

export default function Story() {
  const router = useRouter()
  const { data } = useSWR(`/api/release/${router.query.id}`)
  console.log(data)
  return (
    <PageWrap>
      {!data ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row justify-center items-center relative">
            <Back className="absolute left-0 top-0 mt-3" />
            <div className="flex flex-row">
              <Heading as="h1" size="h3" className="mb-0 mr-4 w-3/4 mx-auto">
                {data.title}
              </Heading>
            </div>
          </div>
        </>
      )}
    </PageWrap>
  )
}
