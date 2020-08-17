import * as React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { PageWrap, Author, Heading, Link } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Release() {
  const router = useRouter()
  const { data, error } = useSWR(`/api/release/${router.query.id}`)
  console.log(data)
  return (
    <PageWrap>
      <Link onPress={router.back}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </Link>
      <Heading as="h3">Summary</Heading>
      <div className="flex no-wrap items-center">
        {data ? (
          <>
            <Author
              name={data.author.login}
              avatar={data.author.avatar_url}
              url={data.author.html_url}
            />
            <div>
              released {data.name} on {data.published_at}
            </div>
          </>
        ) : null}
      </div>
    </PageWrap>
  )
}
