import * as React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import formatRelative from 'date-fns/formatRelative'
import {
  PageWrap,
  Author,
  Loading,
  Markdown,
  BoxContent,
  DownloadPopover,
  Badge,
  DetailHeader,
} from '../../components'

export default function Release() {
  const router = useRouter()
  const { data } = useSWR(`/api/notification/${router.query.id}`)
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
          <DetailHeader>
            <DetailHeader.Title>{releaseName}</DetailHeader.Title>
            {releaseType === 'draft' ? (
              <Badge variant="success">Draft</Badge>
            ) : releaseType === 'beta' ? (
              <Badge variant="success">Beta</Badge>
            ) : null}
          </DetailHeader>
          {data ? (
            <>
              <div className="flex flex-row justify-center items-center text-sm relative">
                <div className="flex flex-row items-center mr-8">
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
                    })}
                  </span>
                </div>
              </div>
              <BoxContent className="mt-16">
                <DownloadPopover
                  zip={data?.zipball_url}
                  tar={data?.tarball_url}
                  className="self-end"
                />
                <Markdown source={data?.body} />
              </BoxContent>
            </>
          ) : null}
        </>
      )}
    </PageWrap>
  )
}
