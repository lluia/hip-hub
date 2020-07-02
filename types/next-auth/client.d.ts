import type { FC } from 'react'

interface Session {
  user: {
    name: string
    email: string
    image: string
  }
  accessToken: string
  expires: string
}

interface ContextProviderProps {
  session: Session
  options?: ContextProviderOptions
}

interface ContextProviderOptions {
  site?: string
  basePath?: string
  clientMaxAge?: number
}

type ContextProvider = FC<ContextProviderProps>

interface GenericObject {
  [key: string]: any
}

declare function useSession(): [Session, boolean]
declare function getSession(context: NextContext): Promise<Session | null>
declare function session(context: NextContext): Promise<Session | null>

declare const Provider: ContextProvider

export { useSession, session, getSession, Provider }
