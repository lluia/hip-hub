import * as React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import formatRelative from 'date-fns/formatRelative'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParachuteBox } from '@fortawesome/free-solid-svg-icons'
import {
  PageWrap,
  Author,
  Heading,
  Back,
  Loading,
  Markdown,
  Emoji,
  BoxContent,
  Link,
  Badge,
} from '../../components'

export default function Release() {
  const router = useRouter()
  const { data, error } = useSWR(`/api/release/${router.query.id}`)
  const releaseName = data && data.tag_name ? data.tag_name : 'release'

  const releaseType = !data
    ? 'release'
    : data.draft
    ? 'draft'
    : data.prerelease
    ? 'beta release'
    : 'normal release'

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
              <p className="flex  justify-center items-center text-sm">
                <Author
                  name={data.author.login}
                  avatar={data.author.avatar_url}
                  url={data.author.html_url}
                  className="mr-1"
                />
                <span>
                  released{' '}
                  {formatRelative(new Date(data.published_at), Date.now(), {
                    weekStartsOn: 1,
                  })}{' '}
                </span>
              </p>
              <div className="flex justify-end text-sm mt-12 items-center">
                <DownloadLink href={data.zipball_url}>Zip</DownloadLink>
                <DownloadLink href={data.tarball_url}>Tar</DownloadLink>
                <div className="ml-4 font-bold text-xs">
                  <Badge variant="success" className="ml-1">
                    {releaseType}
                  </Badge>
                </div>
              </div>
              <BoxContent className="mt-5">
                <Markdown source={data.body} />
              </BoxContent>
            </>
          ) : null}
        </>
      )}
    </PageWrap>
  )
}

function DownloadLink({ children, ...rest }) {
  return (
    <Link
      className="uppercase text-xxs text-black font-bold ml-4 inline-flex items-center"
      {...rest}
    >
      {children}{' '}
      <FontAwesomeIcon
        icon={faParachuteBox}
        aria-label="cardboard box emoji"
        className="text-lg text-action ml-1"
      />
    </Link>
  )
}
