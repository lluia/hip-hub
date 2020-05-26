export function findParam(param: string, searchStr: string) {
  return (
    searchStr
      .substr(1)
      .split('&')
      .reduce((acc, portion) => {
        const [key, val] = portion.split('=')
        return key === param ? decodeURIComponent(val) : acc
      }, '') || null
  )
}
