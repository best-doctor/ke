import BaseProvider from './providers'
import FieldDescription from './FieldDescription'

abstract class BaseAdmin {
  provider!: BaseProvider

  fields!: FieldDescription[]
}

export default BaseAdmin
