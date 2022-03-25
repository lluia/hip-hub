import React from 'react'
import { Heading } from '../../components'

export function SignInScene() {
  return (
    <div className="min-h-screen flex items-center justify-center navigation-gap">
      <div>
        <img
          src="/hip-hub.png"
          className="max-w-xs w-full m-auto border-solid border-4 border-black"
          title="Main graphic a person programming"
          style={{ minHeight: 253 }}
          data-testid="WELCOME_IMAGE"
        />
        <Heading className="text-center mt-6" as="h1">
          Welcome to Meow
        </Heading>
        <p className="text-center text-lg">
          Sign-in to keep track of your Github notifications!
        </p>
      </div>
    </div>
  )
}
