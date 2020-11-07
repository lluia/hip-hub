import notifications from '../fixtures/notifications-full.json'
import { notificationsMock } from '../../test/server/mocks/notifications'

context('• Feed', () => {
  describe('– with notifications', () => {
    before(() => {
      cy.route2('api/notifications', {
        fixture: 'notifications-full.json',
      }).visitLoggedIn('/')
    })

    it('displays fetched notifications', () => {
      cy.findByTestId('NOTIFICATION_FEED').within(() => {
        notifications.forEach(({ subject, repository, id }) => {
          cy.findByTestId(`NOTIFICATION_CARD-${id}`).within(() => {
            cy.findByText(subject.title)
              .findByText(`${repository.owner.login} / ${repository.name}`)
              .getNotificationLabel(subject.type)
              .then((label) => {
                cy.findByText(label)
              })
          })
        })
      })
    })
  })

  describe('- without notifications', () => {
    before(() => {
      cy.route2('api/notifications', {
        fixture: 'notifications-empty.json',
      }).visitLoggedIn('/')
    })

    it("displays a context message when there's no notifications", () => {
      cy.findByTestId('NOTIFICATION_FEED').within(() => {
        cy.findByText("You don't have any new notifications!")
      })
    })
  })
})
