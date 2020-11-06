/// <reference types="cypress" />

context('• Login', () => {
  before(() => {
    cy.visit('/')
  })

  it('greets the user', () => {
    cy.findByText('Welcome to Hip Hub')
  })

  it('hints what the application is about', () => {
    cy.findByText('Sign-in to keep track of your Github notifications!')
  })

  it('displays a beautiful image', () => {
    cy.findByTestId('WELCOME_IMAGE')
  })

  it('allows me to sign-in', () => {
    cy.findByText('Sign-in')
  })
})
