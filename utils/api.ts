import axios from 'axios'

async function getGithubToken() {
  const {
    data: {
      account: { accessToken },
    },
  } = await axios.get('/api/github/get-token')
  return accessToken
}

export { getGithubToken }
