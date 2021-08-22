interface Params {
  message: string
  variant: 'error' | 'warn' | 'log'
}

export function log({ message, variant }: Params) {
  if (variant === 'error') throw new Error(getFormattedMessage(message))
  console[variant](getFormattedMessage(message))
}

export function getFormattedMessage(message: string) {
  return `[MEOW] →   ${message}`
}
