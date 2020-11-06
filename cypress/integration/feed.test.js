import notifications from '../fixtures/notifications.json'
import { notificationsMock } from '../../test/server/mocks/notifications'

context('• Login', () => {
  before(() => {
    cy.route2('api/notifications', {
      fixture: 'notifications.json',
    }).visitLoggedIn('/')
  })

  it('displays fetched notifications', () => {
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
