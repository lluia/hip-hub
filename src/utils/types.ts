// In case TSC incorrectly inferring this string literal as just 'string': https://github.com/microsoft/TypeScript/issues/22038#issuecomment-370472236
export function stringLit<a>(val: a): a {
  return val
}
