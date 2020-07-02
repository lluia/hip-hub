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
