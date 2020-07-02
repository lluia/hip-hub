/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next-auth' {
  interface InitOptions {
    site: string
    providers: ReturnType<unknown>[]
    database?: ConnectionOptions | string
  }

  declare function NextAuth(
    req: unknown,
    res: unknown,
    options?: InitOptions
  ): Promise<void>

  export default NextAuth
}

declare module 'next-auth/providers' {
  type GitHub = (options: ProviderGitHubOptions) => GenericReturnConfig

  interface GenericReturnConfig {
    [key: string]: unknown
  }

  interface ProviderGitHubOptions {
    clientId: string
    clientSecret: string
    scope?: string
  }

  interface Providers {
    GitHub: GitHub
  }

  declare const Providers: Providers
  export default Providers
}

declare module 'next-auth/client' {
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
    children: any
  }

  interface ContextProviderOptions {
    site?: string
    basePath?: string
    clientMaxAge?: number
  }

  type ContextProvider = (props: ContextProviderProps) => JSX.Element

  interface GenericObject {
    [key: string]: any
  }

  declare function useSession(): [Session, boolean]
  declare function getSession(context: NextContext): Promise<Session | null>
  declare function session(context: NextContext): Promise<Session | null>

  declare const Provider: ContextProvider

  export { useSession, session, getSession, Provider }
}

declare module 'next-auth/adapters' {
  interface GenericObject {
    [key: string]: any
  }

  type Adapter = (config: unknown) => Promise<GenericObject>

  interface Adapters {
    Default: Adapter
    TypeORM: {
      Adapter: Adapter
      Models: GenericObject
    }
  }

  declare const Adapters: Adapters

  export default Adapters
}
