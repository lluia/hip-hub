import { initAuth0 } from '@auth0/nextjs-auth0'
import crypto from 'crypto'

export default initAuth0({
  domain: 'lluia.eu.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile',
  redirectUri: 'http://hip-hub.now.sh/api/callback',
  postLogoutRedirectUri: 'http://hip-hub.now.sh',
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: crypto.randomBytes(32).toString('hex'),
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: true,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: true,
  },
})
