import { LoadScriptNext } from '@react-google-maps/api'
import { makeDefault } from '@cdk/compatibility'

export const MapProvider = makeDefault(LoadScriptNext, { libraries: ['places'] })
