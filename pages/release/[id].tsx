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
  Tooltip,
  DownloadPopover,
} from '../../components'
import {
  LabIllustration,
  DraftIllustration,
  AwardIllustration,
} from '../../components/illustrations'

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
            <div className="flex flex-row">
              <Heading as="h3" className="mb-0 mr-4 underline-magic">
                {releaseName}
              </Heading>
              {releaseType === 'draft' ? (
                <Tooltip target={<DraftIllustration />}>Draft release</Tooltip>
              ) : releaseType === 'beta' ? (
                <Tooltip target={<LabIllustration />}>Beta release</Tooltip>
              ) : (
                <Tooltip target={<AwardIllustration />}>Normal release</Tooltip>
              )}
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
