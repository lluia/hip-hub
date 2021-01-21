import * as React from 'react'
import { useRouter } from 'next/router'
import formatRelative from 'date-fns/formatRelative'
import format from 'date-fns/format'
import useSWR from 'swr'
import {
  Author,
  Box,
  DetailHeader,
  Emoji,
  Loading,
  Markdown,
  PageWrap,
} from '../../components'

export default function Story() {
  const router = useRouter()
  const { data } = useSWR(`/api/notification/${router.query.id}`)

  console.log(data)

  return (
    <PageWrap>
      {!data ? (
        <Loading />
      ) : (
        <>
          <DetailHeader>
            <DetailHeader.Title>{data.title}</DetailHeader.Title>
          </DetailHeader>
          <div className="flex flex-row justify-center items-center text-base text-grey relative mt-6">
            <Author
              name={data?.user?.login}
              avatar={data?.user?.avatar_url}
              href={data?.user?.url}
              className="mr-1"
            />
            <span>
              • {format(new Date(data?.created_at), 'do MMMM yyyy')} •{' '}
              {!data?.comments
                ? 'No comments'
                : data?.comments.length > 1
                ? '1 comment'
                : `${data?.comments} comments`}
            </span>
          </div>
          <Box
            className="mt-16"
            renderHeader={() => (
              <span className="text-sm flex items-center">
                <Author
                  name={data?.user?.login}
                  avatar={data?.user?.avatar_url}
                  href={data?.user?.url}
                  className="mr-1"
                  size="small"
                />{' '}
                <span>
                  commented{' '}
                  {formatRelative(new Date(data?.created_at), new Date())}
                </span>
                <Emoji aria-label="chat emoji">💭</Emoji>
              </span>
            )}
          >
            <Markdown source={data?.body} />
          </Box>
        </>
      )}
    </PageWrap>
  )
}
