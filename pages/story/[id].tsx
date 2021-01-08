import * as React from 'react'
import { useRouter } from 'next/router'
import formatRelative from 'date-fns/formatRelative'
import useSWR from 'swr'
import {
  Author,
  BoxContent,
  DetailHeader,
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
          <div className="flex flex-row justify-center items-center text-sm relative mt-6">
            <div className="flex flex-row items-center">
              <Author
                name={data?.user?.login}
                avatar={data?.user?.avatar_url}
                href={data?.user?.url}
                className="mr-1"
              />
              <span>
                created this on{' '}
                {formatRelative(new Date(data?.created_at), Date.now(), {
                  weekStartsOn: 1,
                })}
              </span>
            </div>
          </div>
          <BoxContent className="mt-16">
            <Markdown source={data?.body} />
          </BoxContent>
        </>
      )}
    </PageWrap>
  )
}
