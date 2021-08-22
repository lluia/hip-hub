import * as React from 'react'
import { useRouter } from 'next/router'
import formatRelative from 'date-fns/formatRelative'
import { DownloadDropdown } from '../../modules/release'
import { useFetchNotification } from '../../queries/useFetchNotification'
import {
  PageWrap,
  Author,
  Loading,
  Box,
  Badge,
  DetailHeader,
} from '../../modules/design-system'
import { MetaBlock } from '../../modules/design-system/MetaBlock/MetaBlock'

export default function Release() {
  const router = useRouter()
  const { data } = useFetchNotification(router.query.id as string)

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
            <DetailHeader.Title className="mr-3">
              {releaseName}
            </DetailHeader.Title>
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
                    made this release{' '}
                    {formatRelative(new Date(data?.published_at), Date.now(), {
                      weekStartsOn: 1,
                    })}
                  </span>
                </div>
              </div>
              <Box className="mt-16">
                <DownloadDropdown
                  zip={data?.zipball_url}
                  tar={data?.tarball_url}
                  className="self-end"
                />
                <MetaBlock html={data?.body} />;
              </Box>
            </>
          ) : null}
        </>
      )}
    </PageWrap>
  )
}
