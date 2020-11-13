import * as React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import formatRelative from 'date-fns/formatRelative'
import {
  PageWrap,
  Author,
  Heading,
  Back,
  Loading,
  Markdown,
  BoxContent,
  DownloadPopover,
  Badge,
} from '../../components'

export default function Release() {
  const router = useRouter()
  const { data } = useSWR(`/api/release/${router.query.id}`)
  const releaseName = data && data.tag_name ? data.tag_name : 'release'

  const releaseType = !data
    ? 'release'
    : data.draft
    ? 'draft'
    : data.prerelease
    ? 'beta'
    : 'release'

  return (
    <PageWrap>
      {!data ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row justify-center items-center relative">
            <Back className="absolute left-0 top-0 mt-3" />
            <div className="flex flex-row items-center mb-4">
              <Heading as="h1" size="h3" className="mr-4">
                {releaseName}
              </Heading>
              {releaseType === 'draft' ? (
                <Badge variant="success">Draft</Badge>
              ) : releaseType === 'beta' ? (
                <Badge variant="success">Beta</Badge>
              ) : null}
            </div>
          </div>
          {data ? (
            <>
              <p className="flex justify-center items-center text-sm">
                <Author
                  name={data?.author?.login}
                  avatar={data?.author?.avatar_url}
                  href={data?.author?.html_url}
                  className="mr-1"
                />
                <span>
                  released this{' '}
                  {formatRelative(new Date(data?.published_at), Date.now(), {
                    weekStartsOn: 1,
                  })}{' '}
                </span>
              </p>
              <div className="flex justify-end text-sm mt-12 items-center">
                <DownloadPopover
                  zip={data?.zipball_url}
                  tar={data?.tarball_url}
                />
              </div>
              <BoxContent className="mt-5">
                <Markdown source={data?.body} />
              </BoxContent>
            </>
          ) : null}
        </>
      )}
    </PageWrap>
  )
}
