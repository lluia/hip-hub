Cypress.Commands.add('visitLoggedIn', () => {
  cy.route2('/api//api/auth/session', { fixture: 'session.json' }).visit('/')
})

Cypress.Commands.add('getNotificationLabel', (label) => {
  switch (label) {
    case 'PullRequest':
      return 'Pull Request'
    case 'Issue':
      return 'Story'
    case 'Release':
      return 'Release'
    case 'Discussion':
      return 'Discussion'
    case 'Commit':
      return 'Commit'
    default:
      return 'Unknown'
  }
})
