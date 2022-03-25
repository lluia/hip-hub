import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { RepoName } from './RepoName'

describe('<RepoName />', () => {
  const dummyOwner = {
    type: 'User',
    login: 'foo',
    url: 'https://path/to/foo',
  } as const

  test('displays the supplied name', () => {
    render(<RepoName owner={dummyOwner}>Vue JS</RepoName>)

    expect(screen.queryByText('Vue JS')).toBeTruthy()
  })

  test('displays the organization avatar', () => {
    render(<RepoName owner={dummyOwner}>Vue Utils</RepoName>)

    expect(screen.queryByTestId('ORG_AVATAR')).toBeTruthy()
  })

  test('displays the user avatar', () => {
    render(<RepoName owner={dummyOwner}>Vue Utils</RepoName>)

    expect(screen.queryByTestId('DEFAULT_AVATAR')).toBeTruthy()
  })
})
