import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { RepoName } from '../'

describe('<RepoName />', () => {
  test('displays the supplied name', () => {
    render(<RepoName owner={{ type: 'User', login: 'foo' }}>Vue JS</RepoName>)

    expect(screen.queryByText('Vue JS')).toBeTruthy()
  })

  test('displays the organization avatar', () => {
    render(
      <RepoName owner={{ type: 'Organization', login: 'Vue' }}>
        Vue Utils
      </RepoName>
    )

    expect(screen.queryByTestId('ORG_AVATAR')).toBeTruthy()
  })

  test('displays the user avatar', () => {
    render(
      <RepoName owner={{ type: 'User', login: 'foo' }}>Vue Utils</RepoName>
    )

    expect(screen.queryByTestId('DEFAULT_AVATAR')).toBeTruthy()
  })
})
