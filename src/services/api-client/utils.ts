export const API_BASE = 'https://api.github.com'

export function isFailedRequest(res: Response) {
  return res.status !== 200 || !res.ok
}

export function getUrlPath(url: string) {
  return url.replace(/^.*\/\/[^\/]+/, '')
}
