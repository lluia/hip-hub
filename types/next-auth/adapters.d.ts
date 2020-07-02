import type { ConnectionOptions } from 'typeorm'

interface GenericObject {
  [key: string]: any
}

type Adapter = (config: ConnectionOptions) => Promise<GenericObject>

interface Adapters {
  Default: Adapter
  TypeORM: {
    Adapter: Adapter
    Models: GenericObject
  }
}

declare const Adapters: Adapters

export default Adapters
