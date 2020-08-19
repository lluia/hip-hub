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
  Emoji,
  BoxContent,
} from '../../components'

export default function Release() {
  const router = useRouter()
  const { data, error } = useSWR(`/api/release/${router.query.id}`)
  const releaseName = data && data.tag_name ? data.tag_name : 'release'

  console.log(data)

  return (
    <PageWrap>
      {!data ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row justify-center items-center relative">
            <Back className="absolute left-0 top-0 mt-3" />
            <Heading as="h3" className="mb-0 underline-magic">
              {releaseName}
            </Heading>
          </div>
          {data ? (
            <>
              <div className="flex justify-center">
                <p className="flex items-center text-xs">
                  <Author
                    name={data.author.login}
                    avatar={data.author.avatar_url}
                    url={data.author.html_url}
                    className="mr-1 text-xs"
                  />
                  <span>
                    released this{' '}
                    {formatRelative(new Date(data.published_at), Date.now(), {
                      weekStartsOn: 1,
                    })}
                    <Emoji className="inline-block ml-1" aria-label="lab emoji">
                      🧪
                    </Emoji>
                  </span>
                </p>
              </div>
              <BoxContent className="mt-16">
                <Markdown source={data.body} />
              </BoxContent>
            </>
          ) : null}
        </>
      )}
    </PageWrap>
  )
}
