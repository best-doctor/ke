import type BaseProvider from './providers'
import type FieldDescription from './FieldDescription'

abstract class BaseAdmin {
  provider!: BaseProvider

  fields!: FieldDescription[]
}

export default BaseAdmin
