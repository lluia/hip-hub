import * as React from 'react'
import { cache } from 'swr'
import { waitFor, within, screen } from '@testing-library/react'
import { rest } from 'msw'
import Home from '../../pages'
import * as dataTestIds from '../test-ids'
import { notificationsMock } from '../server/mocks/notifications'
import { renderPage } from '../utils'
import { mapVariant } from '../../components'
import { server } from '../server/server'

beforeEach(() => {
  cache.clear()
})

describe('• Home', () => {
  test('displays a loading spinner', () => {
    renderPage(<Home />)

    expect(screen.queryByTestId(dataTestIds.LOADING_SPINNER)).toBeTruthy()
  })

  test('fetches and displays notifications feed correctly', async () => {
    renderPage(<Home />)

    // Wait for page to finish loading
    await waitFor(() => {
      screen.getByTestId(dataTestIds.NOTIFICATION_FEED)
    })

    notificationsMock.forEach((notification) => {
      const { subject, repository } = notification
      const card = within(
        screen.getByTestId(
          `${dataTestIds.NOTIFICATION_CARD}-${notification.id}`
        )
      )
      const type = mapVariant(subject.type)
      if (!type) throw new Error('Wrong subject...')

      expect(card.queryByText(subject.title)).toBeTruthy()
      expect(card.queryByText(type.text)).toBeTruthy()
      expect(
        card.queryByText(`${repository.owner.login} / ${repository.name}`)
      ).toBeTruthy()
    })
  })

  test('displays casual text when no notifications', async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/notifications`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}))
        }
      )
    )

    renderPage(<Home />)

    // Wait for page to finish loading
    await waitFor(() => {
      screen.getByTestId(dataTestIds.NOTIFICATION_FEED)
    })

    expect(
      screen.getByText("You don't have any new notifications!")
    ).toBeTruthy()
  })
})
